import { Contract } from 'ethers';
import config from '@/config/uniswap/linea/index';
import positionAbi from '../abi/positionAbi';

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

export function getTokenAmounts({ liquidity, sqrtPriceX96, tickLow, tickHigh, currentTick, Decimal0, Decimal1 }: any) {
  const sqrtRatioA = Math.sqrt(1.0001 ** tickLow);
  const sqrtRatioB = Math.sqrt(1.0001 ** tickHigh);
  const sqrtPrice = sqrtPriceX96 / 2 ** 96;
  let amount0 = 0;
  let amount1 = 0;
  if (currentTick < tickLow) {
    amount0 = Math.floor(liquidity * ((sqrtRatioB - sqrtRatioA) / (sqrtRatioA * sqrtRatioB)));
  } else if (currentTick >= tickHigh) {
    amount1 = Math.floor(liquidity * (sqrtRatioB - sqrtRatioA));
  } else if (currentTick >= tickLow && currentTick < tickHigh) {
    amount0 = Math.floor(liquidity * ((sqrtRatioB - sqrtPrice) / (sqrtPrice * sqrtRatioB)));
    amount1 = Math.floor(liquidity * (sqrtPrice - sqrtRatioA));
  }

  const amount0Human = (amount0 / 10 ** Decimal0).toFixed(Decimal0);
  const amount1Human = (amount1 / 10 ** Decimal1).toFixed(Decimal1);
  return [amount0Human, amount1Human];
}
