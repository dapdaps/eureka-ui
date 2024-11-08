import Big from 'big.js';
import { useMemo } from 'react';

import useAccount from '@/hooks/useAccount';

import LendingMarketInput from '../Input';
const LendingMarketExpandInput = (props: Props) => {
  const { data, state, updateState, dexConfig } = props;
  const { underlyingToken, underlyingPrice, userUnderlyingBalance } = data || {};

  const { provider } = useAccount();

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
    const params: any = {
      amount: _amount,
      isOverSize: false,
      isBigerThanBalance: Big(_amount).gt(userUnderlyingBalance || 0)
    };
    params.buttonClickable = !params.isOverSize && !params.isBigerThanBalance;

    updateState(params);
    state.debouncedGetTrade();
  };

  const balance = useMemo(() => {
    return userUnderlyingBalance;
  }, [userUnderlyingBalance]);

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
};

export default LendingMarketExpandInput;

interface Props {
  data: any;
  dexConfig: any;
  state: any;
  updateState(state: any): void;
}
