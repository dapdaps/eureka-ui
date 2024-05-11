import { memo, useEffect, useState } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import lendingConfig from '@/config/lending/networks';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import { usePriceStore } from '@/stores/price';
import { StyledFlex } from '@/styled/styles';
import { multicall } from '@/utils/multicall';
import MarketItems from '@/views/AllInOne/components/MarketItems/index';
import Tabs from '@/views/AllInOne/components/Tabs/index';

import { Theme } from '@/views/AllInOne/styles';
import { StyledContent } from "@/views/AllInOne/components/Lending/styles";

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

const Lending = (props: Props) => {
  const { chain } = props;

  const toast = useToast();
  const { account, chainId } = useAccount();
  const { addAction } = useAddAction('all-in-one');
  const prices = usePriceStore((store) => store.price);

  const [currTab, setCurrTab] = useState<string>(tabsList[0].key);
  const [tabConfig, setTabConfig] = useState<any>({ dapps: {} });
  const [currMarket, setCurrMarket] = useState<string>('');
  const [showDialog, setShowDialog] = useState(false);
  const [tableButtonClickData, setTableButtonClickData] = useState<any>(null);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [marketsInfo, setMarketsInfo] = useState<any>({});
  const [dappsInfo, setDappsInfo] = useState<any>({});
  const [updateData, setUpdateData] = useState<string>('');

  const onMarketChange = (market: string) => {
    setCurrMarket(market);
    setTimestamp(Date.now());
    let _updateDapp = "";
    if (market == 'All') {
      _updateDapp =
        Object.values(tabConfig.dapps).length === Object.values(dappsInfo).length
          ? ''
          : 'All';
    } else {
      _updateDapp = !dappsInfo[market] ? market : "";
    }
    setUpdateData(_updateDapp);
  };

  const onTabChange = (tab: string) => {
    setCurrTab(tab);
  };

  const loadMarketsInfo = (params: any) => {
    const { markets, dapp } = params;
    const dapps: any = dappsInfo;
    dapps[dapp.dappName] = dapp;
    setDappsInfo(dapps);
    setMarketsInfo({ ...marketsInfo, ...markets });
    setTimestamp(Date.now());
    setUpdateData(currMarket === 'All' && !params.allLoaded ? 'All' : '');
  };

  useEffect(() => {
    const _tabConfig = lendingConfig[chain?.chainId];
    setTabConfig(_tabConfig);
    onMarketChange(_tabConfig?.defaultDapp ?? 'All');
  }, [chain]);

  return (
    <div>
      <StyledFlex justifyContent="space-between">
        <Tabs
          tabs={tabsList}
          onTabChange={onTabChange}
          currTab={currTab}
        />
        <MarketItems
          currMarket={currMarket}
          list={Object.values(tabConfig.dapps) ?? []}
          onMarketChange={onMarketChange}
        />
      </StyledFlex>
      <StyledContent>
        <Theme>
          {updateData && (
            <>
              {(updateData === 'All' || !dappsInfo[currMarket]) && (
                <ComponentWrapperPage src="bluebiu.near/widget/0vix.LendingSpinner" />
              )}
              <ComponentWrapperPage
                src="bluebiu.near/widget/Avalanche.Lending.Data"
                componentProps={{
                  update: updateData,
                  chainId,
                  multicall,
                  ...tabConfig,
                  prices,
                  account,
                  onLoad: (data: Record<string, any>) => {
                    loadMarketsInfo(data);
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
                  dapps: dappsInfo,
                  markets: marketsInfo,
                  timestamp: timestamp,
                  account,
                  onButtonClick: (address: string, actionText: any) => {
                    const market = marketsInfo[address];
                    const dapp = dappsInfo[market.dapp];
                    const dappConfig = tabConfig.dapps[market.dapp];
                    setTableButtonClickData({
                      ...dapp,
                      ...market,
                      config: { ...dappConfig, wethAddress: tabConfig?.wethAddress },
                      actionText,
                    })
                    ;
                    setShowDialog(true);
                  },
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
                  dapps: dappsInfo,
                  markets: marketsInfo,
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
      </StyledContent>
    </div>
  );
};

export default memo(Lending);

interface Props {
  chain: any;
}
