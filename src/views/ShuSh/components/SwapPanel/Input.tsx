import Big from 'big.js';
import { memo, useMemo } from 'react';
import styled from 'styled-components';

import { formateValueWithThousandSeparator } from '@/utils/formate';

const StyledContainer = styled.div`
  width: 365px;
  height: 110px;
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #2e3142;
  padding: 18px 20px;
  box-sizing: border-box;
`;

const StyledLabel = styled.div`
  color: #979abe;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
`;

const StyledInputBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const StyledInputWrapper = styled.div`
  flex-shrink: 1;
`;

const StyledInput = styled.input`
  color: #fff;
  font-size: 26px;
  font-weight: 500;
  line-height: normal;
  width: 100%;

  &::placeholder {
    color: #979abe;
  }
`;

const StyledTokenSelector = styled.div`
  height: 36px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  display: flex;
  align-items: center;
  padding: 8px;
  box-sizing: border-box;
  gap: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

const StyledTokenIcon = styled.img`
  width: 26px;
  height: 26px;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #979abe;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px;
`;

const StyledBalance = styled.span`
  text-decoration-line: underline;
`;

const Input = ({ amount, token, prices, onAmountChange, onSelectToken }: any) => {
  const value = useMemo(() => {
    if (!amount) return '-';
    if (!prices) return '-';
    const price = prices[token.priceKey || token.symbol];
    if (!price) return '-';
    return formateValueWithThousandSeparator(new Big(amount).mul(price).toString(), 2);
  }, [amount, token, prices]);
  return (
    <StyledContainer>
      <StyledLabel>{token.displayName}</StyledLabel>
      <StyledInputBox>
        <StyledInputWrapper>
          <StyledInput
            placeholder="0.00"
            value={amount}
            onChange={(ev) => {
              if (isNaN(Number(ev.target.value))) return;
              onAmountChange?.(ev.target.value.replace(/\s+/g, ''));
            }}
          />
        </StyledInputWrapper>
        <StyledTokenSelector onClick={onSelectToken}>
          <StyledTokenIcon src={token.icon || '/images/tokens/default_icon.png'} />
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
            <path d="M1 1L6 5L11 1" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </StyledTokenSelector>
      </StyledInputBox>
      <StyledFooter>
        <div>~ ${value}</div>
        {/* <div>
          balance: <StyledBalance>1.23</StyledBalance>
        </div> */}
      </StyledFooter>
    </StyledContainer>
  );
};

export default memo(Input);
