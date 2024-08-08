import { create } from 'zustand';

interface NeedRefreshState {
  refresh: number;
  setRefresh: (refresh: number) => void;
}

export const useNeedRefreshStore = create<NeedRefreshState>((set) => ({
  refresh: 0,
  setRefresh: (refresh: number) => set({ refresh }),
}));