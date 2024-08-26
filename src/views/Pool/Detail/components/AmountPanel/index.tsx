import { memo } from 'react';

import { balanceFormated } from '@/utils/balance';

import { StyledPanel, StyledPanelItem, StyledPanelValue, StyledTokenIcon,StyledTokenWrapper } from './styles';

const AmountPanel = ({ token0, token1, amount0, amount1 }: any) => {
  return (
    <StyledPanel>
      <StyledPanelItem>
        <StyledTokenWrapper>
          <StyledTokenIcon src={token0.icon || '/img/default_icon.png'} />
          <StyledPanelValue>{token0.symbol}</StyledPanelValue>
        </StyledTokenWrapper>
        <StyledPanelValue>{balanceFormated(amount0, 6)}</StyledPanelValue>
      </StyledPanelItem>
      <StyledPanelItem>
        <StyledTokenWrapper>
          <StyledTokenIcon src={token1.icon || '/img/default_icon.png'} />
          <StyledPanelValue>{token1.symbol}</StyledPanelValue>
        </StyledTokenWrapper>
        <StyledPanelValue>{balanceFormated(amount1, 6)}</StyledPanelValue>
      </StyledPanelItem>
    </StyledPanel>
  );
};

export default memo(AmountPanel);
