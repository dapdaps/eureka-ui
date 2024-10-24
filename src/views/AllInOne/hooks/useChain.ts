import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import popupsData from '@/config/all-in-one/chains';
import Bridge from '@/views/AllInOne/components/Bridge';
import LendingEntry from '@/views/AllInOne/components/Lending/Entry';
import LiquidityEntry from '@/views/AllInOne/components/Liquidity/Entry';
import Trade from '@/views/AllInOne/components/Trade';

export const MenuConfig: { [k: string]: any } = {
  Bridge: {
    component: Bridge,
    id: 1000
  },
  Swap: {
    component: Trade,
    id: 1001
  },
  Lending: {
    component: LendingEntry,
    id: 1002
  },
  Liquidity: {
    component: LiquidityEntry,
    id: 1003
  }
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

    const handleWindowResize = () => {
      const _currentChainMenuList = menuConfigList.map((it: any, idx: number) => {
        const menuItem = {
          ...it,
          component: MenuConfig[it.tab].component
        };
        return menuItem;
      });
      serCurrentChainMenuList(_currentChainMenuList);
    };
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [currentChain]);

  const { run } = useDebounceFn(
    () => {
      const _currentChain = popupsData[chain] || popupsData['arbitrum'];
      if (_currentChain.menuConfig) {
        for (const key in _currentChain.menuConfig) {
          const curr = _currentChain.menuConfig[key].tab;
          _currentChain.menuConfig[key].id = MenuConfig[curr]?.id;
        }
      }
      setCurrentChain(_currentChain);
      setShowComponent(true);
    },
    { wait: 500 }
  );

  useEffect(() => {
    run();
  }, [chain]);

  return {
    currentChain,
    setCurrentChain,
    showComponent,
    setShowComponent,
    currentChainMenuList
  };
}

interface Props {
  chain: string;
  menu?: string;
}
