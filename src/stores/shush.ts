import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { cloneDeep } from 'lodash';

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
      status: {},
      addStatus: (houdiniId: string, status: number) => {
        const _status = get().status;
        _status[houdiniId] = status;
        set({
          orders: cloneDeep(_status),
        });
      },
      addOrder: (order: any) => {
        const _orders = get().orders;
        _orders[order.houdiniId] = order;
        set({
          orders: cloneDeep(_orders),
        });
      },
      setSemi: (id: string, semi: boolean) => {
        const _semis = get().semis;
        _semis[id] = semi;
        set({
          semis: cloneDeep(_semis),
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
