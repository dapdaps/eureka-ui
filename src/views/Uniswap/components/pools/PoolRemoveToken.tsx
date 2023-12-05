import { memo } from 'react';
import styled from 'styled-components';
import { balanceFormated } from '@/utils/balance';
import TokenIcon from '../TokenIcon';

const StyledWrap = styled.div`
  border-radius: 12px;
  border: 1px solid #c7bfb6;
  padding: 16px;
  margin-top: 14px;
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
  border-bottom: 1px solid #c7bfb6;
  margin: 0 -16px 0 -16px;
`;
const StyledEarnedFees = styled(StyledBaseUI)`
  margin: 0 -16px 0 -16px;
`;

const PoolRemoveToken = ({
  percent,
  token0,
  token1,
  liquidityToken0,
  liquidityToken1,
  collectToken0,
  collectToken1,
}: any) => {
  return (
    <StyledWrap>
      <StyledPool>
        <RowData
          name={`Pooled ${token0?.symbol}:`}
          value={balanceFormated(Number(liquidityToken0 || 0) * (percent / 100) + '', 4)}
          token={token0}
        />
        <RowData
          name={`Pooled ${token1?.symbol}:`}
          value={balanceFormated(Number(liquidityToken1 || 0) * (percent / 100) + '', 4)}
          token={token1}
        />
      </StyledPool>
      <StyledEarnedFees>
        <RowData name={`${token0?.symbol} Fees Earned:`} value={balanceFormated(collectToken0, 4)} token={token0} />
        <RowData name={`${token1?.symbol} Fees Earned:`} value={balanceFormated(collectToken1, 4)} token={token1} />
      </StyledEarnedFees>
    </StyledWrap>
  );
};

const StyleRowData = styled.div`
    font-size:16px;
    color:#101010;
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
        <TokenIcon token={token} />
      </div>
    </StyleRowData>
  );
};

export default memo(PoolRemoveToken);
