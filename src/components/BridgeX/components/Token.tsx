import Big from 'big.js';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { balanceFormated, percentFormated } from '@/utils/balance';

import usePriceValue from '../hooks/usePriceValue';
import { ArrowDown, ArrowUp } from './Arrows';
import CurrencySelectCom from './Select/CurrencySelect';

const Wrapper = styled.div`
  background: #2e3142;
  border: 1px solid #373a53;
  border-radius: 12px;
  padding: 12px;
  &.focus {
    background-color: #1b1e27;
  }
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #979abe;
`;

const InputWapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
`;

const Input = styled.input`
  border: none;
  font-size: 26px;
  font-weight: 500;
  line-height: 31px;
  width: 200px;
  background-color: inherit;
  color: rgba(255, 255, 255, 1);
  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
`;

const SelectWapper = styled.div`
  width: 138px;
`;

const BalanceWapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  margin-top: 14px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const BalanceText = styled.div`
  color: #979abe;
  display: flex;
  &.balance-in {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const CurrencyField = styled.div`
  max-width: 150px;
  flex-shrink: 0;
  /* border: 1px solid rgba(55, 58, 83, 1); */
  background: #2e3142;
  border-radius: 8px;

  @media (max-width: 768px) {
    min-width: 115px;
  }
`;

const CurrencySelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid var(--input-border-color);
  border-radius: 24px;
  padding: 3px 10px 3px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: var(--input-select-bg-color);
  svg {
    color: var(--button-color);
  }
  @media (max-width: 768px) {
    svg {
      width: 12px !important;
    }
    padding: 0px 12px 0px 6px;
  }
`;
const CurrencyWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  &:hover {
    .token-chain-img .tip {
      display: block;
    }
  }
  .token-chain-img {
    height: 32px;
    width: 32px;
    position: relative;
    .token-img {
      width: 100%;
      height: 100%;
    }
    .chain-img {
      position: absolute;
      width: 10px;
      height: 10px;
      right: 0;
      bottom: 0;
    }
    .tip {
      position: absolute;
      bottom: 130%;
      left: 0%;
      transform: translateX(-50%);
      white-space: nowrap;
      font-size: 12px;
      background-color: #262836;
      border: 1px solid #373a53;
      border-radius: 8px;
      padding: 5px 10px;
      display: none;
      color: #fff;
      &:after {
        content: '';
        position: absolute;
        transform: translateX(30%);
        top: 100%;
        left: 50%;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #262836;
      }
    }
  }
  @media (max-width: 768px) {
    width: calc(100% - 12px);
  }
`;
const CurrencyIcon = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
  }
`;
const CurrencySymbol = styled.div`
  font-size: 18px;
  color: #fff;
  margin-left: 7px;
  white-space: nowrap;
  .fz-14 {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    width: calc(100% - 40px);
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    .fz-14 {
      font-size: 12px;
    }
  }
`;

// const { balanceFormated } = VM.require('dapdapbos.near/widget/Bridge.Utils');

export default function Token({
  currentChain,
  title,
  tokens,
  selectToken,
  amount,
  onInputChange,
  disabled,
  onTokenChange,
  balance,
  prices,
  amountUSD,
  loadingBalance
}: any) {
  const [isFocus, setIsFocus] = useState(false);
  const [options, setOptions] = useState([]);
  const [tokensDisplay, setTokensDisplay] = useState(false);

  const { value: inputUSD } = usePriceValue({
    prices,
    amount: amount,
    symbol: selectToken?.symbol
  });

  function handleInputFocus() {
    setIsFocus(true);
  }

  function handleInputBlur() {
    setIsFocus(false);
  }

  function handleInputChange(e: any) {
    onInputChange && onInputChange(e.target.value);
  }

  return (
    <Wrapper className={isFocus && !disabled ? 'focus' : ''}>
      <Title>{title}</Title>
      <InputWapper>
        <Input
          disabled={disabled}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          value={amount}
          placeholder="0"
        />
        <SelectWapper>
          <CurrencyField>
            <CurrencySelect
              onClick={() => {
                setTokensDisplay(true);
              }}
            >
              <CurrencyWrapper>
                {selectToken && (
                  <div className="token-chain-img">
                    <img src={selectToken?.icon} className="token-img" />
                    <img src={currentChain?.icon} className="chain-img" />
                    <div className="tip">{selectToken.address}</div>
                  </div>
                )}
                {/* {selectToken?.icon && <CurrencyIcon src={selectToken.icon} />} */}
                <CurrencySymbol>{selectToken?.symbol || <span className="fz-14">Select a token</span>}</CurrencySymbol>
              </CurrencyWrapper>
              <ArrowDown />
            </CurrencySelect>
          </CurrencyField>

          {tokensDisplay && (
            <CurrencySelectCom
              display={tokensDisplay}
              selectedTokenAddress={selectToken?.address}
              tokens={tokens}
              currentChain={currentChain}
              onClose={() => {
                setTokensDisplay(false);
              }}
              onSelect={(currency: any) => {
                onTokenChange(currency);
                setTokensDisplay(false);
              }}
            />
          )}
        </SelectWapper>
      </InputWapper>

      <BalanceWapper>
        <BalanceText>{inputUSD}</BalanceText>
        <BalanceText
          onClick={() => {
            onInputChange && selectToken && onInputChange(balance);
          }}
          className={disabled ? '' : 'balance-in'}
        >
          balance:{' '}
          {loadingBalance ? (
            <LoadingWrapper>
              <Loading size={12} />
            </LoadingWrapper>
          ) : (
            balanceFormated(selectToken ? balance : '0.0')
          )}
        </BalanceText>
      </BalanceWapper>
    </Wrapper>
  );
}
