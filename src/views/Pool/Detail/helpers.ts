import Big from 'big.js';
import JSBI from 'jsbi';

export const toSqrt = (tick: number) => {
  function mulShift(val: JSBI, mulBy: string): JSBI {
    return JSBI.signedRightShift(JSBI.multiply(val, JSBI.BigInt(mulBy)), JSBI.BigInt(128));
  }

  const Q32 = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(32));
  const absTick: number = tick < 0 ? tick * -1 : tick;

  let ratio: JSBI =
    (absTick & 0x1) != 0
      ? JSBI.BigInt('0xfffcb933bd6fad37aa2d162d1a594001')
      : JSBI.BigInt('0x100000000000000000000000000000000');
  if ((absTick & 0x2) != 0) ratio = mulShift(ratio, '0xfff97272373d413259a46990580e213a');
  if ((absTick & 0x4) != 0) ratio = mulShift(ratio, '0xfff2e50f5f656932ef12357cf3c7fdcc');
  if ((absTick & 0x8) != 0) ratio = mulShift(ratio, '0xffe5caca7e10e4e61c3624eaa0941cd0');
  if ((absTick & 0x10) != 0) ratio = mulShift(ratio, '0xffcb9843d60f6159c9db58835c926644');
  if ((absTick & 0x20) != 0) ratio = mulShift(ratio, '0xff973b41fa98c081472e6896dfb254c0');
  if ((absTick & 0x40) != 0) ratio = mulShift(ratio, '0xff2ea16466c96a3843ec78b326b52861');
  if ((absTick & 0x80) != 0) ratio = mulShift(ratio, '0xfe5dee046a99a2a811c461f1969c3053');
  if ((absTick & 0x100) != 0) ratio = mulShift(ratio, '0xfcbe86c7900a88aedcffc83b479aa3a4');
  if ((absTick & 0x200) != 0) ratio = mulShift(ratio, '0xf987a7253ac413176f2b074cf7815e54');
  if ((absTick & 0x400) != 0) ratio = mulShift(ratio, '0xf3392b0822b70005940c7a398e4b70f3');
  if ((absTick & 0x800) != 0) ratio = mulShift(ratio, '0xe7159475a2c29b7443b29c7fa6e889d9');
  if ((absTick & 0x1000) != 0) ratio = mulShift(ratio, '0xd097f3bdfd2022b8845ad8f792aa5825');
  if ((absTick & 0x2000) != 0) ratio = mulShift(ratio, '0xa9f746462d870fdf8a65dc1f90e061e5');
  if ((absTick & 0x4000) != 0) ratio = mulShift(ratio, '0x70d869a156d2a1b890bb3df62baf32f7');
  if ((absTick & 0x8000) != 0) ratio = mulShift(ratio, '0x31be135f97d08fd981231505542fcfa6');
  if ((absTick & 0x10000) != 0) ratio = mulShift(ratio, '0x9aa508b5b7a84e1c677de54f3e99bc9');
  if ((absTick & 0x20000) != 0) ratio = mulShift(ratio, '0x5d6af8dedb81196699c329225ee604');
  if ((absTick & 0x40000) != 0) ratio = mulShift(ratio, '0x2216e584f5fa1ea926041bedfe98');
  if ((absTick & 0x80000) != 0) ratio = mulShift(ratio, '0x48a170391f7dc42444e8fa2');

  if (tick > 0)
    ratio = JSBI.divide(JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'), ratio);

  // back to Q96
  return JSBI.greaterThan(JSBI.remainder(ratio, Q32), JSBI.BigInt(0))
    ? JSBI.add(JSBI.divide(ratio, Q32), JSBI.BigInt(1))
    : JSBI.divide(ratio, Q32);
};

export function getTokenAmounts({ liquidity, tickLower, tickUpper, currentTick, token0, token1 }: any) {
  const q96 = 2 ** 96;

  const sqrtpLower = toSqrt(tickLower).toString();
  const sqrtpCurrent = toSqrt(currentTick).toString();
  const sqrtpUpper = toSqrt(tickUpper).toString();

  let _amount0 = '0';
  let _amount1 = '0';

  function calc_amount0() {
    if (currentTick < tickLower || currentTick < tickUpper) {
      const _current0 = currentTick < tickLower ? new Big(sqrtpLower) : new Big(sqrtpCurrent);
      const _reverse0 = new Big(sqrtpUpper).gt(_current0);
      const _sqrtRatio0A = _reverse0 ? new Big(_current0) : new Big(sqrtpUpper);
      const _sqrtRatio0B = _reverse0 ? new Big(sqrtpUpper) : new Big(_current0);
      const _diff0 = _sqrtRatio0B.minus(_sqrtRatio0A);
      const amount0 = new Big(liquidity)
        .mul(q96)
        .mul(_diff0)
        .div(_sqrtRatio0A)
        .div(_sqrtRatio0B)
        .div(10 ** token0.decimals);
      _amount0 = amount0.toFixed(token0.decimals);
    } else {
      _amount0 = '0';
    }
  }

  function calc_amount1() {
    if (currentTick < tickLower) {
      _amount1 = '0';
    } else {
      const _current1 = currentTick < tickUpper ? new Big(sqrtpCurrent) : new Big(sqrtpUpper);
      const _reverse1 = new Big(sqrtpLower).gt(_current1);
      const _sqrtRatio1A = _reverse1 ? new Big(_current1) : new Big(sqrtpLower);
      const _sqrtRatio1B = _reverse1 ? new Big(sqrtpLower) : new Big(_current1);
      const _diff1 = _sqrtRatio1B.minus(_sqrtRatio1A);

      const amount1 =
        currentTick < tickLower
          ? new Big(0)
          : new Big(liquidity)
              .mul(_diff1)
              .div(q96)
              .div(10 ** token1.decimals);
      _amount1 = amount1.toFixed(token1.decimals);
    }
  }

  calc_amount0();
  calc_amount1();

  return [_amount0, _amount1];
}

export function getTokenAmountsV2({ liquidity, totalSupply, reserve0, reserve1 }: any) {
  const amount0 = Big(liquidity).div(totalSupply).mul(reserve0).toString();
  const amount1 = Big(liquidity).div(totalSupply).mul(reserve1).toString();

  return { amount0, amount1 };
}
