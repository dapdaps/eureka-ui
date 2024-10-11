import { memo, useState } from 'react';

import TokenSwitcher from '@/views/Pool/components/TokenSwitcher';

import Input from './Input';
import {
  StyledContainer,
  StyledFullRange,
  StyledHeader,
  StyledHeaderAction,
  StyledHeaderActions,
  StyledSubtitle
} from './styles';

const SelectPriceRange = ({
  lowerPrice,
  upperPrice,
  token0,
  token1,
  reverse,
  rangeType,
  from,
  onExchangeTokens,
  onPointChange,
  onPriceChange,
  onSetPriceByTick
}: any) => {
  const [percent, setPercent] = useState(0);
  return (
    <StyledContainer>
      {from !== 'campaign' ? (
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
      ) : (
        <StyledHeaderActions>
          {[
            { label: '10%', value: 0.1 },
            { label: '20%', value: 0.2 },
            { label: '50%', value: 0.5 },
            { label: 'Full range', value: 1 }
          ].map((item, i) => (
            <StyledHeaderAction
              key={i}
              className={`${item.value === percent ? 'border-[#fff]' : 'border-[#373A53]'}`}
              onClick={() => {
                if (!token0 || !token1) return;
                if (item.value === 1) {
                  onPriceChange('lower', '0');
                  onPriceChange('upper', '∞');
                } else {
                  onSetPriceByTick(item.value);
                }
                setPercent(item.value);
              }}
            >
              {item.label}
            </StyledHeaderAction>
          ))}
        </StyledHeaderActions>
      )}
      <div className={`flex gap-[10px] ${from !== 'campaign' && 'flex-col'}`}>
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
      </div>
    </StyledContainer>
  );
};

export default memo(SelectPriceRange);
