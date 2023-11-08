import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const usePositionsStore = create(
  persist(
    (set, get: any) => ({
      positions: {},
      setPositions: (positions: any) => {
        set({ positions });
      },
      getPosition: (id: any) => get().positions[id],
    }),
    {
      name: 'cached_positions',
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
