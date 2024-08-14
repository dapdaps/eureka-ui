import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const usePortfolioStore = create(
  persist(
    (set, get: any) => ({
      show: true,
      setShow: (_show: boolean) => set({ show: _show })
    }),
    {
      name: 'portfolio-notification',
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
