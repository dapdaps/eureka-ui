import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useFjordStore = create(
  persist(
    (set, get: any) => ({
      remindArray: [false, false, false],
      set: (params: any) => set(() => ({ ...params }))
    }),
    {
      name: '_fjord',
      version: 0.1,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
