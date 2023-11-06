import { create } from 'zustand';

type PositionsState = {
  positions: { [key: string]: any };
};

type PositionsStore = PositionsState & {
  set: (update: PositionsState) => void;
};

export const usePositionsStore = create<PositionsStore>((set) => ({
  positions: {},
  set: (params) => set(() => ({ ...params })),
}));
