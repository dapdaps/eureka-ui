import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import config from '@/config/uniswap/linea';

export const useTokensStore = create(
  persist(
    (set, get: any) => ({
      tokens: config.tokens || {},
      historyTokens: {},
      addImportToken: (token: any) => {
        const _tokens = get().tokens;
        _tokens[token.address] = { ...token, isImport: true };
        set({ tokens: _tokens });
      },
      getTokens: () => get().tokens,
      addHistoryToken: (tokens: any) => {
        const _tokens = get().historyTokens;
        set({ historyTokens: { ..._tokens, ...tokens } });
      },
      getHistoryTokens: () => get().historyTokens,
    }),
    {
      name: 'import-tokens',
      version: 0.8,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
