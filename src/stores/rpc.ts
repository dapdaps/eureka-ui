import { create } from 'zustand';
import { RpcList } from '@/utils/config';
import { createJSONStorage, persist } from 'zustand/middleware';

type RpcState = {
  visible: boolean;
  alert: boolean;
  selected: RpcList;
  ping: Partial<Record<RpcList, number>>;
};

type RpcStore = RpcState & {
  setVisible: (visible: boolean) => void;
  setAlert: (alert: boolean) => void;
  setSelected: (rpc: RpcList) => void;
  setPing: (ping: Partial<Record<RpcList, number>>) => void;
  set: (state: Partial<RpcState>) => void;
};

export const useRpcStore = create(persist<RpcStore>((set) => ({
  visible: false,
  alert: false,
  selected: RpcList.Default,
  ping: {},
  setVisible: (visible: boolean) => {
    set({ visible });
  },
  setSelected: (rpc: RpcList) => {
    set({ selected: rpc });
  },
  setAlert: (alert: boolean) => {
    set({ alert });
  },
  setPing: (ping) => {
    set((prev) => ({
      ...prev,
      ping: {
        ...prev.ping,
        ...ping,
      },
    }));
  },
  set: (state) => {
    set((prev) => ({ ...prev, ...state }));
  },
}), {
  name: '_DAPDAP_RPC_STORAGE',
  version: 0.1,
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({ selected: state.selected, ping: state.ping }) as any,
}));
