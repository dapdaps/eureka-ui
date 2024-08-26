import type { FC } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import Big from 'big.js';
import { useDebounce } from 'ahooks';

import allTokens from '@/config/bridge/allTokens';
import chainCofig from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useAddTokenToWallet from '@/hooks/useAddTokenToWallet';

import useTokenBalance from '@/hooks/useCurrencyBalance';
import { usePriceStore } from '@/stores/price';
import type { Chain, Token } from '@/types';
import { addressFormated, balanceFormated, errorFormated, getFullNum, percentFormated } from '@/utils/balance';

import type { QuoteProps } from './hooks/useFjordTrade'
import { useBuyQuote, useBuyTrade, useDetail,useSellQuote, useSellTrade } from './hooks/useFjordTrade'
import Modal from './launch-modal';
import SellTokenAmount from './SellTokenAmount';
import Settings from './settings';
import {
  ArrowSwap,
  Body,
  CloseBtn,
  Foot,
  FootWrap,
  Head,
  HeadContent,
  HeadLeft,
  HeadSub,
  HeadTitle,
  Logo,
  Panel,
  Status,
  TabBody,
  TimerEnd,
  StyledRelativeModal
} from './style.index';
import SubmitBtn from './SubmitBtn';
import Tabs from './tabs';
import Timer from './timer';
import Buy from './Trade/Buy'

interface IProps {
  onClose?: () => void;
  pool: string;
  chainId: number;
  token: Token;
  midToken: Token;
  price: string;
  isModal?: boolean;
  isFixedPriceSale?: boolean;
}
const chainList = Object.values(chainCofig);

const CloseIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884125 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882276 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884276 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
      fill="#979ABE"
    />
  </svg>
);

