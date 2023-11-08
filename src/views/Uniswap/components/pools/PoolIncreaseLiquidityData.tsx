import { DEFAULT_TOKEN_ICON } from '@/config/uniswap/linea';
import { memo } from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #303030;
  border-radius: 16px;
  padding: 16px;
  background-color: #1b1b1b;
  margin-top: 16px;
  .vchb {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hvc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .w-full {
    width: 100%;
  }
  .token {
    gap: 7px;
    img {
      width: 22px;
      height: 22px;
      border-radius: 100px;
    }
    span {
      font-weight: bold;
      color: #fff;
      font-size: 16px;
    }
  }
  .num {
    font-weight: bold;
    color: #fff;
    font-size: 16px;
  }
`;
const PoolIncreaseLiquidityData = ({ token0, token1, value0, value1 }: any) => {
  return (
    <StyledWrap>
      <div className="vchb">
        <div className="hvc token">
          <img src={token0?.icon || DEFAULT_TOKEN_ICON} />
          <span>{token0?.symbol}</span>
        </div>
        <span className="num">{value0}</span>
      </div>
      <div className="vchb">
        <div className="hvc token">
          <img src={token1?.icon || DEFAULT_TOKEN_ICON} />
          <span>{token1?.symbol}</span>
        </div>
        <span className="num">{value1}</span>
      </div>
    </StyledWrap>
  );
};

export default memo(PoolIncreaseLiquidityData);
