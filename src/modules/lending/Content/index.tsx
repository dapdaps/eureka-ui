import { useEffect } from 'react';

import Loading from '@/components/Icons/Loading';
import { StyledContainer } from '@/modules/lending/Content/styles';
import LayerBankData from '@/modules/lending/datas/LayerBank';
import LendingDialog from '@/modules/lending/Dialog';
import { useMultiState } from '@/modules/lending/hooks';
import LendingMarkets from '@/modules/lending/Markets';
import type { DexProps } from '@/modules/lending/models';
import { TabKey } from '@/modules/lending/models';
import LendingMarketYours from '@/modules/lending/Yours';

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
    nativeCurrency,
    tab,
    from
  } = props;

  const [state, updateState] = useMultiState<any>({
    loading: false
  });

  useEffect(() => {
    updateState({ loading: !chainIdNotSupport });
  }, [chainIdNotSupport]);

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
          totalCollateralUsd={state.totalCollateralUsd}
          userTotalBorrowUsd={state.userTotalBorrowUsd}
          {...props}
          onSuccess={() => {
            updateState({
              loading: true
            });
          }}
        />
      )}
      {tab === TabKey.Yours && (
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
          chainId={chainId}
          onButtonClick={handleTableButtonClick}
          onSuccess={() => {
            updateState({
              loading: true
            });
          }}
        />
      )}
      {state.loading && (
        <Loading size={16} />
      )}
      <LayerBankData
        update={state.loading}
        account={account}
        wethAddress={wethAddress}
        multicallAddress={multicallAddress}
        multicall={multicall}
        prices={prices}
        chainId={chainId}
        {...dexConfig}
        onLoad={(data: any) => {
          console.log('DATA_onLoad:', data);
          updateState({
            loading: false,
            timestamp: Date.now(),
            ...data
          });
        }}
      />
      <LendingDialog
        display={state.showDialog}
        data={state.tableButtonClickData}
        chainId={chainId}
        addAction={addAction}
        toast={toast}
        source="dapp"
        account={account}
        from={from}
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
