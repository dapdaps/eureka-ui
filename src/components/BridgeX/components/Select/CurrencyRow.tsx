import { useEffect, useState } from 'react'
import styled from 'styled-components';
import Big from 'big.js'

import Loading from '@/components/Icons/Loading';


const CurrencyRowWapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 10px 0px;
  border-radius: 16px;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: var(--dex-hover-bg-color);
    pointer-events: none;
    opacity: 0.8;
  }
`;

const checkIcon = (
  <svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5L6 10L15 1"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

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
`;




export default function CurrencyRow({currency, selectedTokenAddress, display, onClick, chainIdNotSuppor}: any) {
  const [balanceLoaded, setBalanceLoaded] = useState(false)
  const [balance, setBalance] = useState('0')

  const isActive = currency.address === selectedTokenAddress;


  return (
    <CurrencyRowWapper
      className={currency.address === selectedTokenAddress ? "active" : ""}
      onClick={onClick}
    >
      {/* {display && !state.balanceLoaded && (
        <Widget
          src="dapdapbos.near/widget/Bridge.Select.CurrencyBalance"
          props={{
            address: currency.address,
            chainIdNotSupport,
            onLoad: (balance) => {
              State.update({
                balance: ethers.utils.formatUnits(balance, currency.decimals),
                balanceLoaded: true,
              });
            },
          }}
        />
      )} */}
      <CurrencyLabel>
        <CurrencyIcon src={currency.logoURI} />
        <div>
          <CurrencySymbol>{currency.symbol}</CurrencySymbol>
          <CurrencyName>{currency.name}</CurrencyName>
        </div>
      </CurrencyLabel>
      {/* <CurrencyAmount>
        {!chainIdNotSupport ? utils.balanceFormated() : "-"}
  
        {isActive ? checkIcon : ""}
      </CurrencyAmount> */}
    </CurrencyRowWapper>
  );
  
}

