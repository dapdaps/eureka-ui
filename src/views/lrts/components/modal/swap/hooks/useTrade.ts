import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { useSettingsStore } from '@/stores/settings';
import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import useAddAction from '@/hooks/useAddAction';

function getTokenAddress(token: any) {
  return token.isNative ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : token.address;
}

export default function useTrade(inputCurrency: any, outputCurrency: any) {
  const [inputAmount, setInputAmount] = useState('');
  const [trade, setTrade] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const slippage = useSettingsStore((store: any) => store.slippage);
  const optionsRef = useRef<any>();
  const { account, chainId, provider } = useAccount();
  const toast = useToast();
  const { addAction } = useAddAction('lrts');

  const quoter = useCallback(async () => {
    setLoading(true);
    try {
      const amount = Big(inputAmount).mul(1e18).toFixed(0);
      const response = await fetch(
        `https://api.paraswap.io/swap/?srcToken=${getTokenAddress(inputCurrency)}&destToken=${getTokenAddress(
          outputCurrency,
        )}&network=${inputCurrency.chainId}&srcDecimals=${inputCurrency.decimals}&destDecimals=${
          outputCurrency.decimals
        }&amount=${amount}&side=SELL&version=6.2&slippage=${slippage * 1e2}&userAddress=${account}`,
      );
      const result = await response.json();
      if (!result || !result.priceRoute) throw Error('');
      const outputAmount = Big(result.priceRoute.destAmount).div(1e18).toString();

      setTrade({
        outputAmount,
        cost: result.priceRoute.gasCostUSD,
      });
      optionsRef.current = result.txParams;
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setTrade(null);
    }
  }, [inputAmount, inputCurrency, outputCurrency]);

  const swap = async () => {
    setLoading(true);
    let toastId = toast.loading({ title: 'Confirming...' });
    try {
      const signer = provider.getSigner(account);
      const tx = await signer.sendTransaction(optionsRef.current);
      toast.dismiss(toastId);
      toastId = toast.loading({ title: 'Pending...', tx: tx.hash, chainId });
      const { status, transactionHash } = await tx.wait();
      setLoading(false);
      toast.dismiss(toastId);

      if (status === 1) {
        toast.success({ title: `Swap successfully!`, tx: transactionHash, chainId });
      } else {
        toast.fail({ title: `Swap faily!` });
      }

      addAction({
        type: 'Swap',
        inputCurrencyAmount: inputAmount,
        inputCurrency: inputCurrency,
        outputCurrencyAmount: trade.outputAmount,
        outputCurrency: outputCurrency,
        template: 'LRTS',
        status,
        transactionHash,
        add: 0,
        token_in_currency: inputCurrency,
        token_out_currency: outputCurrency,
      });
      setLoading(false);
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.fail({
        title: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `Swap faily!`,
      });
      setLoading(false);
    }
  };

  const { run: runQuoter } = useDebounceFn(
    () => {
      quoter();
    },
    {
      wait: 500,
    },
  );

  useEffect(() => {
    if (!inputAmount) return;
    runQuoter();
  }, [inputAmount, outputCurrency]);

  return {
    trade,
    loading,
    inputAmount,
    setInputAmount,
    quoter,
    swap,
  };
}
