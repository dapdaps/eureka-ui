import { create } from 'zustand';

type IState = {
  showConfirmOfficialUrl: boolean;
};

type IStore = IState & {
    set: (update: IState) => void;
}

export const useShowTipsStore = create<IStore>((set) => ({
    showConfirmOfficialUrl: true,
    set: (params) => set(() => ({ ...params })),
}));
