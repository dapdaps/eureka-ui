import { useEffect } from 'react';

import { StyledContainer } from '@/modules/lending/Content/styles';
import { useMultiState } from '@/modules/lending/hooks';
import type { DexProps, Tab } from '@/modules/lending/models';
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
    nativeCurrency,
    tab,
    from,
  } = props;

  const [state, updateState] = useMultiState<State>({
    loading: false,
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
      dappName: dexConfig.name,
    };

    updateState({
      tableButtonClickData: {
        ...dapp,
        ...market,
        config: { ...dexConfig, wethAddress },
        actionText,
      },
      showDialog: true,
    });
  };

  return (
    <StyledContainer>
      {tab === TabKey.Market && (
        <Widget
          src="bluebiu.near/widget/Lending.Markets"
          props={{
            markets: state.markets,
            totalCollateralUsd: state.totalCollateralUsd,
            userTotalBorrowUsd: state.userTotalBorrowUsd,
            addAction,
            toast,
            chainId,
            nativeCurrency,
            dexConfig,
            account,
            prices,
            from,
            onSuccess: () => {
              State.update({
                loading: true,
              });
            },
          }}
        />
      )}
      {tab === TabKey.Yours && (
        <Widget
          src="bluebiu.near/widget/Avalanche.Lending.Yours"
          props={{
            currentDapp: dexConfig.name,
            markets: state.markets,
            timestamp: state.timestamp,
            dapps: {
              [dexConfig.name]: {
                userTotalSupplyUsd: state.userTotalSupplyUsd,
                userTotalBorrowUsd: state.userTotalBorrowUsd,
                totalCollateralUsd: state.totalCollateralUsd,
                rewards: state.rewards,
                dappIcon: dexConfig.icon,
                dappName: dexConfig.name,
              },
            },
            dappsConfig: {
              [dexConfig.name]: dexConfig,
            },
            toast,
            account,
            onButtonClick: handleTableButtonClick,
            onSuccess: () => {
              State.update({
                loading: true,
              });
            },
          }}
        />
      )}
      {state.loading && <Widget src="bluebiu.near/widget/Lending.Spinner" />}
      <Widget
        src={dexConfig.data}
        props={{
          update: state.loading,
          account,
          wethAddress,
          multicallAddress,
          multicall,
          prices,
          chainId,
          ...dexConfig,
          onLoad: (data) => {
            console.log("DATA_onLoad:", data);
            State.update({
              loading: false,
              timestamp: Date.now(),
              ...data,
            });
          },
        }}
      />
      <Widget
        src="bluebiu.near/widget/Avalanche.Lending.Dialog"
        props={{
          display: state.showDialog,
          data: state.tableButtonClickData,
          chainId,
          addAction,
          toast,
          source: "dapp",
          account,
          from,
          onClose: () => {
            State.update({
              showDialog: false,
            });
          },
          onSuccess: () => {
            State.update({
              loading: true,
            });
          },
        }}
      />
    </StyledContainer>
  );
};

export default LendingContent;

export interface Props extends DexProps {
  chainIdNotSupport: boolean;
  tab: Tab;
}

export interface State {
  loading: boolean;
}
