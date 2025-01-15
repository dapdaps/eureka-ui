import addresses from '@unizen-io/unizen-contract-addresses/production.json';
import Big from 'big.js';
import { useEffect, useState } from 'react';

import { asyncFetch } from '@/utils/http';
import formatTrade from '@/views/SuperSwap/formatTrade';
export const BASE_URL = '/api.zcx.com';
export const AUTH_KEY = process.env.NEXT_PUBLIC_UNIZEN_AUTH_KEY;
export const PERMIT2_ADDRESS = '0x000000000022D473030F116dDEE9F6B43aC78BA3';

console.log('====AUTH_KEY====');
console.log(AUTH_KEY);

console.log('=====process.env.NEXT_PUBLIC_API=====');
console.log(process.env.NEXT_PUBLIC_API);

export const fetchApi = async (url: string, options?: object) => {
  return await asyncFetch(url, {
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + AUTH_KEY
    },
    ...(options ?? {})
  });
};

const IdToPath: any = {
  1: 'ethereum',
  10: 'optimism',
  56: 'bsc',
  137: 'polygon',
  250: 'fantom',
  8453: 'base',
  42161: 'arbitrum',
  43114: 'avax'
};

const handleGetUnizenTx = async ({ account, chainId, transactionData, nativeValue, tradeType }: any) => {
  const result = await fetchApi(`${BASE_URL}/trade/v1/${chainId}/swap/single`, {
    method: 'POST',
    body: JSON.stringify({
      transactionData,
      nativeValue,
      account,
      tradeType
    })
  });
  return result;
};
export const getUnizenTx = async ({
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  amount,
  slippage,
  account,
  rawBalance,
  gasPrice,
  prices,
  onCallBack,
  onError
}: any) => {
  try {
    try {
      const result = await fetchApi(
        `${BASE_URL}/trade/v1/${inputCurrency.chainId}/quote/single?fromTokenAddress=${inputCurrency.address === 'native' ? '0x0000000000000000000000000000000000000000' : inputCurrency.address}&toTokenAddress=${outputCurrency.address === 'native' ? '0x0000000000000000000000000000000000000000' : outputCurrency.address}&amount=${amount}&isSplit=true&slippage=${slippage / 100 || 0.005}&sender=${account}&receiver=${account}&disableEstimateGas=false&version=v2&generateTransactionData=true`
      );
      const data = result?.[0];
      if (!data) throw Error('Empty Data');
      const markets = result
        .filter((item: any) => Big(item?.toTokenAmount ?? 0).gt(0))
        .sort((a: any, b: any) => b.toTokenAmount - a.toTokenAmount);

      const promiseArray: any = [];
      markets.forEach((item: any) => {
        promiseArray.push(
          handleGetUnizenTx({
            account,
            chainId: inputCurrency.chainId,
            transactionData: {
              ...item.transactionData,
              version: 'v2'
            },
            tradeType: item.tradeType,
            nativeValue: item.nativeValue
          })
        );
      });

      console.log('======markets======', markets);
      const secondResult = await Promise.all(promiseArray);
      const unizenRouter: any = addresses?.unizenRouter;
      onCallBack(
        markets.map((item: any, index: number) => {
          const address = unizenRouter?.[IdToPath?.[inputCurrency.chainId]];
          const _trade = formatTrade({
            market: {
              txn: {
                value: item?.nativeValue,
                data: secondResult?.[index]?.data,
                to: address,
                gasLimit: Big(secondResult?.[index]?.estimateGas ?? 0)
                  .times(1.2)
                  .toFixed(0)
              },
              routes: [
                {
                  percentage: 100,
                  routes: [{ token0: { symbol: inputCurrency.symbol }, token1: { symbol: outputCurrency.symbol } }]
                }
              ],
              noPair: false,
              routerAddress: address,
              template: item?.protocol?.[0]?.name,
              logo: item?.protocol?.[0]?.logo,
              outputCurrencyAmount: Big(item.toTokenAmount)
                .div(10 ** outputCurrency.decimals)
                .toString()
            },
            rawBalance,
            gasPrice,
            prices,
            inputCurrency,
            outputCurrency,
            inputCurrencyAmount
          });
          return {
            ..._trade,
            name: item?.protocol?.[0]?.name,
            logo: item?.protocol?.[0]?.logo,
            from: 'Unizen'
          };
        })
      );
    } catch (err) {
      console.log('dapdap error', err);
      onError?.();
    }
  } catch (err) {
    onError?.();
  }
};

export default function useUnizen({ chainId }: any) {
  const [chains, setChains] = useState<any>(null);
  const [tokens, setTokens] = useState([]);
  const [tokensLoading, setTokensLoading] = useState(false);
  const getChains = async () => {
    const result = await fetchApi(BASE_URL + '/trade/v1/info/chains');
    setChains(result?.chains);
  };
  const getTokens = async () => {
    if (chains?.[chainId]) {
      const result = await fetchApi(BASE_URL + '/trade/v1/info/token/popular?from=0&to=19&chain_id=' + chainId);
      setTokens(
        (result?.tokens ?? []).map((token: any) => {
          const contract = token?.contracts?.find((contract: any) => contract.chain_id === chainId);
          return {
            ...token,
            chainId,
            icon: token?.logo,
            decimals: contract?.decimals,
            isNative: contract?.contract_address === '0x0000000000000000000000000000000000000000',
            address:
              contract?.contract_address === '0x0000000000000000000000000000000000000000'
                ? 'native'
                : contract?.contract_address
          };
        })
      );
    } else {
      setTokens([]);
    }
  };

  useEffect(() => {
    if (chainId && chains) {
      getTokens();
    }
  }, [chainId, chains]);

  useEffect(() => {
    getChains();
  }, []);

  return {
    tokens,
    tokensLoading
  };
}
