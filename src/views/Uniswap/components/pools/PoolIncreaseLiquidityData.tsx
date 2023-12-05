import { memo } from 'react';
import styled from 'styled-components';
import TokenIcon from '../TokenIcon';
import { balanceFormated } from '@/utils/balance';

const StyledWrap = styled.div<{ $type?: string }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 16px;
  padding: 16px;
  margin-top: 16px;
  background-color: ${({ $type }) => ($type !== '1' ? '#fff0dd' : '#FFE6C7')};
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
      color: #101010;
      font-size: 16px;
    }
  }
  .num {
    font-weight: bold;
    color: #101010;
    font-size: 16px;
  }
`;
const PoolIncreaseLiquidityData = ({ token0, token1, value0, value1, type }: any) => {
  return (
    <StyledWrap $type={type}>
      <div className="vchb">
        <div className="hvc token">
          {token0 && <TokenIcon token={token0} />}
          <span>{token0?.symbol}</span>
        </div>
        <span className="num">{balanceFormated(value0, 4)}</span>
      </div>
      <div className="vchb">
        <div className="hvc token">
          {token1 && <TokenIcon token={token1} />}
          <span>{token1?.symbol}</span>
        </div>
        <span className="num">{balanceFormated(value1, 4)}</span>
      </div>
    </StyledWrap>
  );
};

export default memo(PoolIncreaseLiquidityData);
