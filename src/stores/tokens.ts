import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import config from '@/config/uniswap/linea';

export const useTokensStore = create(
  persist(
    (set, get: any) => ({
      tokens: config.tokens || {},
      historyTokens: {},
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
