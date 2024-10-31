import styled from 'styled-components';

export const StyledInfo = styled.div`
  width: 520px;
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
`;
export const StyledInfoContent = styled.div`
  width: 390px;
`;
export const StyledInfoList = styled.div``;
export const StyledInfoTitle = styled.div`
  color: #fff;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-bottom: 16px;
`;
export const StyledInfoItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  & .white {
    color: #fff;
  }
`;
export const StyledLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #fff;
`;
export const StyledInfoTips = styled.div`
  width: 390px;
  height: 52px;
  display: flex;
  padding: 9px 14px 0px;
  background-color: var(--agg-hover-color, rgba(235, 244, 121, 0.1));
  border-radius: 12px;
  gap: 10px;
  color: var(--agg-thirdry-color, #ebf479);

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 26px;
`;

export const StyledBorrowInfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: white;
  margin-bottom: 10px;
`;
export const StyledBorrowInfoKey = styled.div`
  color: #979abe;
`;
