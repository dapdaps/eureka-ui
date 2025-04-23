import { useDebounce } from 'ahooks';
import Big from 'big.js';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { preloadResource } from 'super-bridge-sdk';

import Loading from '@/components/Icons/Loading';
import allTokens from '@/config/bridge/allTokens';
import useAccount from '@/hooks/useAccount';
import useConnectWallet from '@/hooks/useConnectWallet';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import useToast from '@/hooks/useToast';
import { balanceFormated, errorFormated, getFullNum } from '@/utils/balance';

import activity from './activity';
import Alert from './components/Alert';
import ChainSelector from './components/ChainSelector';
import Confirm from './components/Confirm';
import FeeMsg from './components/FeeMsg';
import Token from './components/Token';
import Transaction from './components/Transaction';
import { usePreloadBalance } from './hooks/useTokensBalance';
import { addressFormated, isNumeric, report, saveTransaction } from './Utils';

const BridgePanel = styled.div`
  width: 478px;
  margin: 80px auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BridgeIcon = styled.div`
  height: 28px;
  overflow: hidden;
  img {
    height: 100%;
  }
`;

const BridgeName = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin-left: 10px;
`;

const Content = styled.div`
  border: 1px solid #373a53;
  border-radius: 16px;
  background: #262836;
  margin-top: 30px;
  padding: 16px;
  position: relative;
`;

const Body = styled.div`
  margin-top: 30px;
`;

const MainTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  color: #fff;
  padding-top: 10px;
`;

const ChainPairs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  gap: 10px;
`;

const ChainArrow = styled.div`
  cursor: pointer;
`;

const TokenSpace = styled.div<any>`
  height: ${(props: any) => {
    return props.height ? props.height : '6px';
  }};
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TransformArrow = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: #2e3142;
  border: 4px solid rgba(38, 40, 54, 1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitBtn = styled.button`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 48px;
  width: 100%;
  line-height: 48px;
  text-align: center;
  border-radius: 8px;
  color: #fff;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
