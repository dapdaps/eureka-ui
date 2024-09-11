import Big from 'big.js';
import { useEffect, useMemo } from 'react';

import LendingMarketInput from '@/modules/lending/components/Markets/Input';

const LendingMarketExpandBorrowInput = (props: Props) => {
  const {
    data,

    state,
    updateState,

    prices,
  } = props;

  const {
    underlyingToken,
    borrowToken,
    userUnderlyingBalance,
    userBorrowBalance,
    underlyingPrice,
    borrowTokenPrice,
    yourBorrow,
    yourLends,
    yourCollateral,
    maxLTV,
    exchangeRate,
  } = data;

  const onAmountChange = (amount: string) => {
    if (isNaN(Number(amount))) return;
    const isZero = Big(amount || 0).eq(0);
    if (isZero) {
      updateState({
        amount,
        buttonClickable: false,
      });
      return;
    }
    const params: any = { amount };
    params.isBigerThanBalance = Big(amount || 0).gt(
      balance || 0,
    );
    params.buttonClickable = !params.isBigerThanBalance;

    updateState(params);
    state.debouncedGetTrade();
  };

  const bigMin = (_a: string, _b: string) => {
    const a = Big(_a || 0);
    const b = Big(_b || 0);
    return a.gt(b) ? b : a;
  };

  const getPrice = (symbol: string) => {
    if (symbol === 'weETH.mode') {
      return prices['weETH'];
    }
    return prices[symbol] || 1;
  };

  const calcMaxWithdraw = (collateralAmount: string, borrowAmount: string, maxLTV: string, exchangeRate: string) => {
    if (!Big(collateralAmount).gt(0)) return 0;
    const EXCHANGE_PRECISION = 1000000000000000000;
    const LTV_PRECISION = 100000;
    const MIN_HF = 1.26;
    const shouldRemainedCollateral = Big(borrowAmount)
      .times(1.0001)
      // .times(LTV_PRECISION)
      .times(exchangeRate)
      .div(EXCHANGE_PRECISION)
      .div(maxLTV)
      .times(MIN_HF);
    // ((borrowAmount * 1.0001 * LTV_PRECISION * exchangeRate) /
    //   EXCHANGE_PRECISION /
    //   maxLTV) *
    // MIN_HF;

    const maxWithdrawAmount = Big(collateralAmount).minus(
      shouldRemainedCollateral,
    );

    return maxWithdrawAmount.lt(0)
      ? Big(0)
      : maxWithdrawAmount.toFixed(underlyingToken?.decimals, 0);
  };

  const balance = useMemo(() => {
    if (state.tab === 'Add Collateral') {
      return userUnderlyingBalance;
    }
    if (state.tab === 'Remove Collateral') {
      return state.maxWithdraw;
    }
    if (state.tab === 'Borrow') {
      return state.borrowLimitUSD
        .div(Big(getPrice(borrowToken?.symbol)))
        .toFixed(borrowToken?.decimals, 0)
        .replace(/[.]?0*$/, '');
    }
    if (state.tab === 'Repay') {
      return bigMin(userBorrowBalance, yourBorrow);
    }
    if (state.tab === 'Supply') {
      return userBorrowBalance;
    }
    if (state.tab === 'Withdraw') {
      return yourLends;
    }
  }, [userUnderlyingBalance, userBorrowBalance, state.tab, borrowToken, state.maxWithdraw, yourBorrow, yourLends]);

  useEffect(() => {
    const collateralUSD = Big(yourCollateral || 0).times(
      Big(getPrice(underlyingToken?.symbol)),
    );
    const borrowUSD = Big(yourBorrow || 0).times(
      Big(getPrice(borrowToken?.symbol)),
    );
    const _borrowLimitUSD = collateralUSD
      .times(Big(maxLTV || 0))
      .div(1.11)
      .minus(borrowUSD);
    // console.log("borrowLimitUSD--", _borrowLimitUSD.toFixed());
    const _maxWithdraw = calcMaxWithdraw(
      yourCollateral,
      yourBorrow,
      maxLTV,
      exchangeRate,
    );
    // if (Big(data.yourCollateralUSD).gt(0)) {
    //   const shouldRemainedCollateral = Big(data.yourBorrowUSD || 0)
    //     .times(1.0001)
    //     .div(data.maxLTV)
    //     .div(1.018)
    //     // .div(data.exchangeRate)
    //     .times(1.05);
    //   _maxWithdraw = Big(data.yourCollateralUSD)
    //     .minus(shouldRemainedCollateral)
    //     .div(prices[data.TOKEN_A.symbol])
    //     .toFixed(18, 0);
    // } else {
    //   _maxWithdraw = 0;
    // }
    updateState({
      borrowLimitUSD: _borrowLimitUSD.lte(0) ? Big(0) : _borrowLimitUSD,
      maxWithdraw: _maxWithdraw,
    });
  }, [data]);

  if (['Add Collateral', 'Remove Collateral'].includes(state.tab)) {
    return (
      <LendingMarketInput
        icon={underlyingToken?.icon}
        symbol={underlyingToken?.symbol}
        decimals={underlyingToken?.decimals}
        balance={balance}
        price={underlyingPrice}
        amount={state.amount}
        onChange={onAmountChange}
      />
    );
  }

  return (
    <LendingMarketInput
      icon={borrowToken?.icon}
      symbol={borrowToken?.symbol}
      decimals={borrowToken?.decimals}
      balance={balance}
      price={borrowTokenPrice}
      amount={state.amount}
      onChange={onAmountChange}
    />
  );
};

export default LendingMarketExpandBorrowInput;

interface Props {
  data: any;
  state: any;
  prices: any;

  updateState(state: any): void;
}
