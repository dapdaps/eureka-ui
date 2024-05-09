import { useEffect, useMemo, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import popupsData from '@/config/all-in-one/chains';
import Trade from '@/views/AllInOne/components/Trade';
import Bridge from '@/views/AllInOne/components/Bridge';
import Lending from '@/views/AllInOne/components/Lending';
import Liquidity from '@/views/AllInOne/components/Liquidity';

const MenuConfig: { [k: string]: any } = {
  Trade,
  Bridge,
  Lending,
  Liquidity,
};

export function useChain(props: Props) {
  const { chain, menu } = props;

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

  const currentMenu = useMemo(() => {
    if (!currentChain.menuConfig) return null;
    const currMenu = currentChainMenuList.find((it: any) => it.tab === menu);
    return currMenu || false;
  }, [currentChain, currentChainMenuList, menu]);

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
    currentMenu,
  };
}

interface Props {
  chain: string;
  menu?: string;
}
