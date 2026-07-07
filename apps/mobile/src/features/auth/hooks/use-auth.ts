import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { clearTokens, setTokens } from '@/services/token-storage';
import { useAuthStore } from '@/store/auth.store';
import { useToastStore } from '@/store/toast.store';
import { authKeys, useLocalLogin, useLogout } from '../api';
import { fetchMyProfile } from '../api/api';
import type { LocalLoginRequest, UserProfile } from '../types/auth.types';

export function useAuth() {
  const queryClient = useQueryClient();
  const loginMutation = useLocalLogin();
  const logoutMutation = useLogout();
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const showToast = useToastStore((s) => s.showToast);

  const loginWithLocal = useCallback(
    async (body: LocalLoginRequest) => {
      const tokens = await loginMutation.mutateAsync(body);
      await setTokens(tokens.accessToken, tokens.refreshToken);
      await queryClient.fetchQuery<UserProfile>({
        queryKey: authKeys.profile(),
        queryFn: fetchMyProfile,
      });
      setAuthenticated();
    },
    [loginMutation, queryClient, setAuthenticated],
  );

  const logout = useCallback(async () => {
    let didLogoutOnServer = false;

    try {
      await logoutMutation.mutateAsync();
      didLogoutOnServer = true;
    } finally {
      await clearTokens();
      queryClient.removeQueries({ queryKey: authKeys.all });
      clearAuth();
      if (didLogoutOnServer) {
        showToast('로그아웃되었습니다.', 'success');
      }
    }
  }, [clearAuth, logoutMutation, queryClient, showToast]);

  return {
    loginWithLocal,
    login: loginWithLocal,
    logout,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    isLoggingOut: logoutMutation.isPending,
  };
}
