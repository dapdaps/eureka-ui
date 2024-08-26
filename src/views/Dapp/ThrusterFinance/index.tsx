import dynamic from 'next/dynamic';
import DAppTabs, { Tab } from '@/views/Dapp/components/Tabs';

const Tabs: Record<'Dex' | 'Pools', Tab> = {
  Dex: {
    key: 1,
    name: 'Dex',
    content: dynamic(() => import('./Dex')),
  },
  Pools: {
    key: 2,
    name: 'Pools',
    content: dynamic(() => import('./Pools')),
  },
};

const ThrusterFinance = (props: any) => {

  return (
    <DAppTabs tabs={Object.values(Tabs)} {...props} />
  );
};

export default ThrusterFinance;
