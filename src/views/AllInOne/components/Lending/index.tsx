import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import popupsData from '@/config/all-in-one/chains';
import lendingConfig from '@/config/lending/networks';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import { useAllInOneTabCachedStore } from '@/stores/all-in-one';
import { usePriceStore } from '@/stores/price';
import { StyledFlex } from '@/styled/styles';
import { multicall } from '@/utils/multicall';
import MarketItems from '@/views/AllInOne/components/MarketItems/index';
import Tabs from '@/views/AllInOne/components/Tabs/index';

import { Theme } from './styles';

const tabsList = [
  {
    key: 'Market',
    label: 'Market',
    value: 'Market',
  },
  {
    key: 'Yours',
    label: 'Yours',
    value: 'Yours',
  },
];
const Lending = () => {
  const router = useRouter();
  const { account, chainId } = useAccount();
  const { addAction } = useAddAction('all-in-one');
  const [currTab, setCurrTab] = useState<string>(tabsList[0].key);
  const [currMarket, setCurrMarket] = useState<string>('');
  const prices = usePriceStore((store) => store.price);

  // console.log(lendingConfig[59144], prices);

  const onMarketChange = (market: string) => {
    setCurrMarket(market)
  }
  const onTabChange = (tab: string) => {
    setCurrTab(tab);
  }
  const chain = router.query.chain as string;
  const cachedTabsStore: any = useAllInOneTabCachedStore();
  const [currentChain, setCurrentChain] = useState<any>();
  const { run } = useDebounceFn(
    () => {
      const _currentChain = popupsData[chain] || popupsData['arbitrum'];
      setCurrentChain(_currentChain);
      // setShowComponent(true);
      // const cachedTab = cachedTabsStore.chains[_currentChain.chainId];
      // if (sourceTab) {
      //   setTab(sourceTab);
      // } else if (cachedTab) {
      //   setTab(cachedTab);
      // } else {
      //   setTab(_currentChain.defaultTab);
      // }
    },
    { wait: 500 },
  );
  useEffect(() => {
    run();
  }, [chain]);
  const tabConfig = lendingConfig[59144] || {};

  console.log(tabConfig.dapps[tabConfig.defaultDapp]);

  const [ currentDapp, setCurrentDapp ] = useState(tabConfig.defaultDapp || 'All');

  const [ marketsInfo, setMarketsInfo ] = useState({markets:{}, dapps: {}});
  return (
    <div>
      <StyledFlex justifyContent="space-between">
        <Tabs
          tabs={tabsList}
          onTabChange={onTabChange}
          currTab={currTab} />
        <MarketItems
          currMarket={currMarket}
          list={[]}
          onMarketChange={onMarketChange} />
      </StyledFlex>
      <Theme>
      {tabConfig.defaultDapp && (
        <>
          {(tabConfig.defaultDapp === "All" || !tabConfig.dapps[tabConfig.defaultDapp]) && (
            <ComponentWrapperPage src="bluebiu.near/widget/0vix.LendingSpinner" />
          )}

          <ComponentWrapperPage
            src="bluebiu.near/widget/Avalanche.Lending.Data"
            componentProps={{
              update: tabConfig.defaultDapp,
              dapps: tabConfig.dapps,
              chainId,
              multicall,
              ...tabConfig,
              prices,
              account,
              onLoad: (data: Record<string, any>) => {
                const { markets, dapp } = data;
                const dapps: any = {};
                dapps[dapp.dappName] = dapp;
                const _markets = {  ...markets };
                console.log(dapps);
                console.log('------5-----', _markets);
                setMarketsInfo({
                  markets: _markets,
                  dapps,
                });
              },
            }}
          />
        </>
      )}
      {
        Object.keys(marketsInfo.markets).length > 0 ? <ComponentWrapperPage
          src="bluebiu.near/widget/Avalanche.Lending.Market"
          componentProps={{
            currentDapp: tabConfig.defaultDapp,
            ...marketsInfo,
            timestamp: Date.now(),
            onButtonClick: () => {
              console.log('oisfopi');
            },
            account,
          }}
        /> : null
      }
        </Theme>
    </div>
  );
};

export default Lending;