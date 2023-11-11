import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useHistoryTokensStore = create(
  persist(
    (set, get: any) => ({
      historyTokens: {},
      importTokens: {},
      addImportToken: (token: any) => {
        const _tokens = get().importTokens;
        _tokens[token.address] = { ...token, isImport: true };
        set({ importTokens: _tokens });
      },
      addHistoryToken: (tokens: any) => {
        const _tokens = get().historyTokens;
        set({ historyTokens: { ..._tokens, ...tokens } });
      },
      getHistoryTokens: () => get().historyTokens,
    }),
    {
      name: 'history-tokens',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
