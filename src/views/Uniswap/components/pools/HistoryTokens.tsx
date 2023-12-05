import { memo } from 'react';
import styled from 'styled-components';
import TokenIcon from '../TokenIcon';

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
            token={token}
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
  border: 1px solid #a49b9a;
  padding: 7px 20px 7px 7px;
  background: #eee;
  gap: 8px;
  border-radius: 6px;
  cursor: pointer;
  img {
    width: 22px;
    height: 22px;
    border-radius: 100px;
  }
  .symbol {
    font-size: 16px;
    color: #101010;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    background: #1b1b1b;
  }
`;
const TokenElement = ({ token, onClick }: any) => {
  return (
    <StyledTokenWrap onClick={onClick}>
      <TokenIcon token={token} />
      <span className="symbol">{token?.symbol}</span>
    </StyledTokenWrap>
  );
};
export default memo(HistoryTokens);
