import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ModeKey } from '@/views/networks/list';

export const useNetworkStore = create(
  persist(
    (set, get: any) => ({
      mode: 'list',
      setMode: (_mode: ModeKey) => set({ mode: _mode })
    }),
    {
      name: 'network-list-mode',
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
