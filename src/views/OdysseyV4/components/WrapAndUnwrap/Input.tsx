import Big from 'big.js';
import { memo } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { usePriceStore } from '@/stores/price';
import { balanceFormated, valueFormated } from '@/utils/balance';

const StyledContainer = styled.div`
  width: 380px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #1b1e27;
  padding: 14px;
  box-sizing: border-box;
`;

const StyledLabel = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  gap: 10px;
`;

const StyledInputBox = styled.div`
  flex-grow: 1;
`;

const StyledInput = styled.input`
  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;

  &::placeholder {
    color: #5e617e;
  }
`;

const StyledTokenWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const StyledSymbol = styled.div`
  color: #fff;
  text-align: right;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`;

const StyledValue = styled.span`
  color: #979abe;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledBalance = styled.span`
  color: #fff;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  cursor: pointer;
`;

const Input = ({ value, tab, balance, loading, setValue }: any) => {
  const prices = usePriceStore((store) => store.price);
  return (
    <StyledContainer>
      <StyledLabel>{tab}</StyledLabel>
      <StyledInputWrapper>
        <StyledInputBox>
          <StyledInput
            placeholder="0.0"
            value={value || ''}
            onChange={(ev) => {
              if (isNaN(Number(ev.target.value))) return;
              setValue(ev.target.value);
            }}
          />
        </StyledInputBox>
        <StyledTokenWrapper>
          <StyledIcon src={tab === 'Wrap' ? '/assets/tokens/eth.png' : '/assets/tokens/weth.png'} />
          <StyledSymbol>{tab === 'Wrap' ? 'ETH' : 'WETH'}</StyledSymbol>
        </StyledTokenWrapper>
      </StyledInputWrapper>
      <StyledValueWrapper>
        <StyledValue>${!isNaN(Number(value)) ? valueFormated(value, prices.ETH) : '-'}</StyledValue>
        <div>
          <StyledValue>Balance:</StyledValue>
          {loading ? (
            <Loading size={16} />
          ) : (
            <StyledBalance
              onClick={() => {
                if (isNaN(Number(balance))) return;
                setValue(balanceFormated(new Big(balance).toFixed(18), 18));
              }}
            >
              {' '}
              {!balance ? '-' : balanceFormated(balance, 4)}
            </StyledBalance>
          )}
        </div>
      </StyledValueWrapper>
    </StyledContainer>
  );
};

export default memo(Input);
