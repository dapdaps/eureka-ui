import { create } from 'zustand';

type IState = {
  data?: any;
};

type IStore = IState & {
  set: (update: IState) => void;
};

export const useIsolateStore = create<IStore>((set) => ({
  data: [],
  set: (params) => set(() => ({ ...params }))
}));
