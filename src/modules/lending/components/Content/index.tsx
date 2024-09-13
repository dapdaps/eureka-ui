import { useEffect } from 'react';

import useAccount from '@/hooks/useAccount';
import Loading from '@/modules/components/Loading';
import { StyledContainer } from '@/modules/lending/components/Content/styles';
import LendingDialog from '@/modules/lending/components/Dialog';
import LendingMarkets from '@/modules/lending/components/Markets';
import LendingMarketYours from '@/modules/lending/components/Yours';
import { useDynamicLoader, useMultiState } from '@/modules/lending/hooks';
import type { DexProps } from '@/modules/lending/models';
import { DexType, MarketsType } from '@/modules/lending/models';
import { TabKey } from '@/modules/lending/models';

const LendingContent = (props: Props) => {
  const {
    dexConfig,
    wethAddress,
    multicallAddress,
    chainIdNotSupport,
    multicall,
    prices,
    account,
    addAction,
    toast,
    chainId,
    curChain,
    tab,
    from,
    curPool
  } = props;

  const { provider } = useAccount();
  const [Data] = useDynamicLoader({ path: '/lending/datas', name: dexConfig.loaderName });

  const [state, updateState] = useMultiState<any>({
    loading: false
  });

  useEffect(() => {
    updateState({ loading: !chainIdNotSupport });
  }, [chainIdNotSupport]);

  console.log(state.markets, 'state.markets');

  const handleTableButtonClick = (address: string, actionText: string) => {
    const market = state.markets[address];
    const dapp = {
      userTotalSupplyUsd: state.userTotalSupplyUsd,
      userTotalBorrowUsd: state.userTotalBorrowUsd,
      totalCollateralUsd: state.totalCollateralUsd,
      rewards: state.rewards,
      dappIcon: dexConfig.icon,
      dappName: dexConfig.name
    };

    updateState({
      tableButtonClickData: {
        ...dapp,
        ...market,
        config: { ...dexConfig, wethAddress },
        actionText
      },
      showDialog: true
    });
  };

  return (
    <StyledContainer>
      {tab === TabKey.Market && (
        <LendingMarkets
          markets={state.markets}
          marketsType={dexConfig.type === DexType.BorrowAndEarn ? MarketsType.Borrow : MarketsType.Market}
          totalCollateralUsd={state.totalCollateralUsd}
          userTotalCollateralUsd={state.userTotalCollateralUsd}
          userTotalBorrowUsd={state.userTotalBorrowUsd}
          userTotalSupplyUsd={state.userTotalSupplyUsd}
          {...props}
          onSuccess={() => {
            updateState({
              loading: true
            });
          }}
        />
      )}
      {tab === TabKey.Yours &&
        (dexConfig.type === DexType.BorrowAndEarn ? (
          <LendingMarkets
            markets={state.markets}
            marketsType={MarketsType.Earn}
            totalCollateralUsd={state.totalCollateralUsd}
            userTotalCollateralUsd={state.userTotalCollateralUsd}
            userTotalBorrowUsd={state.userTotalBorrowUsd}
            userTotalSupplyUsd={state.userTotalSupplyUsd}
            {...props}
            onSuccess={() => {
              updateState({
                loading: true
              });
            }}
          />
        ) : (
          <LendingMarketYours
            currentDapp={dexConfig.name}
            markets={state.markets}
            timestamp={state.timestamp}
            dapps={{
              [dexConfig.name]: {
                userTotalSupplyUsd: state.userTotalSupplyUsd,
                userTotalBorrowUsd: state.userTotalBorrowUsd,
                totalCollateralUsd: state.totalCollateralUsd,
                rewards: state.rewards,
                dappIcon: dexConfig.icon,
                dappName: dexConfig.name
              }
            }}
            dappsConfig={{
              [dexConfig.name]: dexConfig
            }}
            toast={toast}
            account={account}
            curChain={curChain}
            chainId={chainId}
            dexConfig={dexConfig}
            onButtonClick={handleTableButtonClick}
            onSuccess={() => {
              updateState({
                loading: true
              });
            }}
          />
        ))}
      {state.loading && <Loading size={16} />}
      {Data && (
        <Data
          provider={provider}
          update={state.loading}
          account={account}
          wethAddress={wethAddress}
          multicallAddress={multicallAddress}
          multicall={multicall}
          prices={prices}
          chainId={chainId}
          curPool={curPool}
          dexConfig={dexConfig}
          isChainSupported={!chainIdNotSupport}
          {...dexConfig}
          onLoad={(data: any) => {
            console.log('%cLendingContent DATA onLoad: %o', 'background: #FF885B; color:#fff;', data);
            updateState({
              loading: false,
              timestamp: Date.now(),
              ...data
            });
          }}
        />
      )}
      <LendingDialog
        display={state.showDialog}
        data={state.tableButtonClickData}
        chainId={chainId}
        dexConfig={dexConfig}
        addAction={addAction}
        toast={toast}
        source="dapp"
        account={account}
        from={from}
        curPool={curPool}
        onClose={() => {
          updateState({
            showDialog: false
          });
        }}
        onSuccess={() => {
          updateState({
            loading: true
          });
        }}
      />
    </StyledContainer>
  );
};

export default LendingContent;

export interface Props extends DexProps {
  chainIdNotSupport: boolean;
  tab: TabKey;
}
