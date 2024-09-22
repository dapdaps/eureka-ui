import Big from 'big.js';
import { useCallback, useRef, useState } from 'react';

import weth from '@/config/contract/weth';
import networks from '@/config/swap/networks';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import { usePriceStore } from '@/stores/price';
import { useSettingsStore } from '@/stores/settings';
import checkGas from '@/views/AllInOne/components/Trade/checkGas';
import formatTrade from '@/views/AllInOne/components/Trade/formatTrade';
import getWrapOrUnwrapTx from '@/views/AllInOne/components/Trade/getWrapOrUnwrapTx';

export default function useTrade({ chainId, template, onSuccess }: any) {
  const slippage: any = useSettingsStore((store: any) => store.slippage);
  const [loading, setLoading] = useState(false);
  const [trade, setTrade] = useState<any>();
  const { provider, account } = useAccount();
  const toast = useToast();
  const { addAction } = useAddAction('dapp');
  const lastestCachedKey = useRef('');
  const cachedTokens = useRef<any>();
  const prices = usePriceStore((store) => store.price);

  const onQuoter = useCallback(
    async ({ inputCurrency, outputCurrency, inputCurrencyAmount }: any) => {
      if (!inputCurrency || !outputCurrency || !inputCurrencyAmount) {
        setTrade(null);
        return;
      }
      const wethAddress = weth[inputCurrency.chainId];
      const wrapType =
        inputCurrency.isNative && outputCurrency.address === wethAddress
          ? 1
          : inputCurrency.address === wethAddress && outputCurrency.isNative
            ? 2
            : 0;

      const amount = Big(inputCurrencyAmount)
        .mul(10 ** inputCurrency.decimals)
        .toString();
      lastestCachedKey.current = `${inputCurrency.address}-${outputCurrency.address}-${inputCurrencyAmount}`;

      try {
        setLoading(true);

        const rawBalance = await provider.getBalance(account);
        const gasPrice = await provider.getGasPrice();

        if (wrapType) {
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

          setTrade({
            inputCurrency,
            inputCurrencyAmount,
            outputCurrency,
            outputCurrencyAmount: inputCurrencyAmount,
            noPair: false,
            txn,
            routerAddress: wethAddress,
            gas,
            isGasEnough
          });
          setLoading(false);

          return;
        }

        const response = await fetch('/dapdap/quoter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            params: JSON.stringify({
              template,
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
        if (!data) {
          throw new Error('No Data.');
        }
        if (`${inputCurrency.address}-${outputCurrency.address}-${inputCurrencyAmount}` === lastestCachedKey.current) {
          const _trade = {
            ...formatTrade({
              market: { ...data, template },
              rawBalance,
              gasPrice,
              prices,
              inputCurrency,
              outputCurrency,
              inputCurrencyAmount
            })
          };

          setTrade(_trade);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setTrade(null);
        setLoading(false);
      }
    },
    [account, provider, slippage, prices, cachedTokens, template]
  );

  const onSwap = useCallback(async () => {
    const signer = provider.getSigner(account);
    const wethAddress = weth[trade.inputCurrency.chainId];

    setLoading(true);
    let toastId = toast.loading({ title: 'Confirming...' });
    try {
      const tx = await signer.sendTransaction(trade.txn);
      toast.dismiss(toastId);
      toastId = toast.loading({ title: 'Pending...', tx: tx.hash, chainId });
      const { status, transactionHash } = await tx.wait();
      setLoading(false);
      toast.dismiss(toastId);

      if (status === 1) {
        toast.success({ title: `Swap successfully!`, tx: transactionHash, chainId });
        onSuccess?.();
      } else {
        toast.fail({ title: `Swap faily!` });
      }
      addAction({
        type: 'Swap',
        inputCurrencyAmount: trade.inputCurrencyAmount,
        inputCurrency: trade.inputCurrency,
        outputCurrencyAmount: trade.outputCurrencyAmount,
        outputCurrency: trade.outputCurrency,
        template: wethAddress === trade.routerAddress ? 'Wrap and Unwrap' : trade.name,
        status,
        transactionHash,
        add: 0,
        token_in_currency: trade.inputCurrency,
        token_out_currency: trade.outputCurrency
      });
      setLoading(false);
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.fail({
        title: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `Swap faily!`
      });
      console.log(err);
      setLoading(false);
    }
  }, [account, provider, trade]);

  return { loading, trade, onQuoter, onSwap };
}
