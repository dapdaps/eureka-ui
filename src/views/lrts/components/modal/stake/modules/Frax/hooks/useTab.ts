import { create } from 'zustand';

type IState = {
    tab: string
};

type IConfig = IState & {
    set: (state: IState) => void;
  };

export const useTabStore = create<IConfig>((set) => ({
  tab: '',
  set: (params: any) => set(() => ({ ...params })),
}));
