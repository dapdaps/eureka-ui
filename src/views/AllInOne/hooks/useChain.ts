import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import popupsData from '@/config/all-in-one/chains';
import Bridge from '@/views/AllInOne/components/Bridge';
import LendingEntry from '@/views/AllInOne/components/Lending/Entry';
import LiquidityEntry from '@/views/AllInOne/components/Liquidity/Entry';
import Trade from '@/views/AllInOne/components/Trade';

const MenuConfig: { [k: string]: any } = {
  Trade,
  Bridge,
  Lending: LendingEntry,
  Liquidity: LiquidityEntry,
};

export function useChain(props: Props) {
  const { chain } = props;

  const [currentChain, setCurrentChain] = useState<any>({});
  const [showComponent, setShowComponent] = useState(false);
  const [currentChainMenuList, serCurrentChainMenuList] = useState<any>([]);

  useEffect(() => {
    if (!currentChain.menuConfig) {
      serCurrentChainMenuList([]);
      return;
    }
    const menuConfigList = Object.values(currentChain.menuConfig);
    const getEntryCardWidth = (index: number) => {
      index += 1;
      if (menuConfigList.length >= 4) {
        if (window.innerWidth < 992) {
          return { flex: 1 };
        }
        if ([1, 0].includes(index % 4)) {
          return { flexBasis: `calc(40% - 12px)` };
        }
        if ([2, 3].includes(index % 4)) {
          return { flexBasis: `calc(60% - 12px)` };
        }
      }
      return { flex: 1 };
    };
    const handleWindowResize = () => {
      const _currentChainMenuList = menuConfigList.map((it: any, idx: number) => {
        const menuItem = {
          ...it,
          component: MenuConfig[it.tab],
          entryCardWidth: getEntryCardWidth(idx),
        };
        return menuItem;
      });
      serCurrentChainMenuList(_currentChainMenuList);
    };
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, [currentChain]);

  const { run } = useDebounceFn(
    () => {
      const _currentChain = popupsData[chain] || popupsData['arbitrum'];
      setCurrentChain(_currentChain);
      setShowComponent(true);
    },
    { wait: 500 },
  );

  useEffect(() => {
    run();
  }, [chain]);

  return {
    currentChain,
    setCurrentChain,
    showComponent,
    setShowComponent,
    currentChainMenuList,
  };
}

interface Props {
  chain: string;
  menu?: string;
}
