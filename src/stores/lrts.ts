import { create } from 'zustand';

import initData from '@/views/lrts/config/data';

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
