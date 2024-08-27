import { memo } from 'react';

import { sortTokens } from '@/views/Pool/utils/token';

import { StyledContainer, StyledItem } from './styles';

const TokenSwitcher = ({ token0, token1, reverse, onExchangeTokens }: any) => {
  const [_token0, _token1] = sortTokens(token0, token1);
  return (
    <StyledContainer onClick={onExchangeTokens}>
      <StyledItem $active={!reverse}>{_token0?.symbol}</StyledItem>
      <StyledItem $active={reverse}>{_token1?.symbol}</StyledItem>
    </StyledContainer>
  );
};

export default memo(TokenSwitcher);
