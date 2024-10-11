import Big from 'big.js';

export function getAnotherAmountOut({ currentPrice, lowerPrice, upperPrice, amount, isToken0, isFullRange }: any) {
  if (isFullRange || isNaN(Number(lowerPrice)) || isNaN(Number(upperPrice))) {
    return isToken0 ? amount * currentPrice : amount * (1 / currentPrice);
  }

  const q96 = 2 ** 96;

  const sqrtpLower = Math.sqrt(lowerPrice) * q96;
  const sqrtpCurrent = Math.sqrt(currentPrice) * q96;
  const sqrtpUpper = Math.sqrt(upperPrice) * q96;

  const sort = (pa: number, pb: number) => {
    return new Big(pa).gt(pb) ? [pb, pa] : [pa, pb];
  };

  const liquitity0 = (amount: any, pa: any, pb: any) => {
    const [_pa, _pb] = sort(pa, pb);
    const diff = new Big(_pb).minus(_pa);
    return new Big(amount)
      .mul(_pa * _pb)
      .div(q96)
      .div(diff.eq(0) ? 1 : diff);
  };

  const liquitity1 = (amount: any, pa: any, pb: any) => {
    const [_pa, _pb] = sort(pa, pb);
    const diff = new Big(_pb).minus(_pa);
    return new Big(amount).mul(q96).div(diff.eq(0) ? 1 : diff);
  };

  const liquidity = isToken0
    ? liquitity0(amount, sqrtpCurrent, sqrtpUpper)
    : liquitity1(amount, sqrtpCurrent, sqrtpLower);

  const calcAmount0 = (liq: any, pa: any, pb: any) => {
    const [_pa, _pb] = sort(pa, pb);
    return (liq * q96 * (_pb - _pa)) / _pa / _pb;
  };

  const calcAmount1 = (liq: any, pa: any, pb: any) => {
    const [_pa, _pb] = sort(pa, pb);
    return (liq * (_pb - _pa)) / q96;
  };

  return isToken0 ? calcAmount1(liquidity, sqrtpLower, sqrtpCurrent) : calcAmount0(liquidity, sqrtpUpper, sqrtpCurrent);
}

export function getAnotherAmountOutV2({ amount, isToken0, reserve0, reserve1 }: any) {
  const price = isToken0 ? Big(reserve1).div(reserve0) : Big(reserve0).div(reserve1);

  return price.mul(amount).toString();
}
