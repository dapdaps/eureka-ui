import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useIconsStore = create(
  persist(
    (set, get: any) => ({
      icons: {},
      addIcon: (icon: any) => {
        const _icons = get().icons;
        _icons[icon.symbol] = icon.src;
        set({ _icons: _icons });
      },
      getIcon: (icon: any) => (icon?.symbol ? get().icons[icon.symbol] : ''),
    }),
    {
      name: 'icon-urls',
      version: 0.2,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
