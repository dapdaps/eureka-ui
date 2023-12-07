import { create } from 'zustand';
import config from '@/config/uniswap';

export const useTokensStore = create((set, get: any) => ({
  tokens: config.tokens,
  stableTokens: [
    config.tokens['native'],
    config.tokens['0xcA77eB3fEFe3725Dc33bccB54eDEFc3D9f764f97'],
    config.tokens['0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4'],
    config.tokens['0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df'],
    config.tokens['0x3C1BCa5a656e69edCD0D4E36BEbb3FcDAcA60Cf1'],
    config.tokens['0x5300000000000000000000000000000000000004'],
  ],
  setTokens: (tokens: any) => {
    set({ tokens: tokens });
  },
  getTokens: () => get().tokens,
}));
