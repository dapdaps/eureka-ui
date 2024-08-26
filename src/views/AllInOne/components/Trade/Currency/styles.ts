import styled from 'styled-components';

export const StyledTradeBlock = styled.div`
  background: #262836;
  border: 1px solid #373A53;
  border-radius: 16px;
  padding: 12px 18px;
`;
export const StyledTradeTitle = styled.div`
  color: #979ABE;
  font-size: 14px;`;
export const StyledTradeInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;

  input {
    font-size: 26px;
    color: #fff;
    flex-grow: 1;
    flex-shrink: 0;
  }
`;
export const StyledTradeInput = styled.div`
  flex-shrink: 0;`;

export const StyledSelectToken = styled.div`
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid #373A53;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;

  .arrow-icon {
    color: #979ABE;
  }

`;
export const CurrencyTitle = styled.div`
  flex-grow: 1;
`;
export const CurrencyIcon = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  object-fit: contain;
  flex-shrink: 0;
`;

export const StyledTradeBalance = styled.div<{ underline?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #979ABE;
  font-size: 12px;

  .trade-balance {
    text-decoration: ${props => props?.underline ? 'underline' : 'none'};
  }
`;