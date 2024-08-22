import { cloneDeep } from 'lodash';
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
      version: 0.2,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useShushOrdersStore = create(
  persist(
    (set, get: any) => ({
      orders: {},
      addOrder: (order: any) => {
        const _orders = get().orders;
        _orders[order.id] = order;
        set({
          orders: cloneDeep(_orders),
        });
      },
      getOrder: (id: string) => get().orders[id],
      set: (params: any) => set(() => ({ ...params })),
    }),
    {
      name: '_shush_orders',
      version: 0.2,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
