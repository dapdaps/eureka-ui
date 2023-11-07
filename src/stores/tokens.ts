import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import config from '@/config/uniswap/linea';

export const useTokensStore = create(
  persist(
    (set, get: any) => ({
      tokens: config.tokens || {},
      historyTokens: {
        '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068': {
          chainId: 59140,
          address: '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068',
          decimals: 6,
          symbol: 'USDC',
          name: 'USD Coin',
          icon: 'https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla',
        },
      },
      addImportTokens: (token: any) => {
        const _tokens = get().tokens;
        _tokens[token.address] = { ...token, isImport: true };
        set({ tokens: _tokens });
      },
      getTokens: () => get().tokens,
      addHistoryTokens: (token: any) => {
        const _tokens = get().historyTokens;
        _tokens[token.address] = token;
        set({ historyTokens: _tokens });
      },
      getHistoryTokens: () => get().historyTokens,
    }),
    {
      name: 'import-tokens',
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
