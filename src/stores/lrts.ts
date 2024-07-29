import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import initData from '@/views/lrts/config/data';
type StoreState = {
  data: any[];
};

type LrtsStore = StoreState & {
  set: (update: StoreState) => void;
};

// export const useLrtDataStore = create<LrtsStore>((set) => ({
//   data: initData,
//   set: (params) =>
//     set(() => {
//       return { ...params };
//     }),
// }));

export const useLrtDataStore = create(
  persist(
    (set, get: any) => ({
      data: initData,
      set: (params: any) => {
        set({
          ...params,
        });
      },
    }),
    {
      name: '_cached_lrt_data',
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
