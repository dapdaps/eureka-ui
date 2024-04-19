import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useOdysseyStore = create(
  persist(
    (set, get: any) => ({
      odyssey: [],
      setOdyssey: (list: any) => set(() => ({ odyssey: list })),
    }),
    {
      name: '_cached_odyssey',
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useOdysseyV3Store = create(
  persist(
    (set, get: any) => ({
      slices: {
        0: [...Array(15).keys()].sort(() => 0.5 - Math.random()),
        1: [...Array(15).keys()].sort(() => 0.5 - Math.random()),
        2: [...Array(15).keys()].sort(() => 0.5 - Math.random()),
        3: [...Array(15).keys()].sort(() => 0.5 - Math.random()),
      },
    }),
    {
      name: '_cached_odyssey_v3',
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
