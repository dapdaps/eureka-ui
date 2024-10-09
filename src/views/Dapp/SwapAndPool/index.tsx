import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';

import type { Tab } from '@/views/Dapp/components/Tabs';
import DAppTabs from '@/views/Dapp/components/Tabs';

const Dex = dynamic(() => import('@/views/Dapp/SwapDapp'));

const SwapAndPool = (props: Props) => {
  const { Pools, ...restProps } = props;

  const Tabs: Record<'Dex' | 'Pools', Tab> = {
    Dex: {
      key: 1,
      name: 'Dex',
      content: <Dex {...restProps} />
    },
    Pools: {
      key: 2,
      name: 'Pools',
      content: <Pools {...restProps} />
    }
  };

  const [currentTab, setCurrentTab] = useState<Tab>(Tabs.Dex);

  useEffect(() => {
    if (['dapp/thruster-liquidity', 'dapp/kim-exchange-liquidity'].includes(props.dapp?.route)) {
      setCurrentTab(Tabs.Pools);
      return;
    }
    setCurrentTab(Tabs.Dex);
  }, [props.dapp?.route]);

  return <DAppTabs currentTab={currentTab} setCurrentTab={setCurrentTab} tabs={Object.values(Tabs)} />;
};

export default SwapAndPool;

interface Props {
  Pools: ComponentType<any>;

  [k: string]: any;
}
