import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set, get: any) => ({
      slippage: 0.5,
      setSlippage: (slippage: number) => set({ slippage: slippage }),
      getSlippage: () => get().slippage,
    }),
    {
      name: 'global-settings',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
