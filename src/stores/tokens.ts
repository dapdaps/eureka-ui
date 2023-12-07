import { create } from 'zustand';
import config from '@/config/uniswap';

export const useTokensStore = create((set, get: any) => ({
  tokens: config.tokens,
  stableTokens: [
    config.tokens['native'],
    config.tokens['0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5'],
    config.tokens['0x176211869cA2b568f2A7D4EE941E073a821EE1ff'],
    config.tokens['0xA219439258ca9da29E9Cc4cE5596924745e12B93'],
    config.tokens['0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4'],
    config.tokens['0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f'],
  ],
  setTokens: (tokens: any) => {
    set({ tokens: tokens });
  },
  getTokens: () => get().tokens,
}));
