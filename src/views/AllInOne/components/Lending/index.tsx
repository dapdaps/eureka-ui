import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { memo,useEffect, useState } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import popupsData from '@/config/all-in-one/chains';
import lendingConfig from '@/config/lending/networks';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
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
  const toast = useToast();
  const { account, chainId } = useAccount();
  const { addAction } = useAddAction('all-in-one');
  const [currTab, setCurrTab] = useState<string>(tabsList[0].key);
  const [tabConfig, setTabConfig] = useState<any>({ dapps: {} });
  const prices = usePriceStore((store) => store.price);

  const chain = router.query.chain as string;
  const [currentChain, setCurrentChain] = useState<any>({});
  const [currMarket, setCurrMarket] = useState<string>('');
  const [showDialog, setShowDialog] = useState(false);
  const [tableButtonClickData, setTableButtonClickData] = useState<any>(null);
  const [timestamp, setTimestamp] = useState(Date.now());
  const { run } = useDebounceFn(
    () => {
      const _currentChain = popupsData[chain] || popupsData['arbitrum'];
      const _tabConfig = lendingConfig[_currentChain?.chainId];
      console.log(_tabConfig);
      setCurrentChain(_currentChain);
      setTabConfig(_tabConfig);
      setCurrMarket(_tabConfig?.defaultDapp ?? 'All Market');
    },
    { wait: 500 },
  );
  useEffect(() => {
    run();
  }, [chain]);

  const onMarketChange = (market: string) => {
    const _market = market === 'All' ? (Object.values(tabConfig.dapps).length === Object.values(marketsInfo.dapps).length ? '' : market) : market;
    setCurrMarket(_market);
    setTimestamp(Date.now());
  };
  const onTabChange = (tab: string) => {
    setCurrTab(tab);
  };
  const [marketsInfo, setMarketsInfo] = useState<any>({ markets: {}, dapps: {} });

  return (
    <div>
      <StyledFlex justifyContent="space-between">
        <Tabs
          tabs={tabsList}
          onTabChange={onTabChange}
          currTab={currTab} />
        <MarketItems
          currMarket={currMarket}
          list={Object.values(tabConfig.dapps) ?? []}
          onMarketChange={onMarketChange} />
      </StyledFlex>
      <Theme>
        {tabConfig.defaultDapp && (
          <>
            {(tabConfig.defaultDapp === 'All' || !tabConfig.dapps[tabConfig.defaultDapp]) && (
              <ComponentWrapperPage src="bluebiu.near/widget/0vix.LendingSpinner" />
            )}
            <ComponentWrapperPage
              src="bluebiu.near/widget/Avalanche.Lending.Data"
              componentProps={{
                update: currMarket,
                chainId,
                multicall,
                ...tabConfig,
                prices,
                account,
                onLoad: (data: Record<string, any>) => {
                  const { markets, dapp } = data;
                  const dapps: any = {};
                  dapps[dapp.dappName] = dapp;
                  const _markets = { ...markets };
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
          currTab === 'Market' ? (
            <ComponentWrapperPage
              src="bluebiu.near/widget/Avalanche.Lending.Market"
              componentProps={{
                currentDapp: currMarket,
                ...marketsInfo,
                timestamp: timestamp,
                onButtonClick: (address: string, actionText: any) => {
                  const market = marketsInfo.markets[address];
                  const dapp = marketsInfo.dapps[market.dapp];
                  const dappConfig = tabConfig.dapps[market.dapp];
                  setTableButtonClickData({
                    ...dapp,
                    ...market,
                    config: { ...dappConfig, wethAddress: tabConfig?.wethAddress},
                    actionText,
                  })
                  ;
                  setShowDialog(true);
                },
                account,
              }}
            />
          ) : null
        }
        {
          currTab === 'Yours' && (
            <ComponentWrapperPage
              src="bluebiu.near/widget/Avalanche.Lending.Yours"
              componentProps={{
                currentDapp: currMarket,
                ...marketsInfo,
                dappsConfig: tabConfig.dapps,
                toast,
                account,
                onButtonClick: () => {
                },
                onSuccess: (dapp: string) => {
                  setCurrMarket(dapp);
                },
              }}
            />
          )
        }
        <ComponentWrapperPage
          src="bluebiu.near/widget/Avalanche.Lending.Dialog"
          componentProps={{
            display: showDialog,
            data: tableButtonClickData,
            chainId,
            addAction,
            toast,
            account,
            onClose: () => {
              setShowDialog(false)
            },
            onSuccess: () => {
              setCurrMarket(tableButtonClickData?.dappName);
            },
          }}
        />
      </Theme>
    </div>
  );
};

export default memo(Lending);