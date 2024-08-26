import Big from 'big.js';
import { memo } from 'react';

import Button from '@/views/Pool/components/Button';

import { StyledContainer } from './styles';

const Actions = ({ onIncrease, onRemove, liquidity }: any) => {
  return (
    <StyledContainer>
      <Button
        style={{
          width: 139,
          height: 36,
        }}
        onClick={onIncrease}
      >
        Increase
      </Button>
      {new Big(liquidity || 0).gt(0) && (
        <Button
          style={{
            width: 139,
            height: 36,
            background: '#131313',
            border: '1px solid var(--border-color)',
          }}
          onClick={onRemove}
        >
          Remove
        </Button>
      )}
    </StyledContainer>
  );
};

export default memo(Actions);
