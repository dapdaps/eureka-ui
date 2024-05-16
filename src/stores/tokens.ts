import { create } from 'zustand';
import config from '@/config/uniswap';

export const useTokensStore = create((set, get: any) => ({
  tokens: config.tokens,
  stableTokens: [
    config.tokens['native'],
    config.tokens['0x9571566D7ECb2fc899477bF295248a20FF4Adb61'],
    config.tokens['0x78F942F8F9110067c08183183c45903e5Dc2763A'],
  ],
  setTokens: (tokens: any) => {
    set({ tokens: tokens });
  },
  getTokens: () => get().tokens,
}));
