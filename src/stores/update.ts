import { create } from 'zustand';

interface IUpdate {
  updateCounter: number;
  updater: () => void;
}

export const useUpdaterStore = create<IUpdate>((set) => ({
  updateCounter: 0,
  updater: () =>
    set((state) => ({
      updateCounter: state.updateCounter + 1
    }))
}));
