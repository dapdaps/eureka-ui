import { memo } from 'react';
import styled from 'styled-components';
import SelectToken from './SelectToken';

const StyledSelectPair = styled.div`
  padding: 20px 20px 0px;
`;
const StyledTitle = styled.div`
  font-size: 16px;
  color: #fff;
  margin-bottom: 16px;
`;
const StyledSelectTokens = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;
const SelectPair = ({ token0, token1, onSelectToken }: any) => {
  return (
    <StyledSelectPair>
      <StyledTitle>Select pair</StyledTitle>
      <StyledSelectTokens>
        <SelectToken
          onSelectToken={(token: any) => {
            onSelectToken(token, 0);
          }}
          token={token0}
        />
        <SelectToken
          onSelectToken={(token: any) => {
            onSelectToken(token, 1);
          }}
          token={token1}
        />
      </StyledSelectTokens>
    </StyledSelectPair>
  );
};

export default memo(SelectPair);
