import Big from 'big.js';
import { isArray } from 'lodash';
import { useEffect, useMemo } from 'react';

import useAccount from '@/hooks/useAccount';
import LendingDialogButton from '@/modules/lending/components/Button';
import LendingMarketExpandBorrowInput from '@/modules/lending/components/Markets/Expand/BorrowInput';
import LendingMarketEarnInput from '@/modules/lending/components/Markets/Expand/EarnInput';
import LendingMarketExpandInput from '@/modules/lending/components/Markets/Expand/Input';
import LendingMarketInfo from '@/modules/lending/components/Markets/Info';
import LendingMarketBorrowInfo from '@/modules/lending/components/Markets/Info/Borrow';
import LendingMarketEarnInfo from '@/modules/lending/components/Markets/Info/Earn';
import { useDynamicLoader, useMultiState } from '@/modules/lending/hooks';
import type { DexProps } from '@/modules/lending/models';
import { MarketsType } from '@/modules/lending/models';
import { DexType } from '@/modules/lending/models';

import {
  StyledBox,
  StyledButtonWrapper,
  StyledContent,
  StyledGasBox,
  StyledHeader,
  StyledTab,
  StyledTabs,
  StyledWrapper
} from './styles';

const LendingMarketExpand = (props: Props) => {
  const {
    expand,
    borrowLimit,
    addAction,
    toast,
    chainId,
    nativeCurrency,
    onSuccess,
    dexConfig,
    account,
    prices,
    from,
    data = {},
    curPool,
    marketsType
  } = props;

  console.log('=marketsType', marketsType);
  const Tabs = useMemo(() => {
    if (marketsType === MarketsType.Borrow) {
      return ['Add Collateral', 'Remove Collateral', 'Borrow', 'Repay'];
    }
    if (marketsType === MarketsType.Earn) {
      return ['Supply', 'Withdraw'];
    }
    if (data.localConfig?.currentMarket?.type === 'OnlySupply') {
      return ['Supply'];
    }
    if (data.localConfig?.currentMarket?.type === 'OnlyBorrow') {
      return ['Borrow'];
    }
    return ['Supply', 'Borrow'];
  }, [dexConfig.type]);

  const { provider } = useAccount();
  const [Handler] = useDynamicLoader({ path: '/lending/handlers', name: dexConfig.loaderName });

  const [state, updateState] = useMultiState<any>({
    tab: Tabs[0],
    loading: false,
    balanceUsd: undefined,
    currentBorrowToken: isArray(data.borrowToken) ? data.borrowToken?.[0] || {} : data.borrowToken
  });

  useEffect(() => {
    const debounce = (fn: any, wait: number) => {
      let timer: any;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, wait);
      };
    };

    const getTrade = () => {
      updateState({
        loading: true
      });
    };

    const debouncedGetTrade = debounce(getTrade, 500);

    updateState({
      debouncedGetTrade,
      getTrade
    });
  }, []);

  const _borrowLimit = useMemo(() => {
    if (state.balanceUsd) {
      return state.balanceUsd;
    }
    return borrowLimit;
  }, [borrowLimit, state.balanceUsd]);

  useEffect(() => {
    if (!expand) {
      updateState({
        tab: Tabs[0],
        balanceUsd: undefined,
        amount: '',
        buttonClickable: false,
        borrowLimit: '',
        isOverSize: false,
        isBigerThanBalance: false
      });
    }
  }, [expand]);

  const isDolomiteEarn = data.dapp === 'Dolomite' && marketsType === MarketsType.Earn;

  return (
    <StyledBox
      variants={{
        expand: {
          opacity: 1,
          y: 0,
          height: 292,
          borderWidth: 1
        },
        collapse: {
          opacity: 0,
          y: -20,
          height: 0,
          borderWidth: 0,
          transition: {
            delay: 0.1
          }
        }
      }}
      animate={expand ? 'expand' : 'collapse'}
      initial="collapse"
    >
      <StyledWrapper
        variants={{
          expand: {
            opacity: 1,
            display: 'block'
          },
          collapse: {
            opacity: 0,
            display: 'none',
            transition: {
              display: {
                delay: 0.1
              }
            }
          }
        }}
        animate={expand ? 'expand' : 'collapse'}
        initial="collapse"
      >
        <StyledHeader
          style={{
            paddingLeft: Tabs.length > 2 ? 0 : 520
          }}
        >
          <StyledTabs
            style={{
              justifyContent: Tabs.length > 2 ? 'center' : 'left'
            }}
          >
            {Tabs.map((tab) => (
              <StyledTab
                key={tab}
                className={tab === state.tab ? 'active' : ''}
                onClick={async () => {
                  if (typeof data.localConfig?.onTabChangeBefore === 'function') {
                    const beforeRes = await data.localConfig?.onTabChangeBefore(tab, data, { account });
                    updateState(beforeRes);
                  }
                  updateState({ tab, amount: '' });
                }}
              >
                {tab}
              </StyledTab>
            ))}
          </StyledTabs>
        </StyledHeader>
        <StyledContent>
          {marketsType === MarketsType.Borrow && <LendingMarketBorrowInfo {...data} prices={prices} />}
          {marketsType === MarketsType.Earn && <LendingMarketEarnInfo {...data} prices={prices} />}
          {marketsType === MarketsType.Market && (
            <LendingMarketInfo {...data} borrowLimit={_borrowLimit} from={from} dexConfig={dexConfig} />
          )}
          <div>
            {[DexType.BorrowAndEarn, DexType.Dolomite].includes(dexConfig.type) && (
              <>
                {isDolomiteEarn && (
                  <LendingMarketEarnInput data={data} prices={prices} state={state} updateState={updateState} />
                )}
                {!isDolomiteEarn && (
                  <LendingMarketExpandBorrowInput data={data} prices={prices} state={state} updateState={updateState} />
                )}
              </>
            )}
            {![DexType.BorrowAndEarn, DexType.Dolomite].includes(dexConfig.type) && (
              <LendingMarketExpandInput
                {...data}
                borrowLimit={_borrowLimit}
                dexConfig={dexConfig}
                state={state}
                updateState={updateState}
              />
            )}
            <StyledButtonWrapper>
              <StyledGasBox>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M11.3496 14.1934V8.67643H11.7636C11.9886 8.67643 12.1776 8.84743 12.1776 9.05443V12.5644C12.1776 13.4644 12.9696 14.1934 13.9506 14.1934C14.9316 14.1934 15.7236 13.4644 15.7236 12.5644V5.81443C15.7236 5.46343 15.5616 5.13943 15.3096 4.91443L13.8606 3.59143C13.5996 3.34843 13.1766 3.34843 12.9156 3.59143C12.6546 3.83443 12.6546 4.22143 12.9156 4.46443L13.8516 5.32843L13.1586 5.99443C12.9336 6.21043 12.9336 6.55243 13.1586 6.76843C13.2666 6.87643 13.4196 6.93043 13.5726 6.93043H14.3556V12.5734C14.3556 12.7804 14.1756 12.9514 13.9416 12.9514C13.7166 12.9514 13.5276 12.7804 13.5276 12.5734V9.06343C13.5276 8.16343 12.7356 7.43443 11.7546 7.43443H11.3496V4.42843C11.3496 3.87043 10.8636 3.42943 10.2516 3.42943H4.51856C3.91556 3.42943 3.42056 3.87943 3.42056 4.42843V14.1934H3.28556C2.90756 14.1934 2.60156 14.4724 2.60156 14.8234C2.60156 15.1744 2.90756 15.4534 3.28556 15.4534H11.4846C11.8626 15.4534 12.1686 15.1744 12.1686 14.8234C12.1686 14.4724 11.8626 14.1934 11.4846 14.1934H11.3496ZM5.39156 4.67143H9.37856C9.71156 4.67143 9.98156 4.91443 9.98156 5.22043V7.87543C9.98156 8.18143 9.71156 8.42443 9.37856 8.42443H5.39156C5.05856 8.42443 4.78856 8.18143 4.78856 7.87543V5.22043C4.78856 4.91443 5.05856 4.67143 5.39156 4.67143Z"
                    fill="#979ABE"
                  />
                </svg>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  ~
                  {props.prices[nativeCurrency?.symbol]
                    ? `$${Big(state.gas || 0)
                        .div(Big(10).pow(nativeCurrency.decimals || 18))
                        .toFixed(2)}`
                    : '-'}
                </div>
              </StyledGasBox>
              <div style={{ flexGrow: 1 }}>
                <LendingDialogButton
                  disabled={!state.buttonClickable}
                  actionText={state.tab === 'Supply' ? 'Deposit' : state.tab}
                  amount={state.amount}
                  data={{
                    ...data,
                    config: dexConfig
                  }}
                  addAction={addAction}
                  toast={toast}
                  chainId={chainId}
                  unsignedTx={state.unsignedTx}
                  isError={state.isError}
                  loading={state.loading}
                  gas={state.gas}
                  account={account}
                  marketsType={marketsType}
                  approveMax={isDolomiteEarn ? dexConfig.approveMax : undefined}
                  spender={isDolomiteEarn ? dexConfig.spenderAddress : undefined}
                  onApprovedSuccess={() => {
                    state.getTrade?.();
                  }}
                  onSuccess={async () => {
                    onSuccess?.();
                    if (state.tab === 'Borrow' && typeof data.localConfig?.onTabChangeBefore === 'function') {
                      const beforeRes = await data.localConfig?.onTabChangeBefore('Borrow', data, { account });
                      updateState(beforeRes);
                    }
                    updateState({ amount: '' });
                  }}
                />
              </div>
            </StyledButtonWrapper>
          </div>
        </StyledContent>
        {Handler && (
          <Handler
            provider={provider}
            account={account}
            update={state.loading}
            chainId={chainId}
            data={{
              actionText: state.tab === 'Supply' ? 'Deposit' : state.tab,
              ...data,
              config: dexConfig,
              currentBorrowToken: state.currentBorrowToken
            }}
            amount={state.amount}
            curPool={curPool}
            onLoad={(_data: any) => {
              console.log('_data:', _data);

              console.log('%chandler DATA onLoad: %o', 'background: #6439FF; color:#fff;', _data);
              updateState({
                ..._data,
                loading: false
              });
            }}
          />
        )}
      </StyledWrapper>
    </StyledBox>
  );
};

export default LendingMarketExpand;

export interface Props extends DexProps {
  data: any;
  expand: boolean;
  borrowLimit: string;
  marketsType?: MarketsType;
}
