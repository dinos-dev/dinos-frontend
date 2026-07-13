import { create } from 'zustand';

interface MapState {
  isSearchOpen: boolean;
  selectedPinId: number | null;
}

interface MapActions {
  openSearch: () => void;
  closeSearch: () => void;
  selectPin: (pinId: number | null) => void;
}

export const useMapStore = create<MapState & MapActions>((set) => ({
  isSearchOpen: false,
  selectedPinId: null,

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  selectPin: (selectedPinId) => set({ selectedPinId }),
}));
