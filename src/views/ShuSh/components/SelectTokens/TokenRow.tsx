import { memo } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  height: 54px;
  padding: 14px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: rgba(151, 154, 190, 0.1);
  }
`;

const StyledTokenWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledTokenLogo = styled.img`
  width: 26px;
  height: 26px;
  flex-shrink: 0;
`;

const StyledTokenSymbol = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const StyledBalance = styled.div`
  color: #fff;
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TokenRow = ({ token, onClick }: any) => {
  return (
    <StyledContainer onClick={onClick}>
      <StyledTokenWrapper>
        <StyledTokenLogo src={token.icon} />
        <StyledTokenSymbol>{token.displayName}</StyledTokenSymbol>
      </StyledTokenWrapper>
      {/* <StyledBalance>123.4534</StyledBalance> */}
    </StyledContainer>
  );
};

export default memo(TokenRow);
