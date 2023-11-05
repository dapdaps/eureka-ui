import { memo } from 'react';
import styled from 'styled-components';

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
const PoolPair = () => {
  return (
    <StyledWrap>
      <StyledLeft className="hvc">
        <div className="hvc icon">
          <img src="" />
          <img src="" className="ml-1.5" />
        </div>
        <span className="symbol">ETH/USDC</span>
        <span className="hvc fee">0.05%</span>
      </StyledLeft>
      <StyledRight className="hvc">
        <div className="hvc">
          <span className="point"></span>
          <span className="range">In range</span>
        </div>
      </StyledRight>
    </StyledWrap>
  );
};
export default memo(PoolPair);
