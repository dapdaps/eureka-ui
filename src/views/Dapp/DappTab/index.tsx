import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

import type { Tab } from '@/views/Dapp/components/Tabs';
import DAppTabs from '@/views/Dapp/components/Tabs';

import BosDapp from '../BosDapp';
import BridgePanel from '../Bridge';
import LockPanel from '../Lock';

const Dex = dynamic(() => import('@/views/Dapp/SwapDapp'));

type TabKey = 'Dex' | 'Pools' | 'Lock' | 'Lend' | 'Bridge' | 'Stake';

const DappTab = (props: Props) => {
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
      content: <Pools {...restProps} dapp={dapp} />
    },
    Lock: {
      key: 3,
      name: 'Lock',
      content: <LockPanel {...restProps} />
    },
    Lend: {
      key: 4,
      name: 'Lend',
      content: <BosDapp {...restProps} dapp={dapp} />
    },
    Stake: {
      key: 5,
      name: 'Stake',
      content: <BosDapp {...restProps} dapp={dapp} />
    },
    Bridge: {
      key: 5,
      name: 'Bridge',
      content: <BridgePanel {...restProps} dapp={dapp} />
    }
  };

  const routeTabConfig: Record<string, TabKey[]> = {
    'dapp/lynex': ['Dex', 'Pools', 'Lock'],
    'dapp/trader-joe': ['Dex', 'Lend'],
    'dapp/zerolend': ['Stake', 'Lend'],
    'dapp/lore': ['Stake', 'Lend'],
    'dapp/xy-finance': ['Dex', 'Bridge'],
    default: ['Dex', 'Pools']
  };

  const matchRoute = (configRoutes: string[], currentRoute: string): string => {
    const cleanRoute = currentRoute.split('?')[0]; // 移除查询参数
    return configRoutes.find((route) => cleanRoute.startsWith(route)) || 'default';
  };

  const computedTabs = (currentRoute: string): Record<TabKey, Tab> => {
    const configRoutes = Object.keys(routeTabConfig);
    const matchedRoute = matchRoute(configRoutes, currentRoute);
    const tabKeys = routeTabConfig[matchedRoute];
    return Object.fromEntries(tabKeys.map((key) => [key, Tabs[key]])) as Record<TabKey, Tab>;
  };
  console.log(dapp.route, '<<<dapp.route');

  const generateTabs = computedTabs(dapp.route);

  return <DAppTabs tabs={Object.values(generateTabs)} dapp={dapp} />;
};

export default DappTab;

interface Props {
  Pools: ComponentType<any>;

  [k: string]: any;
}
