import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { balanceFormated } from '@/utils/balance';

const StyledCurrencyRow = styled.div`
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: rgba(151, 154, 190, 0.1);
  }

  &.active {
    background-color: var(--dex-hover-bg-color);
    pointer-events: none;
    opacity: 0.8;
  }
`;

const checkIcon = (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5L6 10L15 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
);

const CurrencyLabel = styled.div`
  display: flex;
  align-items: center;
`;
const CurrencySymbol = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--agg-text-color, #fff);
`;
const CurrencyIcon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin-right: 8px;
`;
const CurrencyAmount = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: var(--agg-text-color, #fff);
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default function CurrencyRow({ currency, selectedTokenAddress, onClick, balance, loading }: any) {
  const isActive = currency.address === selectedTokenAddress;

  return (
    <StyledCurrencyRow className={isActive ? 'active' : ''} onClick={onClick}>
      <CurrencyLabel>
        <CurrencyIcon src={currency.icon || '/images/tokens/default_icon.png'} />
        <div>
          <CurrencySymbol>{currency.symbol}</CurrencySymbol>
        </div>
      </CurrencyLabel>
      <CurrencyAmount>
        {loading ? (
          <Loading />
        ) : (
          <>
            {balanceFormated(balance)}
            {isActive ? checkIcon : <div style={{ width: 16 }} />}
          </>
        )}
      </CurrencyAmount>
    </StyledCurrencyRow>
  );
}
