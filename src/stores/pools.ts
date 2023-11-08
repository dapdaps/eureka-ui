import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCachedPoolsStore = create(
  persist(
    (set, get: any) => ({
      pools: {},
      setPool: (pool: any) => {
        const _pools = get().pools;
        _pools[pool.id] = pool;
        set({ pools: _pools });
      },
      getPool: (id: any) => get().pools[id],
    }),
    {
      name: 'cached_pools',
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
