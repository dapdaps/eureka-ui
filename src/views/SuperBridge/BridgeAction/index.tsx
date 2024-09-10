import { useDebounce } from 'ahooks';
import Big from 'big.js';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import type { ExecuteRequest, QuoteRequest, QuoteResponse } from 'super-bridge-sdk';
import {
  execute,
  getAllToken,
  getBridgeMsg,
  getChainScan,
  getIcon,
  getQuote,
  getStatus,
  init,
  preloadResource
} from 'super-bridge-sdk';

import { usePreloadBalance } from '@/components/BridgeX/hooks/useTokensBalance';
import { saveTransaction } from '@/components/BridgeX/Utils';
import Tooltip from '@/components/TitleTooltip';
import allTokens from '@/config/bridge/allTokens';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import useToast from '@/hooks/useToast';
import type { Chain, Token } from '@/types';
import { addressFormated, balanceFormated, errorFormated, getFullNum, percentFormated } from '@/utils/balance';

import Advertise from '../Advertise';
import ChainTokenAmount from '../ChainTokenAmount';
import GasModal from '../ChainTokenAmount/GasModal';
import { useGasTokenHooks } from '../hooks/useGasTokenHooks';
import useQuote from '../hooks/useQuote';
import Medal from '../Medal';
import PublicTitle from '../PublicTitle';
import RouteSelected from '../RouteSelected';
import SubmitBtn from '../SubmitBtn';
import ConfirmModal from '../SubmitBtn/ConfirmModal';
import ConfirmSuccessModal from '../SubmitBtn/ConfirmSuccessModal';
import Transaction from '../Transaction';
import SettingModal from './SettingModal';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  padding-top: 80px;
`;

const RightContainer = styled.div`
  width: 414px;
`;

const Container = styled.div`
  color: #ffffff;
  width: 800px;
  min-height: 523px;
  border-radius: 16px;
  border: 1px solid rgba(55, 58, 83, 1);
  background: rgba(38, 40, 54, 1);
  padding: 26px 60px;
`;

const Setting = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid rgba(55, 58, 83, 1);
  background-color: rgba(46, 49, 66, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  &:hover {
    border: 1px solid rgba(235, 244, 121, 0.3);
  }
`;

const Sep = styled.div<{ height?: number }>`
  height: ${({ height = 12 }) => `${height}px`};
`;

const ArrowSwap = styled.div`
  position: relative;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  .arrow {
    position: absolute;
    width: 34px;
    height: 34px;
    border: 4px solid rgba(38, 40, 54, 1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: rgba(46, 49, 66, 1);
  }
`;

interface Props {
  chainList: Chain[];
  onTransactionUpdate: () => void;
}

let preLoadRsource = false;

