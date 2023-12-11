import styled from 'styled-components';
import Big from 'big.js';
import Loading from '@/components/Icons/Loading';
import useToken from '../hooks/useToken';
import usePool from '../hooks/usePool';
import { tickToPrice } from '../utils/tickMath';
import { useMemo } from 'react';
import TokenIcon from './TokenIcon';
import { StatusColor } from '../config';
import { nearestUsableTick } from '../utils/tickMath';

const Record = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #101010;
  text-align: left;
  padding: 20px;
  cursor: pointer;
  .gray {
    color: #8e8e8e;
  }
  &:hover {
    background: #fff0dd;
  }
  @media (max-width: 768px) {
    .gray {
      display: none;
    }
  }
`;
const RecordDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RecordPool = styled.div`
  display: flex;
  gap: 6px;
`;
const RecordRange = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  svg {
    flex-shrink: 0;
  }
`;
const Status = styled.div<{ status: 'in' | 'out' | 'removed' }>`
  color: ${({ status }) => StatusColor[status]};
  display: flex;
  align-items: center;
  gap: 6px;
  &::before {
    content: '';
    display: inline;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${({ status }) => StatusColor[status]};
  }
`;

interface PositionListItemProps {
  token0: string;
  token1: string;
  tokenId: string;
  fee: number;
  liquidity: string;
  tickLower: number;
  tickUpper: number;
  onClick: () => void;
}

export default function PositionItem({
  token0: token0Address,
  token1: token1Address,
  tokenId,
  fee: feeAmount,
  liquidity,
  tickLower,
  tickUpper,
  onClick,
}: PositionListItemProps) {
  const token0 = useToken(token0Address);
  const token1 = useToken(token1Address);
  const { pool, loading } = usePool(token0Address, token1Address, feeAmount, tokenId);

  const status = useMemo(() => {
    if (new Big(liquidity || 0).eq(0)) return 'removed';
    return pool && (pool.currentTick < tickLower || pool.currentTick >= tickUpper) ? 'out' : 'in';
  }, [pool, liquidity, tickLower, tickUpper]);

  const tickArgs = {
    decimals0: token0?.decimals,
    decimals1: token1?.decimals,
    isReverse: false,
  };
  const isFullRange = useMemo(() => {
    if (tickLower === -887272 && tickUpper === 887272) return true;
    if (tickLower === nearestUsableTick(-887272, feeAmount) && tickUpper === nearestUsableTick(887272, feeAmount)) {
      return true;
    }
    return false;
  }, [tickLower, tickUpper, feeAmount]);

  return token0 && token1 ? (
    <Record onClick={onClick}>
      <RecordDetails>
        <RecordPool>
          <TokenIcon token={token1} />
          <TokenIcon token={token0} style={{ marginLeft: '-14px' }} />
          <span>
            {token1.symbol}/{token0.symbol}
          </span>
          <span className="gray">{feeAmount / 10000}%</span>
        </RecordPool>
        {status !== 'removed' && loading && <Loading />}
        {status === 'removed' ? (
          <Status status={status}>Removed</Status>
        ) : (
          !loading && (
            <Status status={status}>
              {status === 'in' && 'In'} {status === 'out' && 'Out'} range
            </Status>
          )
        )}
      </RecordDetails>
      <RecordRange>
        <span className="gray">Min:</span>
        <span className="range-item">
          {isFullRange ? 0 : tickToPrice({ ...tickArgs, tick: tickLower, isReverse: true })} {token1.symbol} per{' '}
          {token0.symbol}
        </span>
        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM1 4.5H17V3.5H1V4.5Z"
            fill="#8E8E8E"
          />
        </svg>
        <span className="gray">Max:</span>
        <span className="range-item">
          {isFullRange ? '∞' : tickToPrice({ ...tickArgs, tick: tickUpper, isReverse: true })} {token1.symbol} per{' '}
          {token0.symbol}
        </span>
      </RecordRange>
    </Record>
  ) : (
    <div />
  );
}
