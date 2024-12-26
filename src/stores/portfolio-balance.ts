import type Big from 'big.js';
import { create } from 'zustand';

type PortfolioBalanceState = {
  loading: boolean;
  tokens: any;
  networks: any;
  totalBalance?: Big.Big;
};

type AuthStore = PortfolioBalanceState & {
  set: (state: PortfolioBalanceState) => void;
  setLoading: (loading: boolean) => void;
  setTokens: (tokens: any) => void;
  setNetworks: (networks: any) => void;
  setTotalBalance: (totalBalance?: Big.Big) => void;
};

export const usePortfolioBalanceStore = create<AuthStore>((set) => ({
  loading: true,
  tokens: [],
  networks: [],
  totalBalance: void 0,
  setLoading: (loading) => set((previousState) => ({ ...previousState, loading })),
  setTokens: (tokens) => set((previousState) => ({ ...previousState, tokens })),
  setNetworks: (networks) => set((previousState) => ({ ...previousState, networks })),
  setTotalBalance: (totalBalance) => set((previousState) => ({ ...previousState, totalBalance })),
  set: (state) => set((previousState) => ({ ...previousState, ...state }))
}));
