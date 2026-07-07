import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchMyProfile, localLogin, logout } from './api';
import { authKeys } from './keys';

export function useLocalLogin() {
  return useMutation({
    mutationFn: localLogin,
    meta: { skipGlobalError: true },
  });
}

export function useMyProfile(enabled: boolean) {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: fetchMyProfile,
    enabled,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}
