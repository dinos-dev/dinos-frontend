import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { clearTokens, getAccessToken } from '@/services/token-storage';
import { useAuthStore } from '@/store/auth.store';
import { fetchMyProfile } from '../api/api';
import { authKeys } from '../api';
import type { UserProfile } from '../types/auth.types';

export function useAuthSessionBootstrap() {
  const queryClient = useQueryClient();
  const setLoading = useAuthStore((s) => s.setLoading);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    async function checkAuth() {
      setLoading(true);
      try {
        const token = await getAccessToken();
        if (!token) {
          clearAuth();
          return;
        }

        await queryClient.fetchQuery<UserProfile>({
          queryKey: authKeys.profile(),
          queryFn: fetchMyProfile,
        });
        setAuthenticated();
      } catch {
        await clearTokens();
        clearAuth();
      }
    }

    checkAuth();
  }, [clearAuth, queryClient, setAuthenticated, setLoading]);

  return { isLoading };
}
