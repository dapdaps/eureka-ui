import { create } from 'zustand';
import { createJSONStorage,persist } from 'zustand/middleware';

export const useImportTokensStore = create(
  persist(
    (set, get: any) => ({
      importTokens: {},
      addImportToken: (token: any) => {
        const _tokens = get().importTokens;
        const _chainTokens = _tokens[token.chainId] || [];
        _chainTokens.push({ ...token, isImport: true });
        set({
          importTokens: {
            ..._tokens,
            [token.chainId]: _chainTokens,
          },
        });
      },
    }),
    {
      name: 'import-tokens',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
