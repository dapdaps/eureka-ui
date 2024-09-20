import { get } from '@/utils/http';

export default async function getOKXPrices(tokens: any) {
  const slices = Math.ceil(tokens.length / 20);

  const calls = Array.from({ length: slices }, (_, index) => index).map((i) => {
    const _tokens = tokens.slice(20 * i, 20 * (i + 1));
    return get(
      `/api/dex/okx?url=https://www.okx.com/api/v5/wallet/token/current-price&method=POST&params=${JSON.stringify(
        _tokens.map((token: any) => ({
          chainIndex: token.chainId,
          tokenAddress: token.isNative ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : token.address
        }))
      )}`
    );
  });
  const results = await Promise.all(calls);
  const prices: Record<string, string> = {};

  results?.forEach((result: any) => {
    const data = result?.data || [];
    data.forEach((token: any) => {
      prices[
        token.tokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
          ? 'native'
          : token.tokenAddress.toLowerCase()
      ] = token.price;
    });
  });

  return prices;
}