export default function BirdgeAction({ chainList, onTransactionUpdate }: Props) {
  const [settingModalShow, setSettingModalShow] = useState<boolean>(false);
  const [confirmModalShow, setConfirmModalShow] = useState<boolean>(false);
  const [confirmSuccessModalShow, setConfirmSuccessModalShow] = useState<boolean>(false);
  const { account, chainId, provider } = useAccount();
  const [isFresh, setIsfresh] = useState(true);
  // const [chainToken, setChainToken] = useState<any>({})
  const [fromChain, setFromChain] = useState<Chain>(chainList[0]);
  const [toChain, setToChain] = useState<Chain>(chainList[1]);
  const [fromToken, setFromToken] = useState<Token>();
  const [toToken, setToToken] = useState<Token>();
  const [sendAmount, setSendAmount] = useState('');
  const [updateBanlance, setUpdateBanlance] = useState(1);
  const [reciveAmount, setReciveAmount] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<QuoteResponse | null>(null);
  const [identification, setIdentification] = useState(Date.now());
  const [routeSortType, setRouteSortType] = useState(1);
  const [sendDisabled, setSendDisabled] = useState<boolean>(false);
  const [disableText, setDisableText] = useState<string>('Bridge');
  const [gasModalShow, setGasModalShow] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const router = useRouter();
  usePreloadBalance(allTokens, account);

  const inputValue = useDebounce(sendAmount, { wait: 500 });

  const { addAction } = useAddAction('dapp');
  const { fail, success } = useToast();
  const [quoteReques, setQuoteRequest] = useState<QuoteRequest | null>(null);
  const { routes, loading, quoteLoading } = useQuote(quoteReques, identification);

  // console.log('routes:', routes)

  const { balance } = useTokenBalance({
    currency: fromToken,
    updater: 1,
    isNative: fromChain?.nativeCurrency.symbol === fromToken?.symbol,
    isPure: false
  });

  const { isSupported, price } = useGasTokenHooks({
    fromChain,
    fromToken,
    toChain
  });

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
    setIsfresh(true);
    setIdentification(identification);
    setQuoteRequest({
      fromChainId: fromChain?.chainId.toString(),
      toChainId: toChain?.chainId.toString(),
      fromToken: {
        address: fromToken?.address as string,
        symbol: fromToken?.symbol as string,
        decimals: fromToken?.decimals as number
      },
      toToken: {
        address: toToken?.address as string,
        symbol: toToken?.symbol as string,
        decimals: toToken?.decimals as number
      },
      fromAddress: account as string,
      destAddress: account as string,
      amount: new Big(inputValue).mul(10 ** fromToken?.decimals),
      identification,
      exclude: ['official']
    });
  }, [fromChain, toChain, fromToken, toToken, account, inputValue]);

  useEffect(() => {
    if (!fromChain || !toChain || !fromToken || !toToken || !account || !inputValue) {
      setSendDisabled(true);
      setDisableText('Bridge');
      return;
    }

    if (Number(inputValue) <= 0) {
      setSendDisabled(true);
      setDisableText('Bridge');
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
    setDisableText('Bridge');
  }, [fromChain, toChain, fromToken, toToken, account, inputValue, balance, routes]);

  useEffect(() => {
    if (selectedRoute && toToken) {
      const reciveAmount = new Big(selectedRoute.receiveAmount).div(10 ** toToken.decimals).toNumber();
      setReciveAmount(getFullNum(reciveAmount));
    } else {
      setReciveAmount('');
    }
  }, [selectedRoute, toToken]);

  useEffect(() => {
    if (router?.query) {
      const { fromChainId, toChainId, fromToken, toToken } = router.query;
      if (fromChainId) {
        const fromChain = chainList.filter((chain) => chain.chainId === Number(fromChainId));
        if (fromChain && fromChain.length) {
          setFromChain(fromChain[0]);
        }

        if (fromToken) {
          const tokenList = allTokens[Number(fromChainId)];
          const filterFromToken = tokenList.filter((token) => token.symbol === fromToken);
          if (filterFromToken && filterFromToken.length) {
            setFromToken(filterFromToken[0]);
          }
        }
      }

      if (toChainId) {
        const toChain = chainList.filter((chain) => chain.chainId === Number(toChainId));
        if (toChain && toChain.length) {
          setToChain(toChain[0]);
        }

        if (toToken) {
          const tokenList = allTokens[Number(toChainId)];
          const filterToToken = tokenList.filter((token) => token.symbol === toToken);
          if (filterToToken && filterToToken.length) {
            setToToken(filterToToken[0]);
          }
        }
      }
    }
  }, [chainList, router]);

  useEffect(() => {
    if (!preLoadRsource) {
      preloadResource();
      preLoadRsource = true;
    }
  }, [chainList, router]);

  return (
    <Wrapper>
      <Container>
        <PublicTitle
          title={
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="23" fill="none">
                <path
                  fill="#EBF479"
                  d="M.855 9.962 11.009.415c.795-.748 2.043.14 1.598 1.137L9.75 7.942a1 1 0 0 0 .807 1.403l4.754.506c.864.092 1.208 1.167.557 1.743L3.535 22.52c-.837.741-2.075-.242-1.542-1.226l4.16-7.672a1 1 0 0 0-.763-1.47l-3.967-.468a1 1 0 0 1-.568-1.721"
                ></path>
              </svg>
              Super Bridge
              <Tooltip content="Super Bridge aggregates top-tier bridges in one intuitive interface, offering smart-routing for optimal fees and speed. Each bridge transaction on DapDap helps earn you medals, rewarding your cross-chain activity! Seamlessly transfer your assets across 17+ networks with real-time tracking and data support." />
            </>
          }
          subTitle="Transfer assets between Ethereum and EVM L2s."
          renderAction={() => (
            <Setting
              onClick={() => {
                setSettingModalShow(true);
              }}
            >
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.17184 0.222355C7.42364 0.0766877 7.70926 0 8 0C8.29074 0 8.57637 0.0766877 8.82816 0.222355L15.1718 3.89274C15.4236 4.03841 15.6327 4.24792 15.7781 4.50021C15.9235 4.75251 16 5.0387 16 5.33003V12.67C16 12.9613 15.9235 13.2475 15.7781 13.4998C15.6327 13.7521 15.4236 13.9616 15.1718 14.1073L8.82816 17.7776C8.57637 17.9233 8.29074 18 8 18C7.70926 18 7.42364 17.9233 7.17184 17.7776L0.828158 14.1073C0.576372 13.9616 0.367286 13.7521 0.221915 13.4998C0.0765431 13.2475 7.38473e-06 12.9613 0 12.67V5.33003C7.38473e-06 5.0387 0.0765431 4.75251 0.221915 4.50021C0.367286 4.24792 0.576372 4.03841 0.828158 3.89274L7.17184 0.222355ZM8 1.65964L1.65632 5.33003V12.67L8 16.3404L14.3437 12.67V5.33003L8 1.65964ZM8 5.68064C8.87856 5.68064 9.72115 6.03035 10.3424 6.65286C10.9636 7.27536 11.3126 8.11965 11.3126 9C11.3126 9.88035 10.9636 10.7246 10.3424 11.3471C9.72115 11.9696 8.87856 12.3194 8 12.3194C7.12144 12.3194 6.27886 11.9696 5.65762 11.3471C5.03638 10.7246 4.68737 9.88035 4.68737 9C4.68737 8.11965 5.03638 7.27536 5.65762 6.65286C6.27886 6.03035 7.12144 5.68064 8 5.68064ZM8 7.34032C7.78249 7.34032 7.56711 7.38325 7.36616 7.46665C7.1652 7.55006 6.98261 7.67231 6.82881 7.82643C6.67501 7.98054 6.553 8.16351 6.46977 8.36487C6.38653 8.56623 6.34369 8.78205 6.34369 9C6.34369 9.21795 6.38653 9.43377 6.46977 9.63513C6.553 9.8365 6.67501 10.0195 6.82881 10.1736C6.98261 10.3277 7.1652 10.4499 7.36616 10.5333C7.56711 10.6168 7.78249 10.6597 8 10.6597C8.43928 10.6597 8.86057 10.4848 9.17119 10.1736C9.48181 9.86232 9.65631 9.44018 9.65631 9C9.65631 8.55983 9.48181 8.13768 9.17119 7.82643C8.86057 7.51518 8.43928 7.34032 8 7.34032Z"
                  fill="#979ABE"
                />
              </svg>
            </Setting>
          )}
        />
        <ChainTokenAmount
          onChainChange={(chain: Chain) => {
            setFromChain(chain);
          }}
          onTokenChange={(token: Token) => {
            setFromToken(token);
          }}
          onAmountChange={(value) => {
            setSendAmount(value);
          }}
          updateBanlance={updateBanlance}
          currentChain={fromChain}
          currentToken={fromToken}
          chainToken={allTokens}
          title="From"
          needGas={false}
          amount={sendAmount}
          address={addressFormated(account as string)}
          chainList={chainList}
        />
        <ArrowSwap
          onClick={() => {
            const [_toChain, _fromChain] = [fromChain, toChain];
            const [_toToken, _fromToken] = [fromToken, toToken];

            setFromChain(_fromChain);
            setToChain(_toChain);
            setFromToken(_fromToken);
            setToToken(_toToken);
          }}
        >
          <div className="arrow">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.49992 1V11.5M6.49992 11.5L1 6M6.49992 11.5L12 6"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </ArrowSwap>
        <ChainTokenAmount
          onChainChange={(chain: Chain) => {
            setToChain(chain);
          }}
          onTokenChange={(token: Token) => {
            setToToken(token);
          }}
          inputDisabled
          updateBanlance={updateBanlance}
          needGas={isSupported}
          currentChain={toChain}
          currentToken={toToken}
          chainToken={allTokens}
          amount={reciveAmount}
          limitChain={fromChain}
          onGasTrigger={() => {
            setGasModalShow(true);
          }}
          title="To"
          address={addressFormated(account as string)}
          chainList={chainList}
        />
        <Sep height={20} />
        <SubmitBtn
          isLoading={loading}
          text={disableText}
          fromChain={fromChain}
          onClick={() => {
            if (selectedRoute) {
              setConfirmModalShow(true);
              setIsfresh(false);
            }
          }}
          disabled={sendDisabled}
        />

        <Transaction updater={updateBanlance} />

        {settingModalShow && (
          <SettingModal
            onSortTypeChange={(val) => {
              setRouteSortType(val);
            }}
            routeSortType={routeSortType}
            onClose={() => {
              setSettingModalShow(false);
            }}
          />
        )}

        {confirmModalShow && (
          <ConfirmModal
            fromChain={fromChain}
            toChain={toChain}
            fromToken={fromToken}
            toToken={toToken}
            amount={inputValue}
            reciveAmount={reciveAmount}
            toAddress={account as string}
            route={selectedRoute}
            onClose={() => {
              setConfirmModalShow(false);
            }}
            isLoading={isSending}
            onClick={async () => {
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
                    status: 3
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
                    extra_data: actionParams
                  });

                  success({
                    title: 'Transaction success',
                    text: ''
                  });

                  setConfirmSuccessModalShow(true);
                  setConfirmModalShow(false);

                  setUpdateBanlance(updateBanlance + 1);
                  // onTransactionUpdate && onTransactionUpdate()
                } catch (err: any) {
                  console.log(err.title, err.message, err);
                  fail({
                    title: 'Transaction failed',
                    text: errorFormated(err)
                  });
                }
                setIsSending(false);
              }
            }}
          />
        )}

        {confirmSuccessModalShow && (
          <ConfirmSuccessModal
            fromChain={fromChain}
            toChain={toChain}
            fromToken={fromToken}
            toToken={toToken}
            amount={inputValue}
            reciveAmount={reciveAmount}
            toAddress={account as string}
            route={selectedRoute}
            onClose={() => {
              setConfirmSuccessModalShow(false);
            }}
            onTransactionClick={() => {}}
            isLoading={isSending}
            onClick={async () => {
              setConfirmSuccessModalShow(false);
            }}
          />
        )}

        {gasModalShow && (
          <GasModal
            price={price}
            fromChain={fromChain}
            fromToken={fromToken}
            toChain={toChain}
            toAddress={account as string}
            maxBalance={balance}
            onClick={() => {
              setUpdateBanlance(updateBanlance + 1);
            }}
            onClose={() => {
              setGasModalShow(false);
            }}
          />
        )}
      </Container>
      <RightContainer>
        {
          <RouteSelected
            quoteLoading={quoteLoading}
            fromChain={fromChain}
            routeSortType={routeSortType}
            onRouteSelected={(route: QuoteResponse | null) => {
              if (!confirmModalShow) {
                setSelectedRoute(route);
              }
            }}
            stopSelected={!isFresh}
            updateFresh={() => setIsfresh(false)}
            toToken={toToken}
            routes={routes}
          />
        }

        <Advertise />
      </RightContainer>
    </Wrapper>
  );
}
