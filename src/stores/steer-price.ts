import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
type SteerPriceState = {
  steer_price: { [key: string]: string };
};

type SteerPriceStore = SteerPriceState & {
  set: (update: SteerPriceState) => void;
};

export const useSteerPriceStore = create(
  persist(
    (set, get: any) => ({
      steer_price: {},
      set: (params: any) => set(() => ({ ...params }))
    }),
    {
      name: 'steer-price',
      version: 1,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
