import Big from 'big.js';

import { get } from '@/utils/http';

import formatTrade from '../formatTrade';

export default async function getOkxTx({
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
}: any) {
  try {
    let spender = '';
    if (!inputCurrency.isNative || inputCurrency.chainId === 1088) {
      const allowanceRes = await get(
        `/api/dex/okx?url=https://www.okx.com/api/v5/dex/aggregator/approve-transaction&method=GET&params=${JSON.stringify(
          {
            chainId: inputCurrency.chainId,
            approveAmount: amount,
            tokenContractAddress: inputCurrency.address
          }
        )}`
      );
      spender = allowanceRes?.data?.[0]?.dexContractAddress;
    }
    const result = await get(
      `/api/dex/okx?url=https://www.okx.com/api/v5/dex/aggregator/swap&method=GET&params=${JSON.stringify({
        chainId: inputCurrency.chainId,
        amount,
        fromTokenAddress: inputCurrency.isNative ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' : inputCurrency.address,
        toTokenAddress: outputCurrency.isNative ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' : outputCurrency.address,
        slippage: slippage / 100,
        userWalletAddress: account || '0x6F78C36F8a645509744250B127646ABE4150103b'
      })}`
    );
    const data = result?.data?.[0];
    if (!data) throw Error('Empty Data');

    const dex =
      data.routerResult.quoteCompareList[0] || data.routerResult.dexRouterList?.[0]?.subRouterList[0]?.dexProtocol?.[0];
    if (!dex || Big(data.routerResult.toTokenAmount || 0).eq(0)) throw Error();

    if (inputCurrency.usd) prices[inputCurrency.symbol] = inputCurrency.usd;
    if (outputCurrency.usd) prices[outputCurrency.symbol] = outputCurrency.usd;
    onCallBack([
      {
        ...formatTrade({
          rawBalance,
          gasPrice,
          market: {
            txn: {
              value: data.tx.value,
              data: data.tx.data,
              to: data.tx.to,
              gasLimit: data.tx.gas
            },
            routes: [
              {
                percentage: 100,
                routes: [{ token0: { symbol: inputCurrency.symbol }, token1: { symbol: outputCurrency.symbol } }]
              }
            ],

            noPair: false,
            routerAddress: spender,
            template: dex.dexName,
            logo: dex.dexLogo,
            outputCurrencyAmount: Big(data.routerResult.toTokenAmount)
              .div(10 ** outputCurrency.decimals)
              .toString()
          },
          prices: {
            ...prices
          },
          inputCurrency,
          outputCurrency,
          inputCurrencyAmount
        }),
        from: 'Okx'
      }
    ]);
  } catch (err) {
    console.log('okx error', err);
    onError?.();
  }
}
