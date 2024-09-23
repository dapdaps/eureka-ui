import Big from 'big.js';
import { uniqBy } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

import weth from '@/config/contract/weth';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import { usePriceStore } from '@/stores/price';
import { useSettingsStore } from '@/stores/settings';
import type { Token } from '@/types';

import getAggregatorTokens from '../utils/getAggregatorTokens';
import { getAggregatorsTx, getDappTx, getWrapTx, updateDappTx } from '../utils/getTxs';
import { useUpdateBalanceStore } from './useUpdateBalanceStore';

export default function useTrade({ chainId }: any) {
  const slippage: any = useSettingsStore((store: any) => store.slippage);
  const [tokens, setTokens] = useState<Token[]>();
  const [tokensLoading, setTokensLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [markets, setMarkets] = useState<any>([]);
  const [trade, setTrade] = useState<any>();
  const [bestTrade, setBestTrade] = useState<any>();
  const { provider, account } = useAccount();
  const toast = useToast();
  const { addAction } = useAddAction('superswap');
  const lastestCachedKey = useRef('');
  const prices = usePriceStore((store) => store.price);
  const cachedMarkets = useRef<any[]>([]);
  const cachedCount = useRef<number>(0);
  const [quoting, setQuoting] = useState(false);
  const { setUpdater } = useUpdateBalanceStore();

  const getTokens = useCallback(async () => {
    try {
      setTokensLoading(true);
      const tokens = await getAggregatorTokens(chainId);
      setTokens(tokens);
    } catch (err) {
      setTokens([]);
    } finally {
      setTokensLoading(false);
    }
  }, [chainId]);

  const onQuoter = async ({ inputCurrency, outputCurrency, inputCurrencyAmount }: any) => {
    if (!inputCurrency) return;
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
      setQuoting(true);
      setMarkets([]);

      const rawBalance = await provider.getBalance(account);
      const gasPrice = await provider.getGasPrice();

      if (wrapType) {
        const { txn, gas, isGasEnough } = await getWrapTx({
          wethAddress,
          wrapType,
          amount,
          rawBalance,
          gasPrice,
          inputCurrency,
          inputCurrencyAmount,
          outputCurrency
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

      cachedMarkets.current = [];
      cachedCount.current = 0;

      const onQuoterCallback = (_markets: any) => {
        setLoading(false);

        if (!cachedMarkets.current.length) {
          setBestTrade(_markets[0]);
          setTrade(
            _markets[0]
              ? { ..._markets[0], inputCurrency, inputCurrencyAmount, outputCurrency }
              : { noPair: true, inputCurrency, inputCurrencyAmount, outputCurrency }
          );
          setMarkets(_markets);
          cachedMarkets.current = _markets;
          cachedCount.current = 1;
          return;
        }
        if (Big(_markets[0].outputCurrencyAmount || 0).gt(cachedMarkets.current[0].outputCurrencyAmount || 0)) {
          setBestTrade(_markets[0]);
          setTrade(
            _markets[0]
              ? { ..._markets[0], inputCurrency, inputCurrencyAmount, outputCurrency }
              : { noPair: true, inputCurrency, inputCurrencyAmount, outputCurrency }
          );
        }

        setMarkets(
          uniqBy([..._markets, ...cachedMarkets.current], 'name').sort(
            (a: any, b: any) => b.outputCurrencyAmount - a.outputCurrencyAmount
          )
        );
        cachedMarkets.current = [];
        cachedCount.current = 0;
        setQuoting(false);
      };

      const onQuoterError = () => {
        if (cachedCount.current === 1) {
          setLoading(false);
          cachedCount.current = 0;
          cachedMarkets.current = [];
          setQuoting(false);
          return;
        }
        cachedCount.current = 1;
        setTrade({ noPair: true, inputCurrency, inputCurrencyAmount, outputCurrency });
      };

      getAggregatorsTx({
        inputCurrency,
        outputCurrency,
        inputCurrencyAmount,
        amount,
        slippage,
        account,
        rawBalance,
        gasPrice,
        prices,
        onCallBack: (_market: any) => {
          onQuoterCallback([_market]);
        },
        onError: onQuoterError
      });

      getDappTx({
        inputCurrency,
        outputCurrency,
        inputCurrencyAmount,
        rawBalance,
        gasPrice,
        slippage,
        account,
        prices,
        onCallBack: (_markets: any) => {
          onQuoterCallback(_markets);
        },
        onError: onQuoterError
      });
    } catch (err) {
      setTrade({
        inputCurrency,
        inputCurrencyAmount,
        outputCurrency,
        outputCurrencyAmount: '',
        noPair: true,
        txn: null,
        routerAddress: ''
      });
      setLoading(false);
      setMarkets([]);
    }
  };

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

  const onUpdateTxn = async (_trade: any) => {
    const rawBalance = await provider.getBalance(account);
    const gasPrice = await provider.getGasPrice();
    setLoading(true);
    updateDappTx({
      trade: _trade,
      slippage,
      account,
      rawBalance,
      gasPrice,
      prices,
      onSuccess: (record: any) => {
        setTrade(record);
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      }
    });
  };

  const onSelectMarket = async (market: any) => {
    setTrade(market);
  };

  useEffect(() => {
    if (chainId) getTokens();
  }, [chainId]);

  return {
    tokens,
    tokensLoading,
    loading,
    quoting,
    markets,
    trade,
    bestTrade,
    onQuoter,
    onSelectMarket,
    onSwap,
    setTrade,
    onUpdateTxn
  };
}
