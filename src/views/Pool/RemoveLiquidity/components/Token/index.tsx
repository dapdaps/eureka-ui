import { memo } from 'react';
import styled from 'styled-components';

import { balanceFormated } from '@/utils/balance';

const StyledTokenIcon = styled.img`
  width: 22px;
  height: 22px;
`;

const StyledWrap = styled.div`
  border-radius: 4px;
  border: 1px solid #373a53;
  margin-top: 10px;
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
`;
const StyledBaseUI = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
  gap: 22px;
`;
const StyledPool = styled(StyledBaseUI)`
  border-bottom: 1px solid #373a53;
`;
const StyledEarnedFees = styled(StyledBaseUI)``;

const PoolRemoveToken = ({
  percent = 0,
  token0,
  token1,
  amount0 = 0,
  amount1 = 0,
  feeAmount0 = 0,
  feeAmount1 = 0,
  type,
}: any) => {
  return (
    <StyledWrap>
      <StyledPool>
        <RowData
          name={`Pooled ${token0?.symbol}:`}
          value={balanceFormated(Number(amount0 || 0) * (percent / 100) + '', 4)}
          token={token0}
        />
        <RowData
          name={`Pooled ${token1?.symbol}:`}
          value={balanceFormated(Number(amount1 || 0) * (percent / 100) + '', 4)}
          token={token1}
        />
      </StyledPool>
      {type !== 'V2' && (
        <StyledEarnedFees>
          <RowData name={`${token0?.symbol} Fees Earned:`} value={balanceFormated(feeAmount0, 4)} token={token0} />
          <RowData name={`${token1?.symbol} Fees Earned:`} value={balanceFormated(feeAmount1, 4)} token={token1} />
        </StyledEarnedFees>
      )}
    </StyledWrap>
  );
};

const StyleRowData = styled.div`
    font-size:16px;
    color:#fff;
    font-weight:500;
    .value{
      gap:10px;
      img{
        width:22px;
        height:22px;
        border-radius:100px;
      }
    }
  }
`;
const RowData = ({ name, value, token }: { name: string; value: string; token: any }) => {
  return (
    <StyleRowData className="vchb">
      <span className="text">{name}</span>
      <div className="hvc value">
        <span>{value}</span>
        <StyledTokenIcon src={token?.icon} />
      </div>
    </StyleRowData>
  );
};

export default memo(PoolRemoveToken);