const LaunchPadModal: FC<IProps> = ({ onClose, pool, chainId: targetChainId, token, midToken, price: shareTokenPrice, isModal = true, isFixedPriceSale = false }) => {
  const { account, chainId, provider } = useAccount();
  const [fromChain, setFromChain] = useState<Chain>(chainCofig[targetChainId]);
  const [fromToken, setFromToken] = useState<Token>();
  const [sendAmount, setSendAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [updateBanlance, setUpdateBanlance] = useState(1);
  const [duration, setDuration] = useState(0);
  const [buySlippage, setBuySlippage] = useState('0.25')
  const [sellSlippage, setSellSlippage] = useState('0.25')
  const { addAction } = useAddAction('dapp');
  const [buyQuote, setBuyQuote] = useState<QuoteProps>()
  const [btnDisbaled, setBtnDisbaled] = useState<boolean>(false)
  const [text, setText] = useState<string>('')

  const _sendAmount = useDebounce(sendAmount, { wait: 500 });
  const _sellAmount = useDebounce(sellAmount, { wait: 500 });

  const { add: addToken } = useAddTokenToWallet();

  const price = usePriceStore((store) => store.price);
  const { startTime, endTime, isClosed, balance } = useDetail(pool, account as string, token, targetChainId, updateBanlance)

  const { shareVal, loading: buyQuoteLoading, bridgeRoute, receiveAmount, tradeType } = useBuyQuote(buyQuote, midToken, provider?.getSigner(), isFixedPriceSale)

  const { excuteBuyTrade, loading: buyExcuteLoading } = useBuyTrade({
    shareVal,
    bridgeRoute,
    receiveAmount,
    tradeType,
    pool,
    midToken,
    recipient: account as string,
    quote: buyQuote,
    chainId: targetChainId,
    slippage: buySlippage,
    isFixedPriceSale,
  })

  const {
    assetOut, loading: sellQuoteLoading
  } = useSellQuote({
    pool,
    amount: _sellAmount,
    toToken: token,
    chainId: targetChainId,
    midToken: midToken as Token,
    recipient: account as string,
  })
  console.log('====token', token)

  const { loading: sellLoading, excuteSellTrade } = useSellTrade({
    pool,
    recipient: account as string,
    amount: _sellAmount,
    assetOut,
    toToken: token,
    midToken,
    chainId: targetChainId,
    slippage: sellSlippage,
  })

  const [currentTab, setCurrentTab] = useState('BUY');
  const tabData = [
    {
      name: 'Buy',
      key: 'BUY',
    },
  ];
  if (!isFixedPriceSale) {
    tabData.push({
      name: 'Sell',
      key: 'SELL',
    })
  }


  const onTabsChange = (key: string) => {
    setCurrentTab(key);
  };

  const { balance: inputBalance } = useTokenBalance({
    currency: fromToken,
    updater: updateBanlance,
    isNative: fromChain?.nativeCurrency.symbol === fromToken?.symbol,
    isPure: false,
  })

  const { balance: outputBalance } = useTokenBalance({
    currency: midToken as Token,
    updater: updateBanlance,
    isNative: false,
    isPure: false,
  })

  const handleBuyAndSell = async () => {
    let hash
    if (currentTab === 'BUY') {
      hash = await excuteBuyTrade(provider?.getSigner())
    } else if (currentTab === 'SELL') {
      hash = await excuteSellTrade(provider?.getSigner())
    }

    if (hash) {
      let amount, trade_type, token0, token1
      if (currentTab === 'BUY') {
        const _receiveAmount = new Big(receiveAmount).div(10 ** midToken.decimals).toString()
        amount = _receiveAmount
        trade_type = 'buy'
        token0 = {
          ...midToken,
          amount: _receiveAmount,
        }
        if (isFixedPriceSale) {
          token1 = {
            ...token,
            amount: shareVal
          }
        } else {
          token1 = token
          shareTokenPrice = (Number(price[midToken.symbol]) * Number(_receiveAmount) / Number(shareVal)).toString()
        }
      } else {
        amount = _sellAmount
        trade_type = 'sell'
        token0 = {
          ...token,
          amount: _sellAmount,
        }
        token1 = midToken
        shareTokenPrice = (Number(price[midToken.symbol]) * Number(assetOut) / Number(_sellAmount)).toString()
      }
      addAction({
        type: "Swap",
        fromChainId: fromChain.chainId,
        token: fromToken,
        amount: amount,
        template: 'launchpad',
        add: false,
        status: 1,
        transactionHash: hash,
        token0,
        token1,
        trade_type: trade_type,
        shareTokenPrice,
        pool,
      })
    }
    setUpdateBanlance(updateBanlance + 1)
  }

  useEffect(() => {
    if (currentTab === 'BUY') {
      if (account && fromChain && fromToken && Number(_sendAmount) > 0) {
        setBuyQuote({
          fromChain,
          fromToken,
          amount: new Big(_sendAmount).mul(10 ** fromToken.decimals),
          pool,
          toToken: token,
          address: account,
          chainId: targetChainId,
        })
      }
    }
  }, [currentTab, pool, fromChain, fromToken, _sendAmount, account])

  useEffect(() => {
    if (token.symbol === "RAGE") {
      setBtnDisbaled(true)
      setText("Sold Out")
      return
    }

    if (!_sendAmount) {
      setBtnDisbaled(true)
      setText("Buy")
      return
    }

    if (currentTab === 'BUY') {
      if (!shareVal && !buyQuoteLoading && _sendAmount) {
        setBtnDisbaled(true)
        setText('No route')
        return
      }
      if (isFixedPriceSale && Big(shareVal ? shareVal : 0).eq(0)) {
        setBtnDisbaled(true)
        setText('Buy')
        return
      }
      if (_sendAmount && Number(inputBalance) < Number(_sendAmount)) {
        setBtnDisbaled(true)
        setText('Insufficient balance')
        return
      }

      setBtnDisbaled(false)
    }

    if (currentTab === 'SELL') {
      if (!assetOut && !sellQuoteLoading && _sellAmount) {
        setBtnDisbaled(true)
        setText('No route')
        return
      }

      if (_sellAmount && Number(balance) < Number(_sellAmount)) {
        setBtnDisbaled(true)
        setText('Insufficient balance')
        return
      }

      setBtnDisbaled(false)
    }
  }, [shareVal, currentTab, buyQuoteLoading, _sendAmount, sellQuoteLoading, _sellAmount, inputBalance, balance])



  return isModal ? (
    <Modal>
      <Panel>
        <Head>
          <HeadLeft>
            <Logo src={token.icon} />
            <HeadContent>
              <HeadTitle>
                {token.symbol}
                {
                  !isClosed && <Status>
                    <b className="dot"></b>Live Now
                  </Status>
                }
              </HeadTitle>
              <HeadSub>{token.name}</HeadSub>
            </HeadContent>
          </HeadLeft>
          <CloseBtn onClick={() => onClose && onClose()}>{CloseIcon}</CloseBtn>
        </Head>
        <TimerEnd>End in</TimerEnd>
        <Timer color="white" endTime={Number(endTime)} />
        <Tabs tabData={tabData} current={currentTab} onTabsChange={onTabsChange} style={{ marginTop: 4 }}></Tabs>
        <Settings style={{ position: 'absolute', right: 17, bottom: 24 }} amount={currentTab === 'BUY' ? buySlippage : sellSlippage} onAmountChange={(value) => {
          if (currentTab === 'BUY') {
            setBuySlippage(value)
          } else {
            setSellSlippage(value)
          }
        }} />
      </Panel>
      <Body>
        {currentTab === 'BUY' && (
          <TabBody>
            <Buy
              setFromChain={setFromChain}
              fromChain={fromChain}
              setFromToken={setFromToken}
              fromToken={fromToken}
              sendAmount={sendAmount}
              setSendAmount={setSendAmount}
              updateBanlance={updateBanlance}
              allTokens={allTokens}
              address={addressFormated(account as string)}
              chainList={chainList}
              shareVal={shareVal}
              balance={balance}
              toToken={token as Token}
              buyQuoteLoading={buyQuoteLoading}
              shareTokenPrice={shareTokenPrice}
            />
          </TabBody>
        )}
        {currentTab === 'SELL' && (
          <TabBody>
            <SellTokenAmount
              shareUsdPrice={sellAmount ? '$' + balanceFormated((Number(shareTokenPrice) * Number(sellAmount)).toString(), 2) : '$~'}
              token={token}
              title="Collateral Token"
              amount={sellAmount}
              onAmountChange={value => setSellAmount(value)}
              balance={balance}
              readOnly={sellQuoteLoading} />
            <ArrowSwap>
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
            <SellTokenAmount token={midToken as Token} title="Project Input" amount={assetOut} balance={outputBalance as string} readOnly={true} />
          </TabBody>
        )}
        <FootWrap>
          {buyQuoteLoading}
          <SubmitBtn
            isLoading={currentTab === 'BUY' ? (buyQuoteLoading || buyExcuteLoading) : (sellQuoteLoading || sellLoading)}
            defaultText={currentTab === 'BUY' ? 'Buy' : 'Sell'}
            text={text}
            fromChain={currentTab === 'BUY' ? fromChain : { chainId: Number(targetChainId) } as Chain}
            onClick={handleBuyAndSell}
            disabled={btnDisbaled}
          />

          <Foot>
            {/* <span>Price impact 0.07%</span> */}
            <span></span>
            <span onClick={() => {
              addToken(token)
            }} className="addToken">Add {token.symbol} to MetaMask</span>
          </Foot>
        </FootWrap>
      </Body>
    </Modal>
  ) : (
    <StyledRelativeModal>
      <Panel style={{ height: 'auto' }}>
        <Tabs tabData={tabData} current={currentTab} onTabsChange={onTabsChange}></Tabs>
        <Settings style={{ position: 'absolute', right: 17, bottom: 24 }} amount={currentTab === 'BUY' ? buySlippage : sellSlippage} onAmountChange={(value) => {
          if (currentTab === 'BUY') {
            setBuySlippage(value)
          } else {
            setSellSlippage(value)
          }
        }} />
      </Panel>
      <Body>
        {currentTab === 'BUY' && (
          <TabBody>
            <Buy
              setFromChain={setFromChain}
              fromChain={fromChain}
              setFromToken={setFromToken}
              fromToken={fromToken}
              sendAmount={sendAmount}
              setSendAmount={setSendAmount}
              updateBanlance={updateBanlance}
              allTokens={allTokens}
              address={addressFormated(account as string)}
              chainList={chainList}
              shareVal={shareVal}
              balance={balance}
              toToken={token as Token}
              buyQuoteLoading={buyQuoteLoading}
              shareTokenPrice={shareTokenPrice}
            />
          </TabBody>
        )}
        {currentTab === 'SELL' && (
          <TabBody>
            <SellTokenAmount
              shareUsdPrice={sellAmount ? '$' + balanceFormated((Number(shareTokenPrice) * Number(sellAmount)).toString(), 2) : '$~'}
              token={token}
              title="Collateral Token"
              amount={sellAmount}
              onAmountChange={value => setSellAmount(value)}
              balance={balance}
              readOnly={sellQuoteLoading} />
            <ArrowSwap>
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
            <SellTokenAmount token={midToken as Token} title="Project Input" amount={assetOut} balance={outputBalance as string} readOnly={true} />
          </TabBody>
        )}
        <FootWrap>
          {buyQuoteLoading}
          <SubmitBtn
            isLoading={currentTab === 'BUY' ? (buyQuoteLoading || buyExcuteLoading) : (sellQuoteLoading || sellLoading)}
            defaultText={currentTab === 'BUY' ? 'Buy' : 'Sell'}
            text={text}
            fromChain={currentTab === 'BUY' ? fromChain : { chainId: Number(targetChainId) } as Chain}
            onClick={handleBuyAndSell}
            disabled={btnDisbaled}
          />

          <Foot>
            {/* <span>Price impact 0.07%</span> */}
            <span></span>
            <span onClick={() => {
              addToken(token)
            }} className="addToken">Add {token.symbol} to MetaMask</span>
          </Foot>
        </FootWrap>
      </Body>
    </StyledRelativeModal>
  );
};

export default LaunchPadModal;
