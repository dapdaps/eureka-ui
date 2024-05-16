import { create } from 'zustand';
import config from '@/config/uniswap';

export const useTokensStore = create((set, get: any) => ({
  tokens: config.tokens,
  stableTokens: [config.tokens['native'], config.tokens['usdc']],
  setTokens: (tokens: any) => {
    set({ tokens: tokens });
  },
  getTokens: () => get().tokens,
}));
