import { memo } from 'react';

import ArrowDownIcon from '@/components/Icons/ArrowIcon';
import TokenIcon from '@/views/Pool/components/TokenIcon';

import {
  StyledContainer,
  StyledSubtitle,
  StyledSymbol,
  StyledToken,
  StyledTokenSelector,
  StyledTokensSelector,
} from './styles';

const SelectPair = ({ token0, token1, onSelectToken }: any) => {
  return (
    <StyledContainer>
      <StyledSubtitle>Select pair</StyledSubtitle>
      <StyledTokensSelector>
        <StyledTokenSelector
          $empty={!token0}
          onClick={() => {
            onSelectToken(0);
          }}
        >
          <StyledToken>
            {token0 && <TokenIcon token={token0} size={26} />}
            <StyledSymbol>{token0?.symbol || 'Select Token'}</StyledSymbol>
          </StyledToken>
          <ArrowDownIcon />
        </StyledTokenSelector>
        <StyledTokenSelector
          $empty={!token1}
          onClick={() => {
            onSelectToken(1);
          }}
        >
          <StyledToken>
            {token1 && <TokenIcon token={token1} size={26} />}
            <StyledSymbol>{token1?.symbol || 'Select a token'}</StyledSymbol>
          </StyledToken>
          <ArrowDownIcon />
        </StyledTokenSelector>
      </StyledTokensSelector>
    </StyledContainer>
  );
};

export default memo(SelectPair);
