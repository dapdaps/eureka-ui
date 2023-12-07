import { memo } from 'react';
import styled from 'styled-components';
import { StatusColor } from '../../config';
import TokenIcon from '../TokenIcon';

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
    margin-top: 0px;
  }
`;
const StyledLeft = styled.div`
  img {
    width: 22px;
    height: 22px;
    border-radius: 100px;
  }
  .symbol {
    font-size: 20px;
    color: #101010;
    font-weight: bold;
    margin: 0 8px;
  }
  .fee {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    height: 24px;
    background-color: rgba(38, 38, 38, 0.2);
    font-size: 14px;
    color: #101010;
    padding: 0 5px;
    margin-right: 7px;
  }
`;
const StyledRight = styled.div`
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
const PoolPair = ({ status, token0, token1, fee }: any) => {
  return (
    <StyledWrap>
      <StyledLeft className="hvc">
        <div className="hvc icon">
          {token0 && <TokenIcon token={token0} />}
          {token1 && <TokenIcon token={token1} style={{ marginLeft: '-5px' }} />}
        </div>
        <span className="symbol">
          {token0?.symbol}/{token1?.symbol}
        </span>
        <span className="hvc fee">{fee / 10000}%</span>
      </StyledLeft>
      <StyledRight className="hvc">
        <Status status={status}>{status === 'in' ? 'In range' : 'Out range'}</Status>
      </StyledRight>
    </StyledWrap>
  );
};
export default memo(PoolPair);
