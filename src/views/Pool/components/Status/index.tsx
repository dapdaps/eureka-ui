import Big from 'big.js';
import { memo, useMemo } from 'react';

import Loading from '@/components/Icons/Loading';

import { StyledStatus } from './styles';

const Status = ({ tickLower, tickUpper, liquidity, currentTick, loading, type }: any) => {
  const status = useMemo(() => {
    if (type === 'V2') return 'in';
    if (new Big(liquidity || 0).eq(0)) return 'removed';
    return currentTick < tickLower || currentTick >= tickUpper ? 'out' : 'in';
  }, [currentTick, liquidity, tickLower, tickUpper, loading]);

  return loading ? (
    <Loading />
  ) : (
    <StyledStatus status={status}>
      {status === 'removed' && 'Removed'}
      {status === 'in' && (type === 'V2' ? 'Active' : 'In range')}
      {status === 'out' && 'Out range'}
    </StyledStatus>
  );
};

export default memo(Status);