`;

let quoteParam: any = null;

const toolMap: any = {
  mode: 'official',
  blast: 'official',
  scroll: 'official'
};

export default function BridgeX({
  icon,
  name,
  color,
  tool,
  template,
  account,
  chainList,
  getQuote,
  getBridgeToken,
  getStatus,
  prices,
  currentChainId,
  setChain,
  fromChainId,
  toChainId,
  execute,
  getChainScan,
  addAction,
  onSuccess,
  dapp,
  style,
  disabledChain = false,
  disabledToToken = false,
  tokenPairs = [],
  card = false,
  disabledToChain = false,
  showHeader = true
}: any) {
  const { fail, success } = useToast();
  const [updater, setUpdater] = useState(1);
  const [filterChainList, setFilterChainList] = useState(chainList);
  const [chainFrom, setChainFrom] = useState<any>(null);
  const [chainTo, setChainTo] = useState<any>(null);
  // const [allTokens, setAllTokens] = useState<any>({})
  const [loadedAllTokens, setLoadedAllTokens] = useState(true);
  const [otherAddressChecked, setOtherAddressChecked] = useState(false);
  const [inputTokens, setInputTokens] = useState<any[]>([]);
  const [bridgeTokens, setBridgeTokens] = useState<any[] | null>(null);
  const [outputTokens, setOutputTokens] = useState<any[]>([]);
  const [selectInputToken, setSelectInputToken] = useState<any>(null);
  const [selectOutputToken, setSelectOutputToken] = useState<any>(null);
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [gasCostUSD, setGasCostUSD] = useState('');
  const [feeCostUSD, setFeeCostUSD] = useState('');
  const [fromUSD, setFromUSD] = useState('');
  const [toUSD, setToUSD] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [route, setRoute] = useState<any>(null);
  const [canRoute, setCanRoute] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendingDisabeld, setSendingDisabeld] = useState(false);
  const [btnText, setBtnText] = useState('Send');
  const [transactionList, setTransactionList] = useState([]);
  const [transitionUpdate, setTransitionUpdate] = useState(Date.now());
  const [timeOut, setXTimeOut] = useState(null);
  const [isSendingDisabled, setIsSendingDisabled] = useState(false);
  const newestIdentification = useRef(Date.now());
  const containerDom = useRef(null);

  const { chainId, provider } = useAccount();
  const { onConnect } = useConnectWallet();

  const { balance: inputBalance, loading: inputBalanceLoading } = useTokenBalance({
    currency: selectInputToken,
    updater,
    isNative: chainFrom?.nativeCurrency.symbol === selectInputToken?.symbol,
    isPure: false
  });

  const { balance: outputBalance, loading: outputBalanceLoading } = useTokenBalance({
    currency: selectOutputToken,
    updater,
    isNative: chainTo?.nativeCurrency.symbol === selectOutputToken?.symbol,
    isPure: false
  });

  const inputValue = useDebounce(sendAmount, { wait: 500 });

  usePreloadBalance(allTokens, account);

  useEffect(() => {
    preloadResource(tool);
  }, [tool]);

  useEffect(() => {
    let _chainFrom, _chainTo;
    if (fromChainId) {
      _chainFrom = filterChainList.filter((chain: any) => chain.chainId === parseInt(fromChainId))[0];
    } else {
      _chainFrom = filterChainList[0];
    }

    if (toChainId) {
      _chainTo = filterChainList.filter((chain: any) => chain.chainId === parseInt(toChainId))[0];
    } else {
      _chainTo = filterChainList[1];
    }
    setChainFrom(_chainFrom);
    setChainTo(_chainTo);
  }, [filterChainList]);

  useEffect(() => {
    getBridgeToken(tool).then((res: any) => {
      setBridgeTokens(res);
    });
  }, [tool]);

  useEffect(() => {
    if (loadedAllTokens && chainFrom) {
      const allChainTokens = allTokens[chainFrom?.chainId];
      if (bridgeTokens && allChainTokens) {
        const allBridgeChainTokens = bridgeTokens[chainFrom?.chainId];
        const _newTokens: any[] = [];
        allChainTokens?.forEach((element: any) => {
          const has = allBridgeChainTokens?.some(
            (item: any) => item.address.toUpperCase() === element.address.toUpperCase()
          );
          if (has) {
            if (tool === 'orbiter') {
              let extendToken = {};
              if (
                element.symbol.toUpperCase().indexOf('USDC') > -1 ||
                element.symbol.toUpperCase().indexOf('USDBC') > -1
              ) {
                extendToken = {
                  symbol: 'USDC',
                  name: element.symbol
                };
              }
              _newTokens.push({
                ...element,
                ...extendToken
              });
            } else {
              _newTokens.push(element);
            }
          }
        });
        setInputTokens(_newTokens);
      } else {
        setInputTokens(allChainTokens);
      }

      setSelectInputToken(null);
    }
  }, [chainFrom, loadedAllTokens, allTokens, bridgeTokens, tool]);

  useEffect(() => {
    if (loadedAllTokens && chainTo) {
      const allChainTokens = allTokens[chainTo?.chainId];
      if (bridgeTokens) {
        const allBridgeChainTokens = bridgeTokens[chainTo?.chainId];
        const _newTokens: any[] = [];
        allChainTokens?.forEach((element: any) => {
          const has = allBridgeChainTokens?.some(
            (item: any) => item.address.toUpperCase() === element.address.toUpperCase()
          );
          if (has) {
            if (tool === 'orbiter') {
              let extendToken = {};
              if (
                element.symbol.toUpperCase().indexOf('USDC') > -1 ||
                element.symbol.toUpperCase().indexOf('USDBC') > -1
              ) {
                extendToken = {
                  symbol: 'USDC',
                  name: element.symbol
                };
              }
              _newTokens.push({
                ...element,
                ...extendToken
              });
            } else {
              _newTokens.push(element);
            }
          }
        });
        setOutputTokens(_newTokens);
      } else {
        setOutputTokens(allChainTokens);
      }

      setSelectOutputToken(null);
    }
  }, [chainTo, loadedAllTokens, allTokens, bridgeTokens]);

  useEffect(() => {
    if (bridgeTokens) {
      const filterChainList = chainList.filter((chain: any) => {
        return bridgeTokens[chain.chainId]?.length > 0;
      });
      setFilterChainList(filterChainList);
    }
  }, [bridgeTokens]);

  useEffect(() => {
    if (account) {
      setTransitionUpdate(Date.now());
    }
    const inter = setInterval(() => {
      if (!account) {
        return;
      }
      setTransitionUpdate(Date.now());
    }, 30000);

    return () => {
      clearInterval(inter);
    };
  }, [account]);

  useEffect(() => {
    getTrade();
  }, [inputValue, selectInputToken, selectOutputToken, toAddress]);

  useEffect(() => {
    if (!account) {
      setBtnText('Connect Wallet');
      setCanRoute(true);
      return;
    }

    if (loading) {
      setBtnText('Loading');
      setCanRoute(false);
      return;
    }

    if (inputValue && inputBalance) {
      const canRoute = validateInput();
      if (!canRoute) {
        setBtnText('Send');
        return;
      }

      if (Number(inputValue) > Number(inputBalance)) {
        setBtnText('Insufficient balance');
        setCanRoute(false);
        return;
      }

      if (!route && !loading) {
        setBtnText('No Route');
        setCanRoute(false);
        return;
      }

      if (currentChainId !== chainFrom.chainId) {
        setBtnText('Switch Chain');
        setCanRoute(true);
        return;
      }

      setCanRoute(true);
    }

    setBtnText('Send');
  }, [account, currentChainId, inputValue, inputBalance, route, loading, chainFrom]);

  const bridgeType = useMemo(() => {
    return toolMap[tool] ? toolMap[tool] : tool;
  }, [tool]);

  useEffect(() => {
    if (selectInputToken && tool && tokenPairs && tokenPairs.length && bridgeTokens) {
      if (chainFrom.chainId === 1) {
        const pair = tokenPairs.find((pair: any) => pair[0] === selectInputToken.symbol);
        const toToken = outputTokens.find((token: any) => token.symbol === pair[1]);
        setSelectOutputToken(toToken);
      } else {
        const pair = tokenPairs.find((pair: any) => pair[1] === selectInputToken.symbol);
        const toToken = outputTokens.find((token: any) => token.symbol === pair[0]);
        setSelectOutputToken(toToken);
      }
    } else {
      // setSelectOutputToken(null)
    }
  }, [tokenPairs, tool, chainTo, selectInputToken, chainFrom, inputTokens, outputTokens]);

  function validateInput() {
    if (!account || !chainFrom || !chainTo || !selectInputToken || !selectInputToken || !inputValue) {
      return false;
    }

    if (chainFrom?.chainId === chainTo?.chainId) {
      return false;
    }

    const canRoute =
      inputValue &&
      isNumeric(inputValue) &&
      Number(inputValue) > 0 &&
      ((otherAddressChecked && toAddress && isValidAddress) || !otherAddressChecked);

    return canRoute;
  }

  function getTrade() {
    const canRoute = validateInput();
    setRoute(null);

    if (canRoute) {
      newestIdentification.current = Date.now();
      setLoading(true);
      setDuration('');
      setGasCostUSD('');
      setFeeCostUSD('');
      setReceiveAmount('');
      setToUSD('');
      setRoute(null);

      quoteParam = {
        fromChainId: chainFrom.chainId.toString(),
        toChainId: chainTo.chainId.toString(),
        fromToken: {
          address: selectInputToken?.address,
          symbol: selectInputToken?.symbol,
          decimals: selectInputToken?.decimals
        },
        toToken: {
          address: selectOutputToken?.address,
          symbol: selectOutputToken?.symbol,
          decimals: selectOutputToken?.decimals
        },
        fromAddress: account,
        destAddress: otherAddressChecked ? toAddress : account,
        amount: new Big(inputValue).times(Math.pow(10, selectInputToken?.decimals)),
        identification: newestIdentification.current,
        engine: [bridgeType]
      };

      const start = Date.now();
      getQuote(quoteParam, provider.getSigner())
        .then((res: any) => {
          console.log('route: ', res);

          if (res && res.length) {
            let maxReceiveAmount = 0;
            let maxRoute: any;
            res.forEach((route: any) => {
              if (Number(route.receiveAmount) > maxReceiveAmount) {
                maxReceiveAmount = Number(route.receiveAmount);
                maxRoute = route;
              }
            });

            console.log('maxRoute: ', maxRoute);

            if (maxRoute && newestIdentification.current === maxRoute.identification) {
              setDuration(maxRoute.duration);
              let gasCostUSD = '~';
              let feeCostUSD = '~';

              if (maxRoute.gas) {
                if (maxRoute.gasType === 1) {
                  gasCostUSD = (prices[chainFrom.nativeCurrency.symbol] * Number(maxRoute.gas)).toString();
                } else if (maxRoute.gasType === 2) {
                  gasCostUSD = maxRoute.gas;
                } else if (maxRoute.gasType === -1) {
                  gasCostUSD = (prices[selectInputToken.symbol] * Number(maxRoute.gas)).toString();
                }
              }

              if (maxRoute.fee) {
                if (maxRoute.feeType === 1) {
                  feeCostUSD = (prices[chainFrom.nativeCurrency.symbol] * Number(maxRoute.fee)).toString();
                } else if (maxRoute.feeType === 2) {
                  feeCostUSD = maxRoute.fee;
                } else if (maxRoute.feeType === -1) {
                  feeCostUSD = (prices[selectInputToken.symbol] * Number(maxRoute.fee)).toString();
                }
              }

              console.log('gasCostUSD:', gasCostUSD);

              setGasCostUSD(gasCostUSD);
              setFeeCostUSD(feeCostUSD);

              setReceiveAmount(
                getFullNum(
                  new Big(maxRoute.receiveAmount).div(Math.pow(10, selectOutputToken.decimals)).toNumber().toString()
                )
              );
              setRoute(maxRoute);
              setLoading(false);
            }
          } else {
            setLoading(false);
          }

          report({
            source: 'bridge-x',
            type: 'pre-quote',
            account: quoteParam.fromAddress,
            msg: {
              quoteRequest: quoteParam,
              duration: Date.now() - start,
              routes: res?.length
            }
          });
        })
        .catch((e: any) => {
          setLoading(false);
          setBtnText('Send');
        });
    }
  }

  const CurrentActivityCom = activity[tool];

  return (
    <BridgePanel style={style} ref={containerDom}>
      {!card && showHeader && (
        <Header>
          <BridgeIcon>
            <img src={icon} />
          </BridgeIcon>
          <BridgeName>{name}</BridgeName>
        </Header>
      )}

      {CurrentActivityCom && <CurrentActivityCom dapp={dapp} />}
      <Body className="card-body">
        <Content className="card-content">
          <MainTitle className="card-MainTitle">Bridge</MainTitle>
          <ChainPairs>
            <ChainSelector
              disabledChain={disabledChain}
              chain={chainFrom}
              unaAvailableChain={chainTo}
              containerDom={containerDom}
              chainList={filterChainList}
              onChainChange={(chain: any) => {
                setChainFrom(chain);
              }}
            />

            <ChainArrow
              className="card-ChainArrow"
              onClick={() => {
                if (disabledToChain) {
                  return;
                }
                const [_chainFrom, _chainTo] = [chainTo, chainFrom];

                setChainFrom(_chainFrom);
                setChainTo(_chainTo);
                setUpdater(updater + 1);
              }}
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 6L13.7273 6M13.7273 6L8.87869 11.0002M13.7273 6L8.87869 1"
                  stroke="#979ABE"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </ChainArrow>

            <ChainSelector
              disabledChain={disabledChain || disabledToChain}
              chain={chainTo}
              unaAvailableChain={chainFrom}
              containerDom={containerDom}
              chainList={filterChainList}
              onChainChange={(chain: any) => {
                setChainTo(chain);
              }}
            />
          </ChainPairs>

          <Token
            title="Send"
            selectToken={selectInputToken}
            currentChain={chainFrom}
            tokens={inputTokens}
            amount={sendAmount}
            balance={inputBalance}
            loadingBalance={inputBalanceLoading}
            disabled={false}
            prices={prices}
            amountUSD={fromUSD}
            onTokenChange={(token: any) => {
              setSelectInputToken(token);
              // setSendAmount('')
              setReceiveAmount('');
            }}
            onInputChange={(val: any) => {
              setSendAmount(val);
            }}
          />
          <TokenSpace>
            <TransformArrow>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.49992 1V11.5M6.49992 11.5L1 6M6.49992 11.5L12 6"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </TransformArrow>
          </TokenSpace>

          <Token
            title="Receive"
            currentChain={chainTo}
            selectToken={selectOutputToken}
            tokens={outputTokens}
            amount={receiveAmount}
            balance={outputBalance}
            loadingBalance={outputBalanceLoading}
            disabled={true}
            prices={prices}
            amountUSD={toUSD}
            onTokenChange={(token: any) => {
              setSelectOutputToken(token);
              setReceiveAmount('');
            }}
          />

          <FeeMsg
            duration={duration}
            feeCostUSD={feeCostUSD && Number(feeCostUSD) > 0 ? balanceFormated(feeCostUSD) : '~'}
            gasCostUSD={gasCostUSD && Number(gasCostUSD) > 0 ? balanceFormated(gasCostUSD) : '~'}
          />
          {showWarning ? <Alert /> : null}
          <TokenSpace height={'12px'} />

          <SubmitBtn
            style={{
              opacity: (!route || !canRoute) && account ? 0.2 : 1,
              background: color,
              color: tool === 'stargate' || tool === 'mode' || tool === 'blast' ? '#000' : '#fff'
            }}
            onClick={async () => {
              if (!account) {
                onConnect();
                return;
              }

              if (!route || !canRoute) {
                return;
              }

              if (btnText === 'Switch Chain') {
                setChain({ chainId: `0x${chainFrom.chainId?.toString(16)}` });
                return;
              }

              setShowConfirm(true);
            }}
          >
            {loading ? <Loading size={18} /> : null} {btnText}
          </SubmitBtn>
        </Content>

        {!card && <TokenSpace height={'16px'} />}

        {showConfirm && (
          <Confirm
            color={color}
            chainFrom={chainFrom}
            chainTo={chainTo}
            loading={isSending}
            disabled={isSendingDisabled}
            toAddress={addressFormated(otherAddressChecked ? toAddress : account)}
            duration={duration}
            tool={tool}
            gasCostUSD={gasCostUSD && Number(gasCostUSD) > 0 ? balanceFormated(gasCostUSD) : '~'}
            feeCostUSD={feeCostUSD && Number(feeCostUSD) > 0 ? balanceFormated(feeCostUSD) : '~'}
            sendAmount={balanceFormated(sendAmount) + selectInputToken.symbol}
            receiveAmount={balanceFormated(receiveAmount) + selectOutputToken.symbol}
            onClose={() => {
              if (!isSending) {
                setShowConfirm(false);
              }
            }}
            onSend={async () => {
              setIsSending(true);
              setIsSendingDisabled(true);

              try {
                report({
                  source: 'bridge-x',
                  type: 'pre-bridge',
                  account: account,
                  msg: {
                    route: route,
                    tool
                  }
                });

                const txHash: any = await execute(route, provider.getSigner());

                report({
                  source: 'bridge-x',
                  type: 'pre-upload-birdge',
                  account: account,
                  msg: {
                    route: route,
                    hash: txHash,
                    tool
                  }
                });

                if (!txHash) {
                  return;
                }

                setShowConfirm(false);
                setIsSending(false);
                setIsSendingDisabled(false);

                const actionParams = {
                  hash: txHash,
                  link: getChainScan(chainFrom.chainId),
                  duration: duration,
                  fromChainId: chainFrom.chainId,
                  fromChainName: chainFrom.chainName,
                  fromChainLogo: chainFrom.icon,
                  fromTokenLogo: selectInputToken.icon,
                  fromAmount: sendAmount,
                  fromTokenSymbol: selectInputToken.symbol,
                  toChainId: chainTo.chainId,
                  toChainName: chainTo.chainName,
                  toChainLogo: chainTo.icon,
                  toTokenLogo: selectOutputToken.icon,
                  toAmout: receiveAmount,
                  toTokenSymbol: selectOutputToken.symbol,
                  time: Date.now(),
                  tool: tool,
                  bridgeType: route.bridgeType,
                  fromAddress: account,
                  toAddress: account,
                  status: 3
                };

                saveTransaction(actionParams);

                addAction({
                  type: 'Bridge',
                  fromChainId: chainFrom.chainId,
                  toChainId: chainTo.chainId,
                  token: selectInputToken,
                  amount: inputValue,
                  template: template ? template : tool,
                  add: false,
                  status: 1,
                  transactionHash: txHash,
                  extra_data: actionParams
                });

                success({
                  title: 'Transaction success',
                  text: ''
                });

                if (typeof onSuccess === 'function') {
                  onSuccess();
                }

                setUpdater(updater + 1);

                report({
                  source: 'bridge-x',
                  type: 'success',
                  account: account,
                  msg: {
                    route: route,
                    tool,
                    actionParams
                  }
                });
              } catch (err: any) {
                console.log(err);
                fail({
                  title: 'Transaction failed',
                  text: errorFormated(err)
                });

                setIsSending(false);
                setIsSendingDisabled(false);
                setUpdater(updater + 1);

                report({
                  source: 'bridge-x',
                  type: 'error',
                  account: account,
                  msg: {
                    route: route,
                    error: {
                      title: err.title,
                      message: err.message,
                      err
                    },
                    tool
                  }
                });
              }
            }}
          />
        )}

        {!card && (
          <Transaction
            updater={transitionUpdate}
            storageKey={`bridge-${account}-${tool}`}
            getStatus={getStatus}
            tool={tool}
            account={account}
          />
        )}
      </Body>
    </BridgePanel>
  );
}
