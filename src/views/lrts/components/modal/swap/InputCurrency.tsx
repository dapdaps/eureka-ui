import styled from 'styled-components';
import TokenSelector from './TokenSelector';

const StyledContainer = styled.div`
  font-family: Orbitron;
  font-weight: 500;
`;
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledLabel = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
`;
const StyledHeaderPrice = styled.div`
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
`;
const StyledInputWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 68px;
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  background: #272727;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  align-items: center;
`;
const StyledInput = styled.input`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-right: 10px;
  flex-grow: 1;
`;
const StyledMax = styled.button`
  width: 42px;
  line-height: 26px;
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  text-align: center;
  background: transparent;
  margin-right: 12px;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
export const StyleTokenIcon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin-right: 10px;
`;
export const StyledTokenSymbol = styled.div`
  color: #fff;
  text-align: right;
  font-size: 16px;
  font-weight: 700;
`;

export default function InputCurrency({ mt, label, currency, value, loading, onChange, onMax, tokens, onSelect }: any) {
  return (
    <StyledContainer style={{ marginTop: mt }}>
      <StyledHeader>
        <StyledLabel>{label}</StyledLabel>
        {label === 'To' && <StyledHeaderPrice>1 rstETH = 1 ezETH</StyledHeaderPrice>}
      </StyledHeader>
      <StyledInputWrapper>
        <StyledInput
          value={value || ''}
          onChange={(ev) => {
            if (isNaN(Number(ev.target.value))) return;
            onChange?.(ev.target.value);
          }}
        />
        {label === 'Swap from' && (
          <>
            <StyledMax
              onClick={() => {
                if (loading) return;
                onMax();
              }}
            >
              Max
            </StyledMax>
            <StyleTokenIcon src={currency.tokenIcon || '/images/tokens/default_icon.png'} />
            <StyledTokenSymbol>{currency.symbol}</StyledTokenSymbol>
          </>
        )}
        {label === 'To' && <TokenSelector currency={currency} onSelect={onSelect} tokens={tokens} />}
      </StyledInputWrapper>
    </StyledContainer>
  );
}
