import styled from 'styled-components';

export const StyledTradeBlock = styled.div`
  border-radius: 10px;
  border: 1px solid #373a53;
`;
export const StyledHeader = styled.div`
  height: 40px;
  padding: 12px 16px;
  color: #53577b;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #979abe;
`;

export const StyledTradeTitle = styled.div`
  color: #979abe;
  font-size: 14px;
`;

export const StyledTradeContent = styled.div`
  padding: 10px 16px;
  border-radius: 0px 0px 10px 10px;
  transition: 0.5s;
`;

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
    font-weight: 600;
  }
`;
export const StyledTradeInput = styled.div`
  flex-shrink: 0;
`;

export const StyledSelectToken = styled.div`
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid #373a53;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
  color: #fff;

  .arrow-icon {
    color: #fff;
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
  color: #979abe;
  font-size: 12px;

  .trade-balance {
    text-decoration: ${(props) => (props?.underline ? 'underline' : 'none')};
    &:hover {
      color: #fff;
      cursor: pointer;
    }
  }
`;

export const StyledActionButton = styled.button`
  transition: 0.5s;
  cursor: pointer;
  background: transparent;
  color: #53577b;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
