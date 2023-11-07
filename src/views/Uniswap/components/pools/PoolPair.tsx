import { useRouter } from 'next/router';
import { memo } from 'react';
import styled from 'styled-components';
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

const PoolPair = ({ detail, isReverse }: { detail: any; isReverse: boolean }) => {
  const router = useRouter();
  return (
    <StyledWrap>
      <StyledLeft className="hvc">
        <div className="hvc icon">
          <img src={isReverse ? detail.token0.icon : detail.token1.icon} />
          <img src={isReverse ? detail.token1.icon : detail.token0.icon} className="ml-1.5" />
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
            router.push('/linea/uniswap/pools-add-liquidity');
          }}
        >
          Increase liquidity
        </StyledLineWrap>
        {detail.liquidity.gt(0) && (
          <StyledSolidWrap className="hvc" onClick={() => {}}>
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
  border: 1px solid #5ee0ff;
  background-color: #131313;
  border-radius: 12px;
  padding: 0 12px;
  cursor: pointer;
  color: #5ee0ff;
`;

const StyledSolidWrap = styled.div`
  height: 35px;
  background-color: #5ee0ff;
  border-radius: 12px;
  padding: 0 12px;
  cursor: pointer;
  color: #131313;
`;
