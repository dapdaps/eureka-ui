import { getTokenAddress } from '../utils';

export function sortTokens(token0: any, token1: any) {
  if (!token0 || !token1) return [];
  const _address0 = getTokenAddress(token0.address, true);
  const _address1 = getTokenAddress(token1.address, true);
  if (Number(_address0) > Number(_address1)) return [token1, token0];
  return [token0, token1];
}
