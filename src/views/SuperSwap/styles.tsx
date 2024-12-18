import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  flex-direction: column;

  .price-impact-0 {
    color: #33b65f;
  }
  .price-impact-1 {
    color: #f88c39;
  }
  .price-impact-2 {
    color: #e956a6;
  }
`;

export const StyledMain = styled.div`
  position: relative;
  padding-right: 348px;
`;

export const StyledContent = styled.div`
  width: 648px;
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #262836;
  padding: 20px 30px;
  height: 100%;
`;

export const StyledInputs = styled.div`
  position: relative;
`;

export const StyledTradeIcon = styled.div<{ disabled?: boolean }>`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 4px solid #16181d;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2e3142;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ disabled }) => (disabled ? '#2E3142' : '#1f212d')};
  }
`;

export const StyledTradeFooter = styled.div`
  color: #53577b;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

export const StyledBestPrice = styled.div`
  display: inline-block;
  border-radius: 4px;
  background: rgba(51, 182, 95, 0.1);
  padding: 5px;
  color: #33b65f;
  text-align: right;
  font-family: Montserrat;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;
