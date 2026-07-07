import { create } from 'zustand';

export type ToastType = 'error' | 'success' | 'info';

interface ToastState {
  message: string | null;
  type: ToastType;
}

interface ToastActions {
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState & ToastActions>((set) => ({
  message: null,
  type: 'info',

  showToast: (message, type = 'info') => set({ message, type }),
  hideToast: () => set({ message: null }),
}));
