import { create } from 'zustand';

type IState = {
  list?: any
  loading?: boolean;
};

type IStore = IState & {
  set: (update: IState) => void;
};

export const useTokenPriceListStore = create<IStore>((set) => ({
  list: null,
  loading: false,
  set: (params) => set(() => ({ ...params })),
}));


export const useTokenPriceLatestStore = create<IStore>((set) => ({
  list: null,
  loading: false,
  set: (params) => set(() => ({ ...params })),
}));