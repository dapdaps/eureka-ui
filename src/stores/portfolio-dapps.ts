import type Big from 'big.js';
import { create } from 'zustand';

type PortfolioDAppsState = {
  loading: boolean;
  dapps: any;
  dappsByChain: any;
  totalBalance?: Big.Big;
};

type AuthStore = PortfolioDAppsState & {
  setLoading: (loading: boolean) => void;
  setDapps: (dapps: any) => void;
  setDappsByChain: (dappsByChain: any) => void;
  setTotalBalance: (totalBalance?: Big.Big) => void;
  set: (state: PortfolioDAppsState) => void;
};

export const usePortfolioDAppsStore = create<AuthStore>((set) => ({
  loading: true,
  dapps: [],
  dappsByChain: [],
  totalBalance: void 0,
  setLoading: (loading) => set((previousState) => ({ ...previousState, loading })),
  setDapps: (dapps) => set((previousState) => ({ ...previousState, dapps })),
  setDappsByChain: (dappsByChain) => set((previousState) => ({ ...previousState, dappsByChain })),
  setTotalBalance: (totalBalance) => set((previousState) => ({ ...previousState, totalBalance })),
  set: (state) => set((previousState) => ({ ...previousState, ...state }))
}));
