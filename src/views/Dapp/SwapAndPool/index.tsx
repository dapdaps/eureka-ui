import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

import type { Tab } from '@/views/Dapp/components/Tabs';
import DAppTabs from '@/views/Dapp/components/Tabs';

import LockPanel from '../Lock';

const Dex = dynamic(() => import('@/views/Dapp/SwapDapp'));

type TabKey = 'Dex' | 'Pools' | 'Lock';

const SwapAndPool = (props: Props) => {
  const { Pools, dapp, ...restProps } = props;

  const Tabs: Record<TabKey, Tab> = {
    Dex: {
      key: 1,
      name: 'Dex',
      content: <Dex {...restProps} />
    },
    Pools: {
      key: 2,
      name: 'Pools',
      content: <Pools {...restProps} />
    },
    Lock: {
      key: 3,
      name: 'Lock',
      content: <LockPanel {...restProps} />
    }
  };

  const routeTabConfig: Record<string, TabKey[]> = {
    'dapp/lynex': ['Dex', 'Pools', 'Lock'],
    default: ['Dex', 'Pools']
  };

  const computedTabs = (currentRoute: string): Record<TabKey, Tab> => {
    const tabKeys = routeTabConfig[currentRoute] || routeTabConfig['default'];
    return Object.fromEntries(tabKeys.map((key) => [key, Tabs[key]])) as Record<TabKey, Tab>;
  };

  const generateTabs = computedTabs(dapp.route);

  return <DAppTabs tabs={Object.values(generateTabs)} />;
};

export default SwapAndPool;

interface Props {
  Pools: ComponentType<any>;

  [k: string]: any;
}
