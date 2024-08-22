import { memo } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { usePriceStore } from '@/stores/price';
import { balanceFormated, valueFormated } from '@/utils/balance';
import TokenIcon from '@/views/Pool/components/TokenIcon';

export const StyledRow = styled.div`
  height: 57px;
  cursor: pointer;
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s;
  background-color: #262836;
  &:hover {
    background-color: rgba(151, 154, 190, 0.1);
  }
  &:last-child {
    border-radius: 0px 0px 20px 20px;
  }
`;
export const StyledRowL = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const StyledTokenNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
export const StyledName = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const StyledSymbol = styled.div`
  color: #979abe;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const StyledRowR = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const StyledBalanceWrap = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;
const StyledValue = styled.div`
  color: #7e8a93;
  text-align: right;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TokenRow = ({ token, balance, loading, isSelected, onClick }: any) => {
  const prices = usePriceStore((store) => store.price);
  return (
    <StyledRow onClick={onClick}>
      <StyledRowL>
        <TokenIcon token={token} />
        <StyledTokenNameWrapper>
          <StyledName>{token.name}</StyledName>
          <StyledSymbol>{token.symbol}</StyledSymbol>
        </StyledTokenNameWrapper>
      </StyledRowL>
      <StyledRowR>
        {isSelected && (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M1 5L6 10L15 1" stroke="var(--border-color)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        {loading ? (
          <Loading />
        ) : (
          <StyledBalanceWrap>
            <span className="balance">{balanceFormated(balance?.toString(), 4)}</span>
            <StyledValue>${valueFormated(balance, prices[token.priceKey || token.symbol])}</StyledValue>
          </StyledBalanceWrap>
        )}
      </StyledRowR>
    </StyledRow>
  );
};

export default memo(TokenRow);
