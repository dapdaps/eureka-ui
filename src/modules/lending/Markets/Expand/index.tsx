import Big from 'big.js';
import { useEffect } from 'react';

import { useMultiState } from '@/modules/lending/hooks';
import type { DexProps } from '@/modules/lending/models';

import {
  StyledBorrowLimit,
  StyledBox,
  StyledButtonWrapper,
  StyledContent,
  StyledDetailItem,
  StyledDetailPanel,
  StyledGasBox,
  StyledHeader,
  StyledInfo,
  StyledInfoContent,
  StyledInfoItem,
  StyledInfoTips,
  StyledInfoTitle,
  StyledTab,
  StyledTabs,
  StyledWrapper
} from './styles';
import LendingTotal from '@/modules/lending/Total';
import LendingMarketInput from '@/modules/lending/Markets/Input';

const TABS = ['Supply', 'Borrow'];

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
    data = {}
  } = props;

  const [state, updateState] = useMultiState<any>({
    tab: TABS[0],
    loading: false
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

  const onAmountChange = (amount: string) => {
    if (isNaN(Number(amount))) return;
    if (amount.split('.')[1].length > 18) return;
    const isZero = Big(amount || 0).eq(0);
    if (isZero) {
      updateState({
        amount,
        buttonClickable: false,
        borrowLimit: '',
        isEmpty: Number(amount) === 0 && amount !== '',
        isOverSize: false,
        isBigerThanBalance: false
      });
      return;
    }
    if (dexConfig.name === 'Ionic' && state.tab === 'Borrow') {
      if (Big(amount).lt(data.minBorrowAmount)) {
        updateState({
          amount,
          buttonClickable: false
        });
        return;
      }
    }
    const params: any = { amount };
    const value = Big(Big(amount).mul(data.underlyingPrice).toFixed(20));
    if (state.tab === 'Supply') {
      params.borrowLimit = Big(borrowLimit || 0).plus(
        value.mul(data.loanToValue / 100)
      );
      params.isBigerThanBalance = Big(amount).gt(data.userUnderlyingBalance || 0);
      params.isOverSize = false;
    }
    if (state.tab === 'Borrow') {
      params.borrowLimit = Big(borrowLimit || 0).minus(value || 0);
      params.isBigerThanBalance = false;

      params.isOverSize = value.gt(borrowLimit || 0);

      if (dexConfig.name === 'Ionic') {
        if (Big(data.totalBorrows).gt(Big(data.borrowCaps))) {
          params.isBorrowCapsFull = true;
        }
      }
    }
    params.buttonClickable =
      !params.isOverSize && !params.isBigerThanBalance && !params.isBorrowCapsFull;
    updateState(params);

    state.debouncedGetTrade();
  };

  return (
    <StyledBox className={expand ? 'expand' : ''}>
      <StyledWrapper className={expand ? 'expand' : ''}>
        <StyledHeader>
          <StyledTabs>
            {TABS.map((tab) => (
              <StyledTab
                key={tab}
                className={tab === state.tab ? 'active' : ''}
                onClick={() => {
                  updateState({ tab, amount: '' });
                }}
              >
                {tab}
              </StyledTab>
            ))}
          </StyledTabs>
        </StyledHeader>
        <StyledContent>
          <StyledInfo>
            <StyledInfoContent>
              <StyledInfoTitle>Your info</StyledInfoTitle>
              {/* <StyledInfoItem>
               <div>Your borrow limit</div>
               <div className="white">
               {" "}
               <Widget
               src="bluebiu.near/widget/Avalanche.Lending.Total"
               props={{
               total: borrowLimit,
               digit: 2,
               unit: "$",
               }}
               />
               </div>
               </StyledInfoItem> */}
              <StyledInfoItem>
                <div>Available to Supply</div>
                <div>
                <span className="white">
                  <LendingTotal
                    total={data.userUnderlyingBalance}
                    digit={2}
                    unit=""
                  />
                </span>{' '}
                  {data.underlyingToken?.symbol}
                </div>
              </StyledInfoItem>
              <StyledInfoItem>
                <div>Available to Borrow</div>
                <div>
                <span className="white">
                  <LendingTotal
                    total={Big(borrowLimit)
                      .div(data.underlyingPrice || 1)
                      .toString()}
                    digit={2}
                    unit=""
                  />
                </span>{' '}
                  {data.underlyingToken?.symbol}
                </div>
              </StyledInfoItem>

              {dexConfig.name === 'Ionic' && (
                <StyledInfoItem>
                  <div>Min Borrow</div>
                  <div>
                    <span className="white">{data.minBorrowAmount}</span>{' '}
                    {data.underlyingToken?.symbol}
                  </div>
                </StyledInfoItem>
              )}
              <StyledInfoTips>
                {from === 'layer' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <circle cx="7.5" cy="7.5" r="7" stroke="#6F6F6F" />
                    <path
                      d="M7.5 7.5L7.5 11.25"
                      stroke="#6F6F6F"
                      stroke-width="1.4"
                      stroke-linecap="round"
                    />
                    <circle cx="7.5" cy="4.6875" r="0.9375" fill="#6F6F6F" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <circle cx="6" cy="6" r="5.5" stroke="#EBF479" />
                    <path
                      d="M6 6L6 9"
                      stroke="#EBF479"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <circle cx="6" cy="3.75" r="0.75" fill="#EBF479" />
                  </svg>
                )}

                <div>
                  To borrow you need to supply any asset to be used as collateral.
                </div>
              </StyledInfoTips>
            </StyledInfoContent>
          </StyledInfo>
          <div>
            <LendingMarketInput
              icon={data.underlyingToken?.icon}
              symbol={data.underlyingToken?.symbol}
              decimals={data.underlyingToken?.decimals}
              balance={state.tab === 'Supply'
                ? data.userUnderlyingBalance
                : Big(borrowLimit || 0)
                  .div(data.underlyingPrice || 1)
                  .toString()}
              price={data.underlyingPrice}
              amount={state.amount}
              onChange={onAmountChange}
            />
            <StyledDetailPanel>
              {state.tab === 'Supply' && dexConfig.name !== 'Ionic' && (
                <StyledDetailItem>
                  <div>Collateral factor</div>
                  <div className="white">
                    {data.collateralFactor ? 'Enable' : 'Disable'}
                  </div>
                </StyledDetailItem>
              )}
              <StyledDetailItem>
                <div>Borrow limit</div>
                <StyledBorrowLimit>
                  <div>
                    {' '}
                    <LendingTotal
                      total={borrowLimit}
                      digit={2}
                      unit="$"
                    />
                  </div>
                  {!!state.borrowLimit && (
                    <>
                      {' '}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="10"
                        viewBox="0 0 8 10"
                        fill="none"
                      >
                        <path
                          d="M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833334 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z"
                          fill="#979ABE"
                        />
                      </svg>
                      <div className="white">
                        {' '}
                        <LendingTotal
                          total={state.borrowLimit}
                          digit={2}
                          unit="$"
                        />
                      </div>
                    </>
                  )}
                </StyledBorrowLimit>
              </StyledDetailItem>
            </StyledDetailPanel>
            <StyledButtonWrapper>
              <StyledGasBox>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
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
                <Widget
                  src="bluebiu.near/widget/Avalanche.Lending.DialogButton"
                  props={{
                    disabled: !state.buttonClickable,
                    actionText: state.tab === 'Supply' ? 'Deposit' : 'Borrow',
                    amount: state.amount,
                    data: {
                      ...data,
                      config: dexConfig
                    },
                    addAction,
                    toast,
                    chainId,
                    unsignedTx: state.unsignedTx,
                    isError: state.isError,
                    loading: state.loading,
                    gas: state.gas,
                    account,
                    onApprovedSuccess: () => {
                      if (!state.gas) state.getTrade();
                    },
                    onSuccess: () => {
                      onSuccess?.();
                    }
                  }}
                />
              </div>
            </StyledButtonWrapper>
          </div>
        </StyledContent>
        {dexConfig?.handler && (
          <Widget
            src={dexConfig.handler}
            props={{
              update: state.loading,
              data: {
                actionText: state.tab === 'Supply' ? 'Deposit' : 'Borrow',
                ...data,
                config: dexConfig
              },
              amount: state.amount,
              account,
              onLoad: (_data) => {
                console.log('handler_onLoad:', _data);
                State.update({
                  ..._data,
                  loading: false
                });
              }
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
}
