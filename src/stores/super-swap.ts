import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useSuperSwapStore = create(
  persist(
    (set, get: any) => ({
      tokens: {},
      addCurrencies: ({ inputCurrency, outputCurrency }: any) => {
        const _tokens = get().tokens;
        const _chainTokens = {
          inputCurrency,
          outputCurrency
        };
        set({
          tokens: {
            ..._tokens,
            [inputCurrency.chainId]: _chainTokens
          }
        });
      }
    }),
    {
      name: 'super-swap',
      version: 1,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
