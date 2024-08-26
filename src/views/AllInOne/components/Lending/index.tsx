import { useSetChain } from '@web3-onboard/react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import useTokensAndChains from '@/components/Bridge/hooks/useTokensAndChains';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { dapps } from '@/config/dapps';
import lendingConfig from '@/config/lending/networks';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useConnectWallet from '@/hooks/useConnectWallet';
import useToast from '@/hooks/useToast';
import { usePriceStore } from '@/stores/price';
import { StyledFlex } from '@/styled/styles';
import { multicall } from '@/utils/multicall';
import {
  StyledAccountContainer,
  StyledAccountTip,
  StyledConnectButton,
  StyledContent,
} from '@/views/AllInOne/components/Lending/styles';
import MarketItems from '@/views/AllInOne/components/MarketItems/index';
import Tabs from '@/views/AllInOne/components/Tabs/index';

import LendingDialog from './LendingDialog';
import LendingSpinner from './LendingSpinner'
import LendingMarket from './Market'
import LendingYours from './Yours'

const Container = styled.div`
  width: 100%;
  div {
    pre {
      display: none;
    }
    .spinner-grow {
      display: none;
    }
  }
`;


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
  const { chains } = useTokensAndChains();

  const { onConnect } = useConnectWallet();
  const [{ connectedChain, settingChain }, setChain] = useSetChain();
  const currentChain = useMemo(
    () => (connectedChain?.id ? chains[Number(connectedChain?.id)] : null),
    [connectedChain?.id],
  );
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

  const isRightNetwork = currentChain?.chainId === chain.chainId;

  const onMarketChange = (market: string) => {
    setCurrMarket(market);
    setTimestamp(Date.now());
    let _updateDapp = '';
    if (market == 'All') {
      _updateDapp = Object.values(tabConfig.dapps).length === Object.values(dappsInfo).length ? '' : 'All';
    } else {
      _updateDapp = !dappsInfo[market] ? market : '';
    }
    setUpdateData(_updateDapp);
  };

  const onTabChange = (tab: string) => {
    setCurrTab(tab);
    setTimestamp(Date.now());

    if (tab === 'Yours') {
      setUpdateData(currMarket);
    }
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

  const RestTheme = chain.menuConfig.Lending?.Theme ?? styled.div``;
  const [forceUpdate, setForceUpdate] = useState(0);

  const triggerDataRefetch = useCallback(() => {
    setForceUpdate(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (forceUpdate > 0) {
      setUpdateData(currMarket === 'All' ? 'All' : currMarket);
    }
  }, [forceUpdate, currMarket]);

  useEffect(() => {
    triggerDataRefetch();
  }, [account]);

  const getMarketsElement = () => (
    <Container>
      {updateData && (
        <>
          {(updateData === 'All' || !dappsInfo[currMarket]) && (
            <LendingSpinner />
          )}
          <ComponentWrapperPage
            src="bluebiu.near/widget/Avalanche.Lending.Data"
            componentProps={{
              update: updateData,
              chainId,
              dapps: dappsInfo,
              multicall,
              ...tabConfig,
              prices,
              account,
              onLoad: (data: Record<string, any>) => {
                console.log('%c===== Loaded Data =====', 'background:blue;color:white;', data);
                loadMarketsInfo(data);
              },
            }}
          />
        </>
      )}
      <StyledFlex justifyContent="space-between">
        <Tabs tabs={tabsList} onTabChange={onTabChange} currTab={currTab} />
        <MarketItems
          currMarket={currMarket}
          list={Object.values(tabConfig.dapps) ?? []}
          onMarketChange={onMarketChange}
        />
      </StyledFlex>
      <StyledContent>
        <RestTheme>
          {currTab === 'Market' ? (
            <LendingMarket 
              currentDapp={currMarket}
              dapps={dappsInfo}
              markets={marketsInfo}
              timestamp={timestamp}
              onButtonClick={(address: string, action: string) => {
                const market = marketsInfo[address];
                const dapp = dappsInfo[market.dapp];
                const dappConfig = tabConfig.dapps[market.dapp];
                setTableButtonClickData({
                  ...dapp,
                  ...market,
                  config: { ...dappConfig, wethAddress: tabConfig?.wethAddress },
                  actionText: action,
                });
                setShowDialog(true);
              }}
            />
            // <ComponentWrapperPage
            //   src="bluebiu.near/widget/Avalanche.Lending.Market"
            //   componentProps={{
            //     currentDapp: currMarket,
            //     dapps: dappsInfo,
            //     markets: marketsInfo,
            //     timestamp: timestamp,
            //     account,
            //     onButtonClick: (address: string, actionText: any) => {
            //       const market = marketsInfo[address];
            //       const dapp = dappsInfo[market.dapp];
            //       const dappConfig = tabConfig.dapps[market.dapp];
            //       setTableButtonClickData({
            //         ...dapp,
            //         ...market,
            //         config: { ...dappConfig, wethAddress: tabConfig?.wethAddress },
            //         actionText,
            //       });
            //       setShowDialog(true);
            //     },
            //   }}
            // />
          ) : null}
          {currTab === 'Yours' && (
            <LendingYours 
              dapps={dappsInfo}
              toast={toast}
              markets={marketsInfo} 
              currentDapp={currMarket}
              dappsConfig={tabConfig.dapps}
              account={account}
              onButtonClick={(address: string, actionText: string) => {
                const market = marketsInfo[address];
                const dapp = dappsInfo[market.dapp];
                const dappConfig = tabConfig.dapps[market.dapp];
                setTableButtonClickData({
                  ...dapp,
                  ...market,
                  config: { ...dappConfig, wethAddress: tabConfig?.wethAddress },
                  actionText,
                });
                setShowDialog(true);
              }}
              onSuccess={(dapp: string) => {
                setUpdateData(dapp);
                setCurrMarket(dapp);
              }}
            />
          )}
          <LendingDialog 
            display={showDialog} 
            data={tableButtonClickData} 
            chainId={chainId} 
            addAction={addAction} 
            toast={toast} 
            account={account} 
            onClose={() => {
              setShowDialog(false);
            }}
            onSuccess={() => {
              triggerDataRefetch();
              setCurrMarket(tableButtonClickData?.dappName);
            }}
          />
          {/* <ComponentWrapperPage
            src="bluebiu.near/widget/Avalanche.Lending.Dialog"
            componentProps={{
              display: showDialog,
              data: tableButtonClickData,
              chainId,
              addAction,
              toast,
              account,
              onClose: () => {
                setShowDialog(false);
              },
              onSuccess: () => {
                setCurrMarket(tableButtonClickData?.dappName);
              },
            }}
          /> */}
        </RestTheme>
      </StyledContent>
    </Container>
  );
  const getAccount = () => {
    let _textTip = '';
    if (!account && tabConfig?.connectProps?.noAccountTips) {
      _textTip = tabConfig?.connectProps?.noAccountTips;
    }
    if (account && !isRightNetwork) {
      _textTip = tabConfig?.connectProps?.wrongNetworkTips;
    }
    const _buttonText = !account ? 'Connect Wallet' : `Switch to ${chain.title} Chain`;

    const onButtonClick = () => {
      if (!account) {
        onConnect();
        return;
      }
      setChain({ chainId: `0x${chain.chainId.toString(16)}` });
      const _tabConfig = lendingConfig[chain?.chainId];
      setTabConfig(_tabConfig);
      onMarketChange(_tabConfig?.defaultDapp ?? 'All');
    };
    return (
      <StyledAccountContainer>
        <StyledAccountTip>{_textTip}</StyledAccountTip>
        <StyledConnectButton
          onClick={onButtonClick}
          bg={chain.theme?.button?.bg}
          color={chain.theme?.button?.text}
        >
          {_buttonText}
        </StyledConnectButton>
      </StyledAccountContainer>
    );
  };

  return <div>{account && isRightNetwork ? getMarketsElement() : getAccount()}</div>;
};

export default memo(Lending);

interface Props {
  chain: any;
  menu: any;
}
