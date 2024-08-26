import { useDebounce } from 'ahooks';
import Big from 'big.js';
import { useCallback, useEffect, useState } from "react";
import type { ExecuteRequest, QuoteRequest, QuoteResponse } from 'super-bridge-sdk';
import { execute, getAllToken, getBridgeMsg, getChainScan, getIcon, getQuote, getStatus, init } from 'super-bridge-sdk';

import { saveTransaction } from '@/components/BridgeX/Utils';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import useToast from '@/hooks/useToast';
import type { Chain, Token } from "@/types";
import { addressFormated, balanceFormated, errorFormated, getFullNum, percentFormated } from '@/utils/balance';

import useQuote from '../hooks/useQuote';
import useRouteSorted from "./useRouteSorted";

interface BridgeProps {
  originFromChain: Chain;
  originToChain: Chain;
  derection: number;
  account?: string | undefined;
  defaultBridgeText: string;
}

export default function useBridge({
  originFromChain,
  originToChain,
  derection,
  defaultBridgeText,
}: BridgeProps) {
  const [fromChain, setFromChain] = useState(originFromChain)
  const [toChain, setToChain] = useState(originToChain)

  const { account, chainId, provider } = useAccount();
  const [fromToken, setFromToken] = useState<Token>();
  const [toToken, setToToken] = useState<Token>();
  const [sendAmount, setSendAmount] = useState('');
  const [updateBanlance, setUpdateBanlance] = useState(1);
  const [reciveAmount, setReciveAmount] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<QuoteResponse | null>(null);
  const [identification, setIdentification] = useState(Date.now());
  const [routeSortType, setRouteSortType] = useState(1);
  const [sendDisabled, setSendDisabled] = useState<boolean>(false);
  const [disableText, setDisableText] = useState<string>(defaultBridgeText);
  const [isSending, setIsSending] = useState<boolean>(false);

  const { balance } = useTokenBalance({
    currency: fromToken,
    updater: 1,
    isNative: fromChain?.nativeCurrency.symbol === fromToken?.symbol,
    isPure: false,
  });

  const inputValue = useDebounce(sendAmount, { wait: 500 });

  const { addAction } = useAddAction('dapp');
  const { fail, success } = useToast();
  const [quoteReques, setQuoteRequest] = useState<QuoteRequest | null>(null);

  const { routes, loading } = useQuote(quoteReques, identification, false);

  useRouteSorted(routes, 1, (route: QuoteResponse | null) => {
    setSelectedRoute(route)
  })

  useEffect(() => {
    // const [_fromChain, _toChain] = [toChain, fromChain]
    // const [_fromToken, _toToken] = [toToken, fromToken]
    // setFromChain(_fromChain)
    // setToChain(_toChain)
    // setFromToken(_fromToken)
    // setToToken(_toToken)
  }, [derection])

  useEffect(() => {
    if (!fromChain || !toChain || !fromToken || !toToken || !account || !inputValue) {
      return;
    }

    if (Number(inputValue) <= 0) {
      return;
    }

    if (fromChain === toChain && fromToken === toToken) {
      return;
    }

    setReciveAmount('');
    setSelectedRoute(null);

    const identification = Date.now();
    setIdentification(identification);
    setQuoteRequest({
      fromChainId: fromChain?.chainId.toString(),
      toChainId: toChain?.chainId.toString(),
      fromToken: {
        address: fromToken?.address as string,
        symbol: fromToken?.symbol as string,
        decimals: fromToken?.decimals as number,
      },
      toToken: {
        address: toToken?.address as string,
        symbol: toToken?.symbol as string,
        decimals: toToken?.decimals as number,
      },
      fromAddress: account as string,
      destAddress: account as string,
      amount: new Big(inputValue).mul(10 ** fromToken?.decimals),
      identification,
      exclude: ['official'],
    });
  }, [fromChain, toChain, fromToken, toToken, account, inputValue]);


  useEffect(() => {
    if (!fromChain || !toChain || !fromToken || !toToken || !account || !inputValue) {
      setSendDisabled(true);
      setDisableText(defaultBridgeText);
      return;
    }

    if (Number(inputValue) <= 0) {
      setSendDisabled(true);
      setDisableText(defaultBridgeText);
      return;
    }

    if (balance && Number(inputValue) > Number(balance)) {
      setSendDisabled(true);
      setDisableText('Insufficient balance');
      return;
    }

    if (!routes?.length) {
      setSendDisabled(true);
      setDisableText('No route');
      return;
    }

    setSendDisabled(false);
    setDisableText(defaultBridgeText);
  }, [fromChain, toChain, fromToken, toToken, account, inputValue, balance, routes, defaultBridgeText]);

  useEffect(() => {
    if (selectedRoute && toToken) {
      const reciveAmount = new Big(selectedRoute.receiveAmount).div(10 ** toToken.decimals).toNumber();
      setReciveAmount(getFullNum(reciveAmount));
    } else {
      setReciveAmount('');
    }
  }, [selectedRoute, toToken]);

  const executeRoute = async () => {
    if (selectedRoute && !isSending) {
      setIsSending(true);
      try {
        const txHash = await execute(selectedRoute, provider?.getSigner());

        if (!txHash) {
          return;
        }

        const actionParams = {
          hash: txHash,
          link: getChainScan(fromChain.chainId),
          duration: selectedRoute.duration,
          fromChainId: fromChain.chainId,
          fromChainName: fromChain.chainName,
          fromChainLogo: fromChain.icon,
          fromTokenLogo: fromToken?.icon,
          fromAmount: inputValue,
          fromTokenSymbol: fromToken?.symbol,
          toChainId: toChain.chainId,
          toChainName: toChain.chainName,
          toChainLogo: toChain.icon,
          toTokenLogo: toToken?.icon,
          toAmout: reciveAmount,
          toTokenSymbol: toToken?.symbol,
          time: Date.now(),
          tool: selectedRoute.bridgeName,
          bridgeType: selectedRoute.bridgeType,
          fromAddress: account,
          toAddress: account,
          status: 3,
        };

        saveTransaction(actionParams);

        addAction({
          type: 'Bridge',
          fromChainId: fromChain.chainId,
          toChainId: toChain.chainId,
          token: fromToken,
          amount: inputValue,
          template: 'super bridge',
          add: false,
          status: 1,
          transactionHash: txHash,
          extra_data: actionParams,
        });

        success({
          title: 'Transaction success',
          text: '',
        });

        //   setConfirmSuccessModalShow(true);
        //   setConfirmModalShow(false);

        //   setUpdateBanlance(updateBanlance + 1);
        //   onTransactionUpdate && onTransactionUpdate();
        setIsSending(false);
        return true
      } catch (err: any) {
        console.log(err.title, err.message, err);
        fail({
          title: 'Transaction failed',
          text: errorFormated(err),
        });
      }
      setIsSending(false);
      return false
    }
  }

  return {
    fromChain,
    setFromChain,
    toChain,
    setToChain,
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    sendAmount,
    onSendAmountChange: setSendAmount,
    updateBanlance,
    reciveAmount,
    identification,
    routeSortType,
    sendDisabled,
    disableText,
    isSending,
    loading,
    selectedRoute,
    executeRoute,
  }
}