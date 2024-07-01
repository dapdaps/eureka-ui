import { memo, useMemo } from 'react';
import Big from 'big.js';
import Loading from '@/components/Icons/Loading';
import { StyledStatus } from './styles';

const Status = ({ from, rangeType, tickLower, tickUpper, liquidity, currentTick, loading, type }: any) => {
  const status = useMemo(() => {
    if (type === 'V2') return 'in';
    if (from === 'add') {
      return [1, 2].includes(rangeType) ? 'out' : 'in';
    }
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
