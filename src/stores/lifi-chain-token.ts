import {create} from "zustand";

import type { Chain, LifiChainToken } from "../components/Bridge/types";

export type LifiChainAndTokenState = {
  chains: Chain[];
  tokens: LifiChainToken;
}

export type LifiChainAndTokenStore = LifiChainAndTokenState & {
  setChains: (chains: Chain[]) => void;
  setTokens: (tokens: LifiChainToken) => void;
}

export default create<LifiChainAndTokenStore>(set => ({
  chains: [],
  tokens: {},
  setChains: (chains: Chain[]) => set((state) => ({
    ...state,
    chains,
  })),
  setTokens: (tokens) => set((state) => ({
    ...state,
    tokens,
  })),
}))
