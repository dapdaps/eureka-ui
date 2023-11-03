import styled from 'styled-components';

const StyledTokensSelect = styled.div`
  display: flex;
  gap: 10px;
`;
const TokenSelect = styled.div`
  width: 50%;
  height: 45px;
  border-radius: 16px;
  border: 1px solid #3d363d;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const TokenWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const TokenIcon = styled.img`
  width: 22px;
  height: 22px;
`;
const TokenSymbol = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #fff;
`;

export default function TokensSelect() {
  return (
    <StyledTokensSelect>
      <TokenSelect>
        <TokenWrapper>
          <TokenIcon src="https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694" />
          <TokenSymbol>ETH</TokenSymbol>
        </TokenWrapper>
        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5.5 5.5L10 1" stroke="white" stroke-width="2" />
        </svg>
      </TokenSelect>
      <TokenSelect>
        <TokenWrapper>
          <TokenIcon src="https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694" />
          <TokenSymbol>ETH</TokenSymbol>
        </TokenWrapper>
        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5.5 5.5L10 1" stroke="white" stroke-width="2" />
        </svg>
      </TokenSelect>
    </StyledTokensSelect>
  );
}
