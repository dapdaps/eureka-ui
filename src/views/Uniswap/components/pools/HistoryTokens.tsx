import { memo } from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 14px;
  margin-top: 16px;
`;
const HistoryTokens = () => {
  const tokenList = [
    { symbol: 'ETH' },
    { symbol: 'DAI' },
    { symbol: 'USDC' },
    { symbol: 'USDT' },
    { symbol: 'WBTC' },
    { symbol: 'WETH' },
  ];
  return (
    <StyledWrap>
      {tokenList.map((token) => {
        return <TokenElement key={token.symbol} symbol={token.symbol} />;
      })}
    </StyledWrap>
  );
};

const StyledTokenWrap = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  border: 1px solid #303030;
  padding: 7px 20px 7px 7px;
  gap: 8px;
  border-radius: 18px;
  cursor: pointer;
  img {
    width: 22px;
    height: 22px;
    border-radius: 100px;
  }
  .symbol {
    font-size: 16px;
    color: #fff;
    font-weight: 600;
  }
`;
const TokenElement = ({ symbol }: { symbol: string }) => {
  return (
    <StyledTokenWrap>
      <img src="" />
      <span className="symbol">{symbol}</span>
    </StyledTokenWrap>
  );
};
export default memo(HistoryTokens);
