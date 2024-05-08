import weth from '@/config/contract/weth';

export function wrapNativeToken(token: any) {
  if (token.isNative && token.chainId !== 1088) return { ...token, address: weth[token.chainId] };
  return token;
}

export function sortTokens(token0: any, token1: any) {
  if (!token0 || !token1) return [];
  const _token0 = wrapNativeToken(token0);
  const _token1 = wrapNativeToken(token1);
  if (_token0.address.toLowerCase() > _token1.address.toLowerCase()) return [token1, token0];

  return [token0, token1];
}
