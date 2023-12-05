import { Contract } from 'ethers';
import Big from 'big.js';
import config from '@/config/uniswap/index';
import positionAbi from '../abi/positionAbi';
import { getSqrtRatioAtTick } from '../utils/getTick';

export async function getPosition(tokenId: string, provider: any) {
  const PositionContract = new Contract(config.contracts.positionAddress, positionAbi, provider);
  return await PositionContract.positions(tokenId);
}

export async function getPositionCollect(args: string[], provider: any) {
  const PositionContract = new Contract(config.contracts.positionAddress, positionAbi, provider);
  return await PositionContract.callStatic.collect([
    ...args,
    '340282366920938463463374607431768211455',
    '340282366920938463463374607431768211455',
  ]);
}

export async function getTokenAmounts({ liquidity, tickLower, tickUpper, tick, decimal0, decimal1, provider }: any) {
  const [sqrtRatioLower, sqrtRatioUpper, sqrtRatio] = await Promise.all([
    getSqrtRatioAtTick(tickLower, provider),
    getSqrtRatioAtTick(tickUpper, provider),
    getSqrtRatioAtTick(tick, provider),
  ]);

  let _amount0 = '0';
  let _amount1 = '0';

  const q96 = 2 ** 96;

  function calc_amount0() {
    if (tick < tickLower || tick < tickUpper) {
      const _current0 = tick < tickLower ? new Big(sqrtRatioLower) : new Big(sqrtRatio);
      const _reverse0 = new Big(sqrtRatioUpper).gt(_current0);
      const _sqrtRatio0A = _reverse0 ? new Big(_current0) : new Big(sqrtRatioUpper);
      const _sqrtRatio0B = _reverse0 ? new Big(sqrtRatioUpper) : new Big(_current0);
      const _diff0 = _sqrtRatio0B.minus(_sqrtRatio0A);
      const amount0 = new Big(liquidity)
        .mul(q96)
        .mul(_diff0)
        .div(_sqrtRatio0A)
        .div(_sqrtRatio0B)
        .div(10 ** decimal0);
      _amount0 = amount0.toFixed(decimal0);
    } else {
      _amount0 = '0';
    }
  }

  function calc_amount1() {
    if (tick < tickLower) {
      _amount1 = '0';
    } else {
      const _current1 = tick < tickUpper ? new Big(sqrtRatio) : new Big(sqrtRatioUpper);
      const _reverse1 = new Big(sqrtRatioLower).gt(_current1);
      const _sqrtRatio1A = _reverse1 ? new Big(_current1) : new Big(sqrtRatioLower);
      const _sqrtRatio1B = _reverse1 ? new Big(sqrtRatioLower) : new Big(_current1);
      const _diff1 = _sqrtRatio1B.minus(_sqrtRatio1A);

      const amount1 =
        tick < tickLower
          ? new Big(0)
          : new Big(liquidity)
              .mul(_diff1)
              .div(q96)
              .div(10 ** decimal1);
      _amount1 = amount1.toFixed(decimal1);
    }
  }

  calc_amount0();
  calc_amount1();

  return [_amount0, _amount1];
}
