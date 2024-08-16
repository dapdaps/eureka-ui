import React, { useCallback, useEffect, useState } from 'react';
import Big from 'big.js';
import { balanceFormated } from '@/utils/balance';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import { StyledFlex } from '@/styled/styles';
import Currency from '@/views/AllInOne/components/Trade/Currency/index';
import {
  ArrowWrap,
  StyledMarketCount,
  StyledMarketIcon,
  StyledMarketTag,
  StyledMarketTitle,
  StyledTrade,
  StyledTradeContainer,
  StyledTradeEth,
  StyledTradeFooter,
  StyledTradeIcon,
} from '@/views/AllInOne/components/Trade/styles';
import Arrow2Down from '@/views/AllInOne/components/Arrow2Down';
import CurrencySelectPopup from './CurrencySelectPopup';
import Button from './Button';
import Markets from './Markets';
import { useDebounceFn } from 'ahooks';
import networks from '@/config/swap/networks';
import useTrade from '../../hooks/useTrade';
import type { Token } from '@/types';

const Trade = (props: { chain: Record<string, any>; disabled?: boolean }) => {
  const { chain, disabled } = props;

  const [updater, setUpdater] = useState(1);
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState<string>('');
  const [inputCurrency, setInputCurrency] = useState<Token>(networks[chain.chainId].defalutInputCurrency);
  const [outputCurrency, setOutputCurrency] = useState<Token>();
  const [selectType, setSelectType] = useState<'in' | 'out'>('in');
  const [showTokensSelector, setShowTokensSelector] = useState<boolean>(false);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [errorTips, setErrorTips] = useState('');
  const [inputBlance, setInputBalance] = useState('0');

  const { tokens, loading, markets, trade, bestTrade, onQuoter, onSelectMarket, onSwap } = useTrade({
    chainId: chain.chainId,
    onSuccess() {
      setUpdater(Date.now());
    },
  });

  const { run: runQuoter } = useDebounceFn(
    () => {
      onQuoter({ inputCurrency, outputCurrency, inputCurrencyAmount });
    },
    {
      wait: 500,
    },
  );

  const showMarketDropdown = () => {
    if (disabled) return;
    setIsDropdown(!isDropdown);
  };

  const onSelectToken = useCallback(
    (token: any) => {
      let _inputCurrency: any = inputCurrency;
      let _outputCurrency: any = outputCurrency;

      if (selectType === 'in') {
        _inputCurrency = token;
        if (token.address === outputCurrency?.address) _outputCurrency = null;
      }
      if (selectType === 'out') {
        _outputCurrency = token;
        if (token.address === inputCurrency?.address) _inputCurrency = null;
      }

      setInputCurrency(_inputCurrency);
      setOutputCurrency(_outputCurrency);
      setShowTokensSelector(false);
    },
    [selectType, inputCurrency, outputCurrency, inputCurrencyAmount],
  );

  useEffect(() => {
    if (!inputCurrency || !outputCurrency) {
      setErrorTips('Select a token');
      return;
    }
    if (Number(inputCurrencyAmount || 0) === 0) {
      setErrorTips('Enter an amount');
      return;
    }
    if (Big(inputCurrencyAmount).gt(inputBlance)) {
      setErrorTips(`Insufficient ${inputCurrency?.symbol} Balance`);
      return;
    }

    setErrorTips('');
    onSelectMarket(null);
    runQuoter();
  }, [inputCurrency, outputCurrency, inputCurrencyAmount, inputBlance]);

  const changeTokenType = useCallback(() => {
    if (!trade || !outputCurrency) return
    setInputCurrency(outputCurrency);
    setOutputCurrency(inputCurrency);
    setSelectType('in')
    setInputCurrencyAmount(trade?.outputCurrencyAmount);
    runQuoter();
  }, [outputCurrency, outputCurrency, trade]);
  

  return (
    <>
      <StyledTradeContainer className={`StyledTradeContainer ${disabled ? 'disabled' : ''}`}>
        <StyledTrade>
          <div className="from-currency_margin">
            <Currency
              title="Swap From"
              isFrom={true}
              amount={inputCurrencyAmount}
              currency={inputCurrency}
              onAmountChange={(amount: any) => {
                setInputCurrencyAmount(amount);
              }}
              disabled={disabled}
              key={updater}
              onTokenSelect={() => {
                setSelectType('in');
                setShowTokensSelector(true);
              }}
              onLoad={(balance: string) => {
                setInputBalance(balance);
              }}
            />
          </div>
          <StyledTradeIcon disabled={disabled} onClick={changeTokenType}>
            <Arrow2Down />
          </StyledTradeIcon>
          <Currency
            title="To"
            amount={trade?.outputCurrencyAmount}
            currency={outputCurrency}
            disabled
            key={updater}
            onTokenSelect={() => {
              setSelectType('out');
              setShowTokensSelector(true);
            }}
          />
        </StyledTrade>
        <Button
          chain={chain}
          amount={inputCurrencyAmount}
          spender={trade?.routerAddress}
          errorTips={errorTips}
          token={inputCurrency}
          loading={loading}
          onClick={onSwap}
          disabled={!trade?.txn}
        />
        <StyledTradeFooter>
          <StyledTradeEth>
            {trade && (
              <span>
                1 {outputCurrency?.symbol} ={' '}
                {balanceFormated(
                  Big(inputCurrencyAmount || 0)
                    .div(Big(trade.outputCurrencyAmount || 0).eq(0) ? 1 : trade.outputCurrencyAmount)
                    .toString(),
                  4,
                )}{' '}
                {inputCurrency?.symbol}
              </span>
            )}
          </StyledTradeEth>
          {!!markets.length && (
            <StyledFlex gap="8px">
              {trade && (
                <>
                  <StyledMarketIcon url={trade.logo}></StyledMarketIcon>
                  <StyledMarketTitle>{trade.name}</StyledMarketTitle>
                  {trade.name === bestTrade.name && <StyledMarketTag>Best Price</StyledMarketTag>}
                </>
              )}
              <StyledFlex className={isDropdown ? 'light' : 'dark'} gap="8px">
                <StyledMarketCount onClick={showMarketDropdown}>{markets.length}Markets</StyledMarketCount>
                {!!markets.length && (
                  <ArrowWrap isDropdown={isDropdown} onClick={showMarketDropdown}>
                    <ArrowIcon size={10} />
                  </ArrowWrap>
                )}
              </StyledFlex>
            </StyledFlex>
          )}
        </StyledTradeFooter>
        {!!markets.length && (
          <Markets
            isDropdown={isDropdown}
            chain={chain}
            disabled={disabled}
            bestTrade={bestTrade}
            markets={markets}
            market={trade}
            inputCurrency={inputCurrency}
            outputCurrency={outputCurrency}
            onSelectMarket={onSelectMarket}
          />
        )}
      </StyledTradeContainer>
      <CurrencySelectPopup
        tokens={tokens || []}
        display={showTokensSelector}
        onClose={() => setShowTokensSelector(false)}
        currency={selectType === 'in' ? inputCurrency : outputCurrency}
        onSelect={onSelectToken}
      />
    </>
  );
};

export default Trade;
