import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearTokens,
} from './token-storage';
import { useAuthStore } from '@/store/auth.store';
import { useToastStore } from '@/store/toast.store';

interface ApiResponse<T> {
  result?: T;
}

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

function processQueue(error: unknown, token: string | null) {
  for (const request of failedQueue) {
    if (token) {
      request.resolve(token);
    } else {
      request.reject(error);
    }
  }
  failedQueue = [];
}

async function clearAuthSession(): Promise<void> {
  await clearTokens();
  useAuthStore.getState().clearAuth();
}

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// --- Request: 토큰이 있으면 주입, 없으면 스킵 (Public API 호환) ---
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);

// --- Response: 401 시 토큰 갱신 ---
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // refresh 요청 자체가 401이면 로그아웃
    if (
      (originalRequest as InternalAxiosRequestConfig & { _retry?: boolean })
        ._retry
    ) {
      await clearAuthSession();
      useToastStore.getState().showToast('로그인이 만료되었습니다.', 'error');
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      });
    }

    (
      originalRequest as InternalAxiosRequestConfig & { _retry?: boolean }
    )._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) {
        await clearAuthSession();
        useToastStore.getState().showToast('로그인이 필요합니다.', 'error');
        return Promise.reject(error);
      }

      const { data } = await axios.post<ApiResponse<{ accessToken: string }>>(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/token/access`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const accessToken = data.result?.accessToken;
      if (!accessToken) {
        await clearAuthSession();
        useToastStore.getState().showToast('로그인이 만료되었습니다.', 'error');
        return Promise.reject(error);
      }

      await setAccessToken(accessToken);
      processQueue(null, accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      await clearAuthSession();
      useToastStore.getState().showToast('로그인이 만료되었습니다.', 'error');
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
