import { memo } from 'react';
import styled from 'styled-components';
import { DEFAULT_TOKEN_ICON } from '@/config/uniswap/linea';

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 14px;
  margin-top: 16px;
`;
const HistoryTokens = ({ tokens, onSelectToken }: any) => {
  return (
    <StyledWrap>
      {tokens.map((token: any) => {
        return (
          <TokenElement
            key={token.symbol}
            symbol={token.symbol}
            icon={token.icon}
            onClick={() => {
              onSelectToken(token);
            }}
          />
        );
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
const TokenElement = ({ symbol, icon, onClick }: any) => {
  return (
    <StyledTokenWrap onClick={onClick}>
      <img src={icon || DEFAULT_TOKEN_ICON} />
      <span className="symbol">{symbol}</span>
    </StyledTokenWrap>
  );
};
export default memo(HistoryTokens);
