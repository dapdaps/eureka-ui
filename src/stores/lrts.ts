import { create } from 'zustand';

import initData from '@/views/lrts/config/data';
import { createJSONStorage, persist } from 'zustand/middleware';
type StoreState = {
  data: any[];
};

type LrtsStore = StoreState & {
  set: (update: StoreState) => void;
};

export const useLrtDataStore = create<LrtsStore>((set) => ({
  data: initData,
  set: (params) =>
    set(() => {
      return { ...params };
    }),
}));

export const useCompletedRequestMappingStore = create(
  persist(
    (set, get: any) => ({
      completedRequestMapping: {},
      set: (params: any) => set(() => ({ ...params })),
    }),
    {
      name: '_completedRequestMapping',
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);