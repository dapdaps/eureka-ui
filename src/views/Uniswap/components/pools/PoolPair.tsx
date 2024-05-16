import { useRouter } from 'next/router';
import { memo } from 'react';
import styled from 'styled-components';
import TokenIcon from '../TokenIcon';
import { StatusColor } from '../../config';

const StyledWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  .hvc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }
`;
const StyledLeft = styled.div`
  img {
    width: 22px;
    height: 22px;
    border-radius: 100px;
  }
  .ml-1.5 {
    margin-left: -5px;
  }
  .symbol {
    font-size: 20px;
    color: #ffffff;
    font-weight: bold;
    margin: 0 8px;
  }
  .fee {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    height: 24px;
    background-color: #262626;
    font-size: 14px;
    color: #8e8e8e;
    padding: 0 5px;
    margin-right: 7px;
  }
  .point {
    width: 5px;
    height: 5px;
    border-radius: 100px;
    margin-right: 6px;
    background-color: #6efa95;
  }
  .range {
    font-size: 14px;
    color: #6efa95;
    font-weight: bold;
  }
`;
const StyledRight = styled.div`
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Status = styled.div<{ status: 'in' | 'out' | 'removed' }>`
  color: ${({ status }) => StatusColor[status]};
  display: flex;
  align-items: center;
  gap: 4px;
  &::before {
    content: '';
    display: inline;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${({ status }) => StatusColor[status]};
  }
`;

const PoolPair = ({ detail, isReverse, tokenId }: { detail: any; isReverse: boolean; tokenId: string }) => {
  const router = useRouter();
  return (
    <StyledWrap>
      <StyledLeft className="hvc">
        <div className="hvc icon">
          <TokenIcon token={isReverse ? detail.token0 : detail.token1} />
          <TokenIcon
            token={isReverse ? detail.token1 : detail.token0}
            style={{
              marginLeft: '-5px',
            }}
          />
        </div>
        <span className="symbol">
          {isReverse ? detail.token0.symbol : detail.token1.symbol}/
          {isReverse ? detail.token1.symbol : detail.token0.symbol}
        </span>
        <span className="hvc fee">{detail.fee / 10000}%</span>
        <Status status={detail.status}>
          {detail.status === 'removed' ? 'Removed' : detail.status === 'in' ? 'In range' : 'Out range'}
        </Status>
      </StyledLeft>
      <StyledRight className="hvc">
        <StyledLineWrap
          className="hvc"
          onClick={() => {
            router.push('/uniswap/pools-increase-liquidity?id=' + tokenId);
          }}
        >
          Increase liquidity
        </StyledLineWrap>
        {detail.liquidity.gt(0) && (
          <StyledSolidWrap
            className="hvc"
            onClick={() => {
              router.push('/uniswap/pools-remove-liquidity?id=' + tokenId);
            }}
          >
            Remove liquidity
          </StyledSolidWrap>
        )}
      </StyledRight>
    </StyledWrap>
  );
};
export default memo(PoolPair);

const StyledLineWrap = styled.div`
  height: 35px;
  border: 1px solid var(--primary-color);
  background-color: #131313;
  border-radius: 12px;
  padding: 0 12px;
  cursor: pointer;
  color: var(--primary-color);
  @media (max-width: 768px) {
    width: 50%;
    height: 42px;
  }
`;

const StyledSolidWrap = styled.div`
  height: 35px;
  background-color: var(--primary-color);
  border-radius: 12px;
  padding: 0 12px;
  cursor: pointer;
  color: var(--text-color);
  @media (max-width: 768px) {
    width: 50%;
    height: 42px;
  }
`;
