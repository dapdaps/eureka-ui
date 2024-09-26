import { getDapdapTx, getOkxTx, getOpenoceanTx } from '../aggregators';
import checkGas from '../checkGas';
import getWrapOrUnwrapTx from '../getWrapOrUnwrapTx';

export const LEN = 3;

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

export const getTxs = (params: any) => {
  getDapdapTx(params);
  getOkxTx(params);
  getOpenoceanTx(params);
};

export const updateDappTx = async ({ trade, slippage, account, onSuccess, onError }: any) => {
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
      txn: data.txn
    });
  } catch (err) {
    console.log('dapdap error', err);
    onError?.();
  }
};
