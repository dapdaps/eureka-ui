import { memo, useEffect, useState } from 'react';

import lendingConfig from '@/config/lending/networks';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import { usePriceStore } from '@/stores/price';
import { StyledFlex } from '@/styled/styles';
import MarketItems from '@/views/AllInOne/components/MarketItems/index';
import Tabs from '@/views/AllInOne/components/Tabs/index';

import { Theme } from '@/views/AllInOne/styles';
import SearchInput from "@/views/AllInOne/components/SearchInput";
import { StyledContent } from "@/views/AllInOne/components/Liquidity/styles";

const tabsList = [
  {
    key: 'Market',
    label: 'All pools',
    value: 'Market',
  },
  {
    key: 'Yours',
    label: 'Your pools',
    value: 'Yours',
  },
];

const Liquidity = (props: Props) => {
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
        <StyledFlex gap="16px" alignItems="center">
          <Tabs
            tabs={tabsList}
            onTabChange={onTabChange}
            currTab={currTab} />
          <SearchInput placeholder="search by token" width="276px" />
        </StyledFlex>
        <MarketItems
          currMarket={currMarket}
          list={Object.values(tabConfig.dapps) ?? []}
          onMarketChange={onMarketChange} />
      </StyledFlex>
      <StyledContent>
        <Theme>
          Liquidity
        </Theme>
      </StyledContent>
    </div>
  );
};

export default memo(Liquidity);

interface Props {
  chain: any;
}

