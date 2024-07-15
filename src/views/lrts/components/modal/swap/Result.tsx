import styled from 'styled-components';
import Slippage from './Slippage';
import Big from 'big.js';

const StyledContainer = styled.div`
  font-family: Orbitron;
  padding-top: 16px;
`;
const StyledItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledDesc = styled.div`
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
`;
const StyledResult = styled.div`
  padding-top: 14px;
  padding-bottom: 30px;
`;
const StyledResultLabel = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
`;
const StyledToken = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const StyledTokenIcon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;
const StyledTokenSymbol = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

export default function Result({ outputCurrency, trade }: any) {
  return (
    <StyledContainer>
      <StyledItem>
        <StyledDesc>swap fee ${trade ? trade.cost : '-'}</StyledDesc>
        {/* <StyledDesc>APR 42.27% —&gt; 4.23%</StyledDesc> */}
      </StyledItem>
      <Slippage />
      <StyledResult>
        <StyledItem>
          <StyledResultLabel>Min. Receive</StyledResultLabel>
          <StyledToken>
            <StyledTokenIcon src={outputCurrency.tokenIcon || '/images/tokens/default_icon.png'} />
            <StyledTokenSymbol>
              ~{trade ? Big(trade.outputAmount).toFixed(4) : '-'} {outputCurrency.symbol}
            </StyledTokenSymbol>
          </StyledToken>
        </StyledItem>
      </StyledResult>
    </StyledContainer>
  );
}
