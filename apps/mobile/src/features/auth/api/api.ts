import { apiClient } from '@/services/api-client';
import type { ApiResponse } from '@/services/api-types';
import type {
  LocalLoginRequest,
  LoginTokens,
  UserProfile,
} from '../types/auth.types';

function unwrapResult<T>(response: ApiResponse<T>): T {
  if (response.result === undefined) {
    throw new Error(response.message);
  }
  return response.result;
}

export async function localLogin(
  body: LocalLoginRequest,
): Promise<LoginTokens> {
  const { data } = await apiClient.post<ApiResponse<LoginTokens>>(
    '/auth/local',
    body,
  );
  return unwrapResult(data);
}

export async function fetchMyProfile(): Promise<UserProfile> {
  const { data } = await apiClient.get<ApiResponse<UserProfile>>(
    '/users/mine/profile',
  );
  return unwrapResult(data);
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}
