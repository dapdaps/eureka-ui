import Big from 'big.js';
import { memo } from 'react';

import Input from './Input';
import { StyledContainer } from './styles';

const SelectPriceRange = ({
  lowerPrice,
  upperPrice,
  token0,
  token1,
  rangeType,
  isChainSupport,
  onPointChange,
  onPriceChange,
}: any) => {
  return (
    <StyledContainer>
      <Input
        label="Low price"
        desc={`${token1?.symbol || ''} per ${token0?.symbol || ''}`}
        value={lowerPrice === '0' ? '0' : lowerPrice ? Big(lowerPrice).toFixed(4) : ''}
        setValue={(_price: any) => {
          onPriceChange('lower', _price);
        }}
        onButtonClick={(type: 'add' | 'minus') => {
          onPointChange(type, 'lower', lowerPrice);
        }}
        disabled={!token0 || !token1 || !isChainSupport}
        rangeType={rangeType}
      />
      <Input
        label="High price"
        desc={`${token1?.symbol || ''} per ${token0?.symbol || ''}`}
        value={upperPrice === '∞' ? '∞' : upperPrice ? Big(upperPrice).toFixed(4) : ''}
        setValue={(_price: any) => {
          onPriceChange('upper', _price);
        }}
        onButtonClick={(type: 'add' | 'minus') => {
          onPointChange(type, 'upper', upperPrice);
        }}
        disabled={!token0 || !token1 || !isChainSupport}
        rangeType={rangeType}
      />
    </StyledContainer>
  );
};

export default memo(SelectPriceRange);
