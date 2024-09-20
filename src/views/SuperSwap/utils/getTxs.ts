import Big from 'big.js';

import networks from '@/config/swap/networks';
import { get } from '@/utils/http';

import checkGas from '../checkGas';
import formatTrade from '../formatTrade';
import getWrapOrUnwrapTx from '../getWrapOrUnwrapTx';

export const getWrapTx = async ({ wethAddress, wrapType, amount, rawBalance, gasPrice, provider, account }: any) => {
  const signer = provider.getSigner(account);
  const { txn, gasLimit } = await getWrapOrUnwrapTx({
    signer,
    wethAddress,
    type: wrapType,
    amount
  });

  const { isGasEnough, gas } = checkGas({
    rawBalance,
    gasPrice,
    gasLimit
  });

  return {
    isGasEnough,
    gas,
    txn
  };
};

export const getDappTx = async ({
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  rawBalance,
  gasPrice,
  slippage,
  account,
  prices,
  onCallBack,
  onError
}: any) => {
  try {
    const network = networks[inputCurrency.chainId];
    const dexs = network.dexs;
    const templates: string[] = [];

    Object.values(dexs).forEach((dex: any) => {
      let count = 0;
      dex.tokens.forEach((token: any) => {
        if (
          [inputCurrency.address.toLowerCase(), outputCurrency.address.toLowerCase()].includes(
            token.address.toLowerCase()
          )
        ) {
          count++;
        }
        if (count > 1) return;
      });
      if (count > 1) {
        templates.push(dex.name);
      }
    });

    if (templates.length === 0) throw new Error();

    const response = await fetch(process.env.NEXT_PUBLIC_API + '/quoter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        params: JSON.stringify({
          templates,
          inputCurrency,
          outputCurrency,
          inputAmount: inputCurrencyAmount,
          slippage: slippage / 100 || 0.005,
          account
        })
      })
    });
    const result = await response.json();
    const data = result.data;
    if (!data) throw Error('');

    onCallBack(
      data
        .filter((item: any) => item.outputCurrencyAmount)
        .sort((a: any, b: any) => b.outputCurrencyAmount - a.outputCurrencyAmount)
        .map((item: any) => {
          const _trade = formatTrade({
            market: item,
            rawBalance,
            gasPrice,
            prices,
            inputCurrency,
            outputCurrency,
            inputCurrencyAmount
          });
          return { ..._trade, name: item.template, logo: dexs[item.template].logo, from: 'DapDap' };
        })
    );
  } catch (err) {
    console.log('dapdap error', err);
    onError?.();
  }
};

export const getAggregatorsTx = async ({
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
    if (inputCurrency.chainId !== 34443) {
      const result = await get(
        `/api/dex/okx?url=https://www.okx.com/api/v5/dex/aggregator/swap&method=GET&params=${JSON.stringify({
          chainId: inputCurrency.chainId,
          amount,
          fromTokenAddress: inputCurrency.isNative
            ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
            : inputCurrency.address,
          toTokenAddress: outputCurrency.isNative
            ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
            : outputCurrency.address,
          slippage: slippage / 100,
          userWalletAddress: account
        })}`
      );
      const data = result?.data?.[0];
      if (!data) throw Error();

      const dex = data.routerResult.quoteCompareList[0];
      onCallBack(
        formatTrade({
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
            routerAddress: data.tx.to,
            template: dex.dexName,
            logo: dex.dexLogo,
            outputCurrencyAmount: dex.amountOut
          },
          prices: {
            ...prices,
            [inputCurrency.symbol]: inputCurrency.usd,
            [outputCurrency.symbol]: outputCurrency.usd
          },
          inputCurrency,
          outputCurrency,
          inputCurrencyAmount
        })
      );
    } else {
      const params = {
        chain: inputCurrency.chainId,
        amount: inputCurrencyAmount,
        inTokenAddress: inputCurrency.isNative ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' : inputCurrency.address,
        outTokenAddress: outputCurrency.isNative
          ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
          : outputCurrency.address,
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
      onCallBack(
        formatTrade({
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
        })
      );
    }
  } catch (err) {
    console.log('aggregator error', err);
    onError?.();
  }
};

export const updateDappTx = async ({
  trade,
  slippage,
  account,
  rawBalance,
  gasPrice,
  prices,
  onSuccess,
  onError
}: any) => {
  try {
    const { inputCurrency, outputCurrency, inputCurrencyAmount, name } = trade;

    const response = await fetch(process.env.NEXT_PUBLIC_API + '/quoter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        params: JSON.stringify({
          template: name,
          inputCurrency,
          outputCurrency,
          inputAmount: inputCurrencyAmount,
          slippage: slippage / 100 || 0.005,
          account
        })
      })
    });
    const result = await response.json();
    const data = result.data;
    if (!data) throw Error('');

    onSuccess({
      ...trade,
      ...formatTrade({
        market: data,
        rawBalance,
        gasPrice,
        prices,
        inputCurrency,
        outputCurrency,
        inputCurrencyAmount
      })
    });
  } catch (err) {
    console.log('dapdap error', err);
    onError?.();
  }
};
