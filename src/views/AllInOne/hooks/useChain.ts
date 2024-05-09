import { useDebounceFn } from 'ahooks';
import { useEffect, useMemo, useState } from 'react';

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

  const currentChainMenuList = useMemo(() => {
    if (!currentChain.menuConfig) return [];
    return Object.values(currentChain.menuConfig).map((it: any) => {
      const menuItem = {
        ...it,
        component: MenuConfig[it.tab],
      };
      return menuItem;
    });
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
