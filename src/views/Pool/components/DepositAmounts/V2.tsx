import Big from 'big.js';
import { memo, useEffect, useState } from 'react';

import { usePriceStore } from '@/stores/price';

import { getAnotherAmountOutV2 } from '../../AddLiquidity/helpers';
import Input from './Input';
import { StyledContainer, StyledSubtitle } from './styles';

const DepositAmounts = ({
  label,
  token0,
  token1,
  value0,
  value1,
  setValue0,
  setValue1,
  reserve0,
  reserve1,
  onError,
}: any) => {
  const prices = usePriceStore((store) => store.price);
  const [balance0, setBalance0] = useState('');
  const [balance1, setBalance1] = useState('');

  const handleValue = (value: any, type: 0 | 1) => {
    if (type === 0) {
      setValue0(value);
    } else {
      setValue1(value);
    }

    if (!reserve0 || !reserve1) return;

    if (type === 0) {
      setValue1('');
    } else {
      setValue0('');
    }

    const isReversed = token0.address.toLowerCase() > token1.address.toLowerCase();

    const isToken0 = (type === 0 && !isReversed) || (type === 1 && isReversed);

    const amountOut = new Big(value || 0).gt(0)
      ? getAnotherAmountOutV2({
          reserve0,
          reserve1,
          amount: value,
          isToken0,
        })
      : '';

    if (type === 0) {
      const _amountOut = !amountOut ? '' : new Big(amountOut).toFixed(token1.decimals).replace(/\.?0+$/, '');
      setValue1(_amountOut);
    } else {
      const _amountOut = !amountOut ? '' : new Big(amountOut).toFixed(token0.decimals).replace(/\.?0+$/, '');
      setValue0(_amountOut);
    }
  };

  useEffect(() => {
    if (!reserve0 || !reserve1) {
      setValue0('');
      setValue1('');
      return;
    }
    if (value0) {
      handleValue(value0, 0);
    }
  }, [reserve0, reserve1]);

  useEffect(() => {
    if (!value0 || !value1) {
      onError('Enter Amount');
      return;
    }
    if (new Big(balance0 || 0).lt(value0 || 0) || new Big(balance1 || 0).lt(value1 || 0)) {
      onError('Insufficient Balance');
      return;
    }
    onError('');
  }, [value0, value1, balance0, balance1]);

  return (
    <StyledContainer>
      <StyledSubtitle>{label}</StyledSubtitle>
      <Input
        token={token0}
        value={value0}
        setValue={(val: any) => {
          handleValue(val, 0);
        }}
        prices={prices}
        disabled={!token0 || !token1}
        onLoad={(balance: string) => {
          setBalance0(balance);
        }}
      />

      <Input
        token={token1}
        value={value1}
        setValue={(val: any) => {
          handleValue(val, 1);
        }}
        prices={prices}
        disabled={!token0 || !token1}
        onLoad={(balance: string) => {
          setBalance1(balance);
        }}
      />
    </StyledContainer>
  );
};

export default memo(DepositAmounts);
