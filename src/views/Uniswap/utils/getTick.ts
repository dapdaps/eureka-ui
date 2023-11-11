import { Contract } from 'ethers';
import config from '@/config/uniswap/linea/index';
import tickMathAbi from '../abi/tickMathAbi';

export async function getTickAtSqrtRatio(sqrtPriceX96: string, provider: any) {
  const TickMathContract = new Contract(config.contracts.tickMathAddress, tickMathAbi, provider);
  const result = await TickMathContract.getTickAtSqrtRatio(sqrtPriceX96);
  return result;
}

export async function getSqrtRatioAtTick(tick: string, provider: any) {
  const TickMathContract = new Contract(config.contracts.tickMathAddress, tickMathAbi, provider);
  const result = await TickMathContract.getSqrtRatioAtTick(tick);
  return result.toString();
}
