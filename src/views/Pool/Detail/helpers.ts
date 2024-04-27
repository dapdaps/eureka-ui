import Big from 'big.js';
import { tickToPrice } from '../utils/tickMath';

export function getTokenAmounts({ liquidity, tickLower, tickUpper, currentTick, token0, token1 }: any) {
  const lowerPrice = tickToPrice({ tick: tickLower, token0, token1 });
  const currentPrice = tickToPrice({ tick: currentTick, token0, token1 });
  const upperPrice = tickToPrice({ tick: tickUpper, token0, token1 });

  const q96 = 2 ** 96;

  const sqrtpLower = Math.sqrt(lowerPrice) * q96;
  const sqrtpCurrent = Math.sqrt(currentPrice) * q96;
  const sqrtpUpper = Math.sqrt(upperPrice) * q96;

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
