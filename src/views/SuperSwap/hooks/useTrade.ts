import { useCallback, useEffect, useRef, useState } from 'react';
import { intersection } from 'lodash';
import Big from 'big.js';
import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import useAddAction from '@/hooks/useAddAction';
import { useSettingsStore } from '@/stores/settings';
import { usePriceStore } from '@/stores/price';
import networks from '@/config/swap/networks';
import weth from '@/config/contract/weth';
import getWrapOrUnwrapTx from '../getWrapOrUnwrapTx';
import checkGas from '../checkGas';
import formatTrade from '../formatTrade';
import type { Token } from '@/types';
import { useUpdateBalanceStore } from './useUpdateBalanceStore';

export default function useTrade({ chainId }: any) {
  const slippage: any = useSettingsStore((store: any) => store.slippage);
  const [tokens, setTokens] = useState<Token[]>();
  const [loading, setLoading] = useState(false);
  const [markets, setMarkets] = useState<any>([]);
  const [trade, setTrade] = useState<any>();
  const [bestTrade, setBestTrade] = useState<any>();
  const { provider, account } = useAccount();
  const toast = useToast();
  const { addAction } = useAddAction('all-in-one');
  const lastestCachedKey = useRef('');
  const cachedTokens = useRef<any>();
  const prices = usePriceStore((store) => store.price);
  const { setUpdater } = useUpdateBalanceStore()
  const getTokens = useCallback(() => {
    const network = networks[chainId];
    if (!network) return;
    const dexs = Object.values(network.dexs);
    const _tokens: { [key: string]: any } = {};
    dexs.forEach((dex: any) => {
      dex.tokens.forEach((token: any) => {
        const _dexs = _tokens[token?.address]?.dexs || [];
        _dexs.push(dex.name);
        _tokens[token?.address] = { ...token, dexs: _dexs };
      });
    });
    setTokens(Object.values(_tokens));
    cachedTokens.current = _tokens;
  }, [chainId]);

  const onQuoter = useCallback(
    async ({ inputCurrency, outputCurrency, inputCurrencyAmount }: any) => {
      if (!inputCurrency) return
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
        setMarkets([]);

        const rawBalance = await provider.getBalance(account);
        const gasPrice = await provider.getGasPrice();

        if (wrapType) {
          const signer = provider.getSigner(account);
          const { txn, gasLimit } = await getWrapOrUnwrapTx({
            signer,
            wethAddress,
            type: wrapType,
            amount,
          });

          const { isGasEnough, gas } = checkGas({
            rawBalance,
            gasPrice,
            gasLimit,
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
            isGasEnough,
            wrapType
          });
          setLoading(false);
          setMarkets([]);
          return;
        }

        const inputCurrencyDexs = inputCurrency.dexs || cachedTokens.current?.[inputCurrency.address].dexs || [];
        const outputCurrencyDexs = outputCurrency.dexs || cachedTokens.current?.[outputCurrency.address].dexs || [];

        const templates = intersection(inputCurrencyDexs, outputCurrencyDexs);

        if (!templates.length) {
          setLoading(false);
          return { noPair: true, txn: null, outputCurrencyAmount: '', routerAddress: '' };
        }
        const response = await fetch('https://api.dapdap.net/quoter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            params: JSON.stringify({
              templates,
              inputCurrency,
              outputCurrency,
              inputAmount: inputCurrencyAmount,
              slippage: slippage / 100 || 0.005,
              account,
            }),
          }),
        });
        const result = await response.json();
        const data = result.data;
        if (!data) {
          throw new Error('No Data.');
        }
        const network = networks[inputCurrency.chainId];
        const dexs = network.dexs;
        const _markets = data
          .filter((item: any) => item.txn && item.outputCurrencyAmount)
          .sort((a: any, b: any) => b.outputCurrencyAmount - a.outputCurrencyAmount)
          .map((item: any) => {
            const _trade = formatTrade({
              market: item,
              rawBalance,
              gasPrice,
              prices,
              inputCurrency,
              outputCurrency,
              inputCurrencyAmount,
            });
            return { ..._trade, name: item.template, logo: dexs[item.template].logo };
          });
        setBestTrade(_markets[0]);
        setTrade({ ..._markets[0], inputCurrency, inputCurrencyAmount, outputCurrency });
        setMarkets(_markets);
        setLoading(false);
      } catch (err) {
        console.log(err, 'useTrade - onQuoter');
        setTrade({
          inputCurrency,
          inputCurrencyAmount,
          outputCurrency,
          outputCurrencyAmount: '',
          noPair: true,
          txn: null,
          routerAddress: '',
        });
        setLoading(false);
        setMarkets([]);
      }
    },
    [account, provider, slippage, prices, cachedTokens],
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
        setUpdater(Date.now());
        toast.success({ title: `Swap successfully!`, tx: transactionHash, chainId });
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
        token_out_currency: trade.outputCurrency,
      });
      setLoading(false);
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.fail({
        title: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `Swap faily!`,
      });
      console.log(err);
      setLoading(false);
    }
  }, [account, provider, trade]);

  const onSelectMarket = async (market: any) => {
    setTrade(market);
  };

  useEffect(() => {
    if (chainId) getTokens();
  }, [chainId]);

  return { tokens, loading, markets, trade, bestTrade, onQuoter, onSelectMarket, onSwap, setTrade };
}
