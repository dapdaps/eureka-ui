import weth from '@/config/contract/weth';

export function getPairByTokens({ token0, token1, pairs, chainId }: any) {
  const _token0 = revertTokenAddress(token0, chainId);
  const _token1 = revertTokenAddress(token1, chainId);
  let _pair: any = null;
  pairs.some((pair: any) => {
    if (pair.tokens.includes(_token0) && pair.tokens.includes(_token1)) {
      _pair = pair;
      return pair;
    }
    return false;
  });
  return _pair;
}

export function revertTokenAddress(address: string, chainId: number) {
  const wethAddress = weth[chainId];
  return address === wethAddress ? 'native' : address.toLowerCase();
}
