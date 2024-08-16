import { create } from 'zustand';

type UpdateBalanceStore = {
  updater: number;
  setUpdater: (value: number) => void;
};

export const useUpdateBalanceStore = create<UpdateBalanceStore>((set) => ({
  updater: 0,
  setUpdater: (value) => set({ updater: value }),
}));
