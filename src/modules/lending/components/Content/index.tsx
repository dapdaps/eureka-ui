import { useEffect, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';

import useAccount from '@/hooks/useAccount';
import Spinner from '@/modules/components/Spinner';
import { StyledContainer } from '@/modules/lending/components/Content/styles';
import LendingDialog from '@/modules/lending/components/Dialog';
import LendingInitCapitalMarkets from '@/modules/lending/components/InitCapital/Markets';
import LendingInitCapitalYours from '@/modules/lending/components/InitCapital/Yours';
import LendingMarkets from '@/modules/lending/components/Markets';
import LendingDolomite from '@/modules/lending/components/Markets/Dolomite';
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
  }, [chainIdNotSupport, tab]);

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

  const marketTabMarketsType = useMemo(() => {
    if (dexConfig.type === DexType.BorrowAndEarn) {
      return MarketsType.Borrow;
    }
    return MarketsType.Market;
  }, [dexConfig.type]);

  return (
    <StyledContainer>
      {tab === TabKey.Market && (
        <>
          {dexConfig.type === DexType.Dolomite ? (
            <LendingDolomite
              markets={state.markets}
              positionList={state.positionList}
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
          ) : dexConfig.type === DexType.InitCapital ? (
            <LendingInitCapitalMarkets
              underlyingPrices={state?.prices}
              usdcPrice={state?.prices?.['0x00A55649E597d463fD212fBE48a3B40f0E227d06']}
              markets={state.markets}
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
            <LendingMarkets
              markets={state.markets}
              marketsType={marketTabMarketsType}
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
        </>
      )}
      {tab === TabKey.Yours && (
        <>
          {[DexType.BorrowAndEarn, DexType.Dolomite].includes(dexConfig.type) ? (
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
          ) : dexConfig.type === DexType.InitCapital ? (
            <LendingInitCapitalYours
              underlyingPrices={state?.prices}
              usdcPrice={state?.prices?.['0x00A55649E597d463fD212fBE48a3B40f0E227d06']}
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
          )}
        </>
      )}
      {state.loading && !props.isHideSpinner && <Spinner />}
      {state.loading && props.isHideSpinner && (
        <div className="flex flex-col gap-[10px] items-stretch">
          <Skeleton width={750} height={84} borderRadius={16} />
          <Skeleton width={750} height={84} borderRadius={16} />
          <Skeleton width={750} height={84} borderRadius={16} />
        </div>
      )}
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
            if (data.markets) {
              try {
                const _data = Object.values(data.markets);
                _data.forEach((d: any) => {
                  const curr = Object.values(dexConfig.markets).find((m: any) => m.address === d.address) || {};
                  d.localConfig = {
                    ...dexConfig,
                    prices: data?.prices,
                    currentMarket: curr
                  };
                });
              } catch (err: any) {
                console.log(err);
              }
            }
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
  isHideSpinner?: boolean;
}
