import Big from 'big.js';
import { sortTokens } from './sortTokens';

export async function getTickFromPrice({ token0, token1, price }: any) {
  const [_token0, _token1] = sortTokens(token0, token1);
  const decimals = _token1.decimals - _token0.decimals;
  const isReverse = _token1.address === token0.address;

  return Math.floor(Math.log(new Big(isReverse ? 1 / price : price).mul(10 ** decimals).toNumber()) / Math.log(1.0001));
}
