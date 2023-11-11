import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import config from '@/config/uniswap/linea';

export const useTokensStore = create(
  persist(
    (set, get: any) => ({
      tokens: config.tokens,
      setTokens: (tokens: any) => {
        set({ tokens: tokens });
      },
      getTokens: () => get().tokens,
    }),
    {
      name: 'config-tokens',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
