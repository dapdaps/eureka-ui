import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { orderBy } from 'lodash';

type Version = {
  key: number,
  name: string,
  time: number;
  readed: boolean;
};

type State = {
  list: Version[];
};

type Store = State & {
  setRead: (key: number, readed: boolean) => Version[];
  getVersion: () => Version | undefined;
}

export const useVersionStore = create(persist<Store>((set, get) => ({
    list: [
      { key: 1, name: 'd’Avinci', time: new Date('2024-08-24 00:00:00').getTime(), readed: false },
    ],
    setRead: (key: number, readed: boolean) => {
      const list = get().list.slice();
      const curr = list.find((it) => it.key === key);
      if (!curr) return list;
      curr.readed = readed;
      set({ list });
      return get().list;
    },
    getVersion: () => {
      const list = get().list.slice();
      const sorted = orderBy(list, 'time', 'desc');
      return sorted[0];
    },
  }), {
    name: '_DAPDAP_VERSION_STORAGE',
    version: 0.1,
    storage: createJSONStorage(() => localStorage),
  }),
);
