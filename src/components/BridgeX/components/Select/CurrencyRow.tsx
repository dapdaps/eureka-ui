import Big from 'big.js';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import { balanceFormated, percentFormated } from '@/utils/balance';

const CurrencyRowWapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 10px 0px;
  border-radius: 16px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.4);
    pointer-events: none;
    opacity: 0.8;
  }
`;

const CurrencyLabel = styled.div`
  display: flex;
  align-items: center;
`;
const CurrencySymbol = styled.div`
  font-size: 18px;
  font-weight: 500px;
  color: #fff;
`;
const CurrencyName = styled.div`
  font-size: 14px;
  color: #fff;
`;
const CurrencyIcon = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 20px;
`;
const CurrencyAmount = styled.div`
  font-size: 18px;
  font-weight: 500px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
`;

function CheckIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 5L6 10L15 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  );
}

export default function CurrencyRow({ currency, selectedTokenAddress, onClick, loading, balance, currentChain }: any) {
  // const isActive = currency.address === selectedTokenAddress;

  // const { balance, loading } = useTokenBalance({
  //   currency,
  //   updater: 1,
  //   isNative: currentChain?.nativeCurrency.symbol === currency?.symbol,
  //   isPure: false,
  // })

  return (
    <CurrencyRowWapper className={currency.address === selectedTokenAddress ? 'active' : ''} onClick={onClick}>
      <CurrencyLabel>
        <CurrencyIcon src={currency.icon} />
        <div>
          <CurrencySymbol>{currency.symbol}</CurrencySymbol>
          <CurrencyName>{currency.name}</CurrencyName>
        </div>
      </CurrencyLabel>
      <CurrencyAmount>
        {loading ? <Loading size={16} /> : balanceFormated(balance)}
        {currency.address === selectedTokenAddress && <CheckIcon />}
      </CurrencyAmount>
    </CurrencyRowWapper>
  );
}
