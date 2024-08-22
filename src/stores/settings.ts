import { create } from 'zustand';
import { createJSONStorage,persist } from 'zustand/middleware';

export const ROUTE_LIST = [
  {
    key: '1',
    value: 'Best Return',
  },
  {
    key: '2',
    value: 'Fast',
  },
];

export const SLIPPAGE_LIST = [
  {
    key: 1,
    value: '0.5',
  },
  {
    key: 2,
    value: '1',
  },
  {
    key: 3,
    value: '3',
  },
  {
    key: 4,
    value: 'Custom',
  },
];

export const SLIPPAGE_DEFAULT = SLIPPAGE_LIST[SLIPPAGE_LIST.length - 1].value;

export const useSettingsStore = create(
  persist(
    (set, get: any) => ({
      slippage: SLIPPAGE_LIST[0].value,
      setSlippage: (slippage: string) => set({ slippage: slippage }),
      getSlippage: () => get().slippage,
      route: ROUTE_LIST[0].value,
      setRoute: (route: string) => set({ route: route }),
      getRoute: () => get().route,
    }),
    {
      name: 'global-settings',
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
