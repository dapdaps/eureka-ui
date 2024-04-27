import { memo } from 'react';
import { StyledContainer, StyledItem } from './styles';

const TokenSwitcher = ({ token0, token1, reverse, onExchangeTokens }: any) => {
  return (
    <StyledContainer onClick={onExchangeTokens}>
      <StyledItem $active={!reverse}>{token0?.symbol}</StyledItem>
      <StyledItem $active={reverse}>{token1?.symbol}</StyledItem>
    </StyledContainer>
  );
};

export default memo(TokenSwitcher);
