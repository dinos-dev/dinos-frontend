import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  hasBrowsedAsGuest: boolean;
}

interface AuthActions {
  setAuthenticated: () => void;
  setGuestMode: () => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  hasBrowsedAsGuest: false,

  setAuthenticated: () =>
    set({ isAuthenticated: true, isLoading: false, hasBrowsedAsGuest: false }),
  setGuestMode: () =>
    set({ isAuthenticated: false, isLoading: false, hasBrowsedAsGuest: true }),
  clearAuth: () =>
    set({ isAuthenticated: false, isLoading: false, hasBrowsedAsGuest: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
