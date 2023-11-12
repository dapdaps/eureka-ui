import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const usePositionsStore = create(
  persist(
    (set, get: any) => ({
      positions: {},
      setPositions: (positions: any) => {
        set({ positions });
      },
      updateSinglePosition: (params: any) => {
        const _positions = get().positions;
        const _position = get().positions[params.tokenId];
        _positions[params.tokenId] = { ..._position, ...params };
        set({ positions: _positions });
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
