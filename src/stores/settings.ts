import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set, get: any) => ({
      slippage: '',
      setSlippage: (slippage: string) => set({ slippage: slippage }),
      getSlippage: () => get().slippage,
    }),
    {
      name: 'global-settings',
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
