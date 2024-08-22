import { memo } from 'react';

import TokenSwitcher from '@/views/Pool/components/TokenSwitcher';

import Input from './Input';
import { StyledContainer, StyledFullRange,StyledHeader, StyledHeaderActions, StyledSubtitle } from './styles';

const SelectPriceRange = ({
  lowerPrice,
  upperPrice,
  token0,
  token1,
  reverse,
  rangeType,
  onExchangeTokens,
  onPointChange,
  onPriceChange,
}: any) => {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledSubtitle>Set price range</StyledSubtitle>
        <StyledHeaderActions>
          <StyledFullRange
            onClick={() => {
              if (!token0 || !token1) return;
              onPriceChange('lower', '0');
              onPriceChange('upper', '∞');
            }}
          >
            Full range
          </StyledFullRange>
          {token0 && token1 && (
            <TokenSwitcher token0={token0} token1={token1} reverse={!reverse} onExchangeTokens={onExchangeTokens} />
          )}
        </StyledHeaderActions>
      </StyledHeader>
      <Input
        label="Low price"
        desc={`${token1?.symbol || ''} per ${token0?.symbol || ''}`}
        value={lowerPrice}
        setValue={(_price: any) => {
          onPriceChange('lower', _price);
        }}
        onButtonClick={(type: 'add' | 'minus') => {
          onPointChange(type, 'lower', lowerPrice);
        }}
        disabled={!token0 || !token1}
        rangeType={rangeType}
      />
      <Input
        label="High price"
        desc={`${token1?.symbol || ''} per ${token0?.symbol || ''}`}
        value={upperPrice}
        setValue={(_price: any) => {
          onPriceChange('upper', _price);
        }}
        onButtonClick={(type: 'add' | 'minus') => {
          onPointChange(type, 'upper', upperPrice);
        }}
        disabled={!token0 || !token1}
        rangeType={rangeType}
      />
    </StyledContainer>
  );
};

export default memo(SelectPriceRange);
