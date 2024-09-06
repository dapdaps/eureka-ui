import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

import type { Tab } from '@/views/Dapp/components/Tabs';
import DAppTabs from '@/views/Dapp/components/Tabs';

const Dex = dynamic(() => import('@/views/Dapp/SwapDapp'));

const SwapAndPool = (props: Props) => {
  const { Pools, ...restProps } = props;

  const Tabs: Record<'Dex' | 'Pools', Tab> = {
    Dex: {
      key: 1,
      name: 'Dex',
      content: <Dex {...restProps} />,
    },
    Pools: {
      key: 2,
      name: 'Pools',
      content: <Pools  {...restProps} />,
    },
  };

  return (
    <DAppTabs tabs={Object.values(Tabs)} />
  );
};

export default SwapAndPool;

interface Props {
  Pools: ComponentType<any>;

  [k: string]: any;
}
