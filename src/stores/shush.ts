import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useShushTokensStore = create(
  persist(
    (set, get: any) => ({
      tokens: null,
      networks: null,
      set: (params: any) => set(() => ({ ...params })),
    }),
    {
      name: '_shushi_tokens',
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useShushOrdersStore = create(
  persist(
    (set, get: any) => ({
      orders: {},
      semis: {},
      addOrder: (order: any) => {
        const _orders = get().orders;
        _orders[order.houdiniId] = order;
        set({
          orders: _orders,
        });
      },
      setSemi: (id: string, semi: boolean) => {
        const _semis = get().semis;
        _semis[id] = semi;
        set({
          semis: _semis,
        });
      },
      set: (params: any) => set(() => ({ ...params })),
    }),
    {
      name: '_shushi_orders',
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
