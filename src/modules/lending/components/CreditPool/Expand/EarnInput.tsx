import Big from 'big.js';
import { useMemo } from 'react';

import LendingMarketInput from '../Input';

const LendingMarketEarnInput = (props: Props) => {
  const {
    data,

    state,
    updateState
  } = props;

  const { userUnderlyingBalance, underlyingPrice, yourLends, underlyingToken } = data;

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
    const params: any = { amount: _amount };
    if (state.tab === 'Supply') {
      params.isBigerThanBalance = Big(_amount).gt(userUnderlyingBalance || 0);
    }
    if (state.tab === 'Withdraw') {
      params.isBigerThanBalance = Big(_amount).gt(yourLends || 0);
    }
    params.buttonClickable = !params.isBigerThanBalance;
    updateState(params);

    state.debouncedGetTrade();
  };

  const balance = useMemo(() => {
    if (state.tab === 'Supply') {
      return userUnderlyingBalance;
    }
    return yourLends;
  }, [state.tab, userUnderlyingBalance, yourLends]);

  return (
    <>
      <LendingMarketInput
        icon={underlyingToken?.icon}
        symbol={underlyingToken?.symbol}
        decimals={underlyingToken?.decimals}
        balance={balance}
        price={underlyingPrice}
        amount={state.amount}
        onChange={onAmountChange}
      />
    </>
  );
};

export default LendingMarketEarnInput;

interface Props {
  data: any;
  state: any;
  prices: any;

  updateState(state: any): void;
}
