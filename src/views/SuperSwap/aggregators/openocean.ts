import Big from 'big.js';

import { get } from '@/utils/http';

import formatTrade from '../formatTrade';

export default async function getOpenoceanTx({
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  slippage,
  account,
  rawBalance,
  gasPrice,
  prices,
  onCallBack,
  onError
}: any) {
  try {
    const params = {
      chain: inputCurrency.chainId,
      amount: inputCurrencyAmount,
      inTokenAddress: inputCurrency.isNative ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' : inputCurrency.address,
      outTokenAddress: outputCurrency.isNative ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' : outputCurrency.address,
      gasPrice: 5
    };
    const [quoteResult, swapResult] = await Promise.all([
      get(
        `/api/dex/okx?url=https://open-api.openocean.finance/v4/${inputCurrency.chainId}/quote&method=GET&params=${JSON.stringify(
          params
        )}`
      ),
      get(
        `/api/dex/okx?url=https://open-api.openocean.finance/v4/${inputCurrency.chainId}/swap&method=GET&params=${JSON.stringify(
          {
            ...params,
            slippage,
            account
          }
        )}`
      )
    ]);
    const quoteData = quoteResult?.data;
    if (!quoteData) throw Error();
    const dex = quoteData.dexes.pop();
    const swapData = swapResult?.data;
    if (!swapData) throw Error();
    onCallBack([
      {
        ...formatTrade({
          rawBalance,
          gasPrice,
          market: {
            txn: {
              value: swapData.value,
              data: swapData.data,
              to: swapData.to,
              gasLimit: Big(swapData.estimatedGas).mul(1.2).toFixed(0)
            },
            routes: [
              {
                percentage: 100,
                routes: [{ token0: { symbol: inputCurrency.symbol }, token1: { symbol: outputCurrency.symbol } }]
              }
            ],

            noPair: false,
            routerAddress: swapData.to,
            template: dex.dexCode,
            logo: dex.dexLogo,
            outputCurrencyAmount: Big(quoteData.outAmount)
              .div(10 ** outputCurrency.decimals)
              .toString()
          },
          prices,
          inputCurrency,
          outputCurrency,
          inputCurrencyAmount
        }),
        from: 'Openocean'
      }
    ]);
  } catch (err) {
    console.log('openocean error', err);
    onError?.();
  }
}
