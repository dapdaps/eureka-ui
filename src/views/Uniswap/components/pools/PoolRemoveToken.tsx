import { memo } from 'react';
import styled from 'styled-components';
import { balanceFormated } from '@/utils/balance';
import TokenIcon from '../TokenIcon';

const StyledWrap = styled.div`
  border: 1px solid #303030;
  background-color: #1b1b1b;
  border-radius: 16px;
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
  border-bottom: 1px solid #303030;
  margin: 0 -16px 0 -16px;
`;
const StyledEarnedFees = styled(StyledBaseUI)`
  margin: 0 -16px 0 -16px;
`;
const StyledCollect = styled.div`
  font-size: 16px;
  color: #8e8e8e;
  margin-top: 21px;
`;
const PoolRemoveToken = ({ token0, token1, liquidityToken0, liquidityToken1, collectToken0, collectToken1 }: any) => {
  return (
    <StyledWrap>
      <StyledPool>
        <RowData name={`Pooled ${token0?.symbol}:`} value={balanceFormated(liquidityToken0, 4)} token={token0} />
        <RowData name={`Pooled ${token1?.symbol}:`} value={balanceFormated(liquidityToken1, 4)} token={token1} />
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
    color:#fff;
    font-weight:bold;
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
