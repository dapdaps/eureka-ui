import { memo } from 'react';

import { balanceFormated } from '@/utils/balance';

import {
  StyledContainer,
  StyledSubtitle,
  StyledToken,
  StyledTokenAmount,
  StyledTokenIcon,
  StyledTokens,
  StyledTokenTitle,
} from './styles';

const CurrentAmount = ({ token0, token1, amount0, amount1 }: any) => {
  return (
    <StyledContainer>
      <StyledSubtitle>Current Amount</StyledSubtitle>
      <StyledTokens>
        <StyledToken>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledTokenIcon src={token0.icon} />
            <StyledTokenTitle>{token0.symbol}</StyledTokenTitle>
          </div>
          <StyledTokenAmount>{balanceFormated(amount0, 6)}</StyledTokenAmount>
        </StyledToken>
        <StyledToken>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledTokenIcon src={token1.icon} />
            <StyledTokenTitle>{token1.symbol}</StyledTokenTitle>
          </div>
          <StyledTokenAmount>{balanceFormated(amount1, 6)}</StyledTokenAmount>
        </StyledToken>
      </StyledTokens>
    </StyledContainer>
  );
};

export default memo(CurrentAmount);
