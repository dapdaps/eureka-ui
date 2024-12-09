import { create } from 'zustand';

type IDetail = {
  detail: { [key: string]: string };
};

type IDetailStore = IDetail & {
  set: (update: IDetail) => void;
};

export const useDetailStore = create<IDetailStore>((set) => ({
  detail: {},
  set: (params) => set(() => ({ ...params }))
}));
