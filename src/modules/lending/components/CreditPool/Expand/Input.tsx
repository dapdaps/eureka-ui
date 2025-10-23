import Big from 'big.js';
import { useMemo } from 'react';

import LendingMarketInput from '@/modules/lending/components/Markets/Input';
import LendingTotal from '@/modules/lending/components/Total';

import { StyledBorrowLimit, StyledDetailItem, StyledDetailPanel } from './styles';

const LendingMarketExpandInput = (props: Props) => {
  const {
    underlyingToken,
    userUnderlyingBalance,
    underlyingPrice,
    collateralFactor,
    minBorrowAmount,
    loanToValue,
    totalBorrows,
    borrowCaps,
    state,
    updateState,
    borrowLimit,
    dexConfig,
    tokenTal
  } = props;

  const onAmountChange = (_amount: string) => {
    if (isNaN(Number(_amount))) return;
    if (_amount.split('.')[1]?.length > 18) return;
    const isZero = Big(_amount || 0).eq(0);
    if (isZero) {
      updateState({
        amount: _amount,
        buttonClickable: false,
        borrowLimit: '',
        isEmpty: Number(_amount) === 0 && _amount !== '',
        isOverSize: false,
        isBigerThanBalance: false
      });
      return;
    }
    if (dexConfig.name === 'Ionic' && state.tab === 'Borrow') {
      if (Big(_amount).lt(minBorrowAmount)) {
        updateState({
          amount: _amount,
          buttonClickable: false
        });
        return;
      }
    }
    const params: any = { amount: _amount };
    // const value = Big(Big(_amount).mul(underlyingPrice).toFixed(20, 0));
    // if (state.tab === 'Supply') {
    //   params.borrowLimit = Big(borrowLimit || 0).plus(value.mul(loanToValue / 100));
    //   params.isBigerThanBalance = Big(_amount).gt(userUnderlyingBalance || 0);
    //   params.isOverSize = false;
    // }
    // if (state.tab === 'Borrow') {
    //   params.borrowLimit = Big(borrowLimit || 0).minus(value || 0);
    //   params.isBigerThanBalance = false;

    //   params.isOverSize = value.gt(borrowLimit || 0);

    //   if (dexConfig.name === 'Ionic') {
    //     if (Big(totalBorrows).gt(Big(borrowCaps))) {
    //       params.isBorrowCapsFull = true;
    //     }
    //   }
    // }
    params.buttonClickable = !params.isOverSize && !params.isBigerThanBalance && !params.isBorrowCapsFull;
    updateState(params);

    state.debouncedGetTrade();
  };

  const symbol = useMemo(() => {
    if (state.tab === 'Withdraw') {
      return 'wNTLP-' + underlyingToken?.symbol;
    }
    return underlyingToken?.symbol;
  }, [state.tab]);

  const targetSymbol = useMemo(() => {
    if (state.tab === 'Supply') {
      return 'wNTLP-' + underlyingToken?.symbol;
    }
    return underlyingToken?.symbol;
  }, [state.tab]);

  return (
    <>
      <LendingMarketInput
        icon={underlyingToken?.icon}
        symbol={symbol}
        decimals={underlyingToken?.decimals}
        balance={userUnderlyingBalance}
        price={underlyingPrice}
        amount={state.amount}
        onChange={onAmountChange}
      />

      {(state.tab === 'Supply' || state.tab === 'Withdraw') && (
        <StyledDetailPanel>
          {state.tab === 'Supply' && (
            <div>
              <StyledDetailItem>
                <div>You will receive</div>
                <div className="white">{state.wnlp ? state.wnlp + ' ' + targetSymbol : '-'}</div>
              </StyledDetailItem>
              <StyledDetailItem>
                <div>Exchange Rate</div>
                <div className="white">
                  1 {targetSymbol} = {state.nlpPerToken ? state.nlpPerToken : '-'} {symbol}
                </div>
              </StyledDetailItem>
            </div>
          )}

          {state.tab === 'Withdraw' && (
            <div>
              <StyledDetailItem>
                <div>You will receive</div>
                <div className="white">{state.nlp ? state.nlp + ' ' + targetSymbol : '-'}</div>
              </StyledDetailItem>
              <StyledDetailItem>
                <div>Exchange Rate</div>
                <div className="white">
                  1 {targetSymbol} = {state.tokensPerNlp ? state.tokensPerNlp : '-'} {symbol}
                </div>
              </StyledDetailItem>
            </div>
          )}
        </StyledDetailPanel>
      )}
    </>
  );
};

export default LendingMarketExpandInput;

interface Props {
  underlyingToken: any;
  userUnderlyingBalance: string;
  underlyingPrice: string;
  collateralFactor: any;
  borrowLimit: string;
  dexConfig: any;
  state: any;
  minBorrowAmount: string;
  loanToValue: number;
  totalBorrows: string;
  borrowCaps: string;
  tokenTal: any;
  updateState(state: any): void;
}
