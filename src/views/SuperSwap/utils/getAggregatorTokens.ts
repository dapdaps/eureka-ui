import chains from '@/config/chains';
import { get } from '@/utils/http';

import getOKXPrices from '../utils/getOKXPrices';

export default async function getAggregatorTokens(chainId: number) {
  let tokens: any = [];
  const nativeToken = chains[chainId].nativeCurrency;
  if (chainId !== 34443) {
    const result = await get(
      `/api/dex/okx?url=https://www.okx.com/api/v5/dex/aggregator/all-tokens&method=GET&params=${JSON.stringify({ chainId })}`
    );

    tokens = result.data?.map((token: any) => {
      const isNative = token.tokenContractAddress === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

      return isNative
        ? { ...nativeToken, chainId, isNative, address: 'native' }
        : {
            name: token.tokenName,
            symbol: token.tokenSymbol,
            icon: token.tokenLogoUrl,
            decimals: Number(token.decimals),
            address: token.tokenContractAddress,
            chainId
          };
    });

    const okxPrices = await getOKXPrices(tokens.slice(0, 50));

    tokens = tokens.map((token: any) => ({ ...token, usd: okxPrices[token.address.toLowerCase()] }));
  } else {
    const result = await get(`/api/dex/okx?url=https://open-api.openocean.finance/v4/${chainId}/tokenList&method=GET`);
    tokens = result.data?.map((token: any) => {
      const isNative = token.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
      return isNative
        ? { ...nativeToken, chainId, isNative, address: 'native', usd: token.usd }
        : {
            name: token.name,
            symbol: token.symbol,
            icon: token.icon,
            decimals: token.decimals,
            address: token.address,
            chainId,
            usd: token.usd
          };
    });
  }
  return tokens;
}
