import { create } from 'zustand';

export enum ITab {
  MINT = 'mint',
  REDEEM = 'redeem',
  STAKE = 'stake',
  UNSTAKE = 'unstake',
}

type IState = {
    tab: ITab
};

type IConfig = IState & {
    set: (state: IState) => void;
  };

export const useTabStore = create<IConfig>((set) => ({
  tab: ITab.MINT,
  set: (params: any) => set(() => ({ ...params })),
}));
