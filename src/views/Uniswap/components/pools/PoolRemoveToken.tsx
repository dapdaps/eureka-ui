import { memo, useState } from 'react';
import styled from 'styled-components';

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
const PoolRemoveToken = () => {
  return (
    <StyledWrap>
      <StyledPool>
        <RowData name="Pooled ETH:" value="0" />
        <RowData name="Pooled USDC:" value="0.7773" />
      </StyledPool>
      <StyledEarnedFees>
        <RowData name="ETH Fees Earned:" value="0.002462" />
        <RowData name="USDC Fees Earned:" value="0.00001223" />
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
const RowData = ({ name, value }: { name: string; value: string }) => {
  return (
    <StyleRowData className="vchb">
      <span className="text">{name}</span>
      <div className="hvc value">
        <span>{value}</span>
        <img src="" />
      </div>
    </StyleRowData>
  );
};

export default memo(PoolRemoveToken);
