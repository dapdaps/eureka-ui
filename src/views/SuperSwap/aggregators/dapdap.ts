import Big from 'big.js';

import networks from '@/config/swap/networks';

import formatTrade from '../formatTrade';

export default async function getDapdapTx({
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
            account: account || '0x6F78C36F8a645509744250B127646ABE4150103b'
          })
        })
      });
      const result = await response.json();
      const data = result.data;
      if (!data) throw Error('Empty Data');

      onCallBack(
        data
          .filter((item: any) => Big(item.outputCurrencyAmount || 0).gt(0))
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
            return { ..._trade, name: item.template, logo: dexs[item.template].logo, from: 'Dapdap' };
          })
      );
    } catch (err) {
      console.log('dapdap error', err);
      onError?.();
    }
  } catch (err) {
    onError?.();
  }
}
