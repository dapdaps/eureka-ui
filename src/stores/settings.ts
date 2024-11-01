import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const ROUTE_LIST = [
  {
    key: '1',
    value: 'Best Return'
  },
  {
    key: '2',
    value: 'Fast'
  }
];

export const SLIPPAGE_LIST = [
  {
    key: 1,
    value: '2'
  },
  {
    key: 2,
    value: '3'
  },
  {
    key: 3,
    value: '5'
  },
  {
    key: 4,
    value: 'Custom'
  }
];

export const SLIPPAGE_DEFAULT = SLIPPAGE_LIST[SLIPPAGE_LIST.length - 1].value;

export const useSettingsStore = create(
  persist(
    (set, get: any) => ({
      slippage: SLIPPAGE_LIST[2].value,
      setSlippage: (slippage: string) => set({ slippage: slippage }),
      getSlippage: () => get().slippage,
      route: ROUTE_LIST[0].value,
      setRoute: (route: string) => set({ route: route }),
      getRoute: () => get().route
    }),
    {
      name: 'global-settings',
      version: 0.2,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
