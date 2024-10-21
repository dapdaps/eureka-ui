import styled from 'styled-components';

export const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;
export const StyledCol = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`;
export const StyledAsset = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const StyledAssetItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const StyledAssetIcon = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`;
export const StyledAssetName = styled.div`
  .symbol {
    color: #fff;
    font-size: 16px;
  }
`;
export const StyledAssetValue = styled.div`
  .amount {
    color: #fff;
    font-size: 16px;
  }
`;
export const StyledInfoWrapper = styled.div`
  width: 520px;
  display: flex;
  gap: 50px;
  padding-left: 60px;
`;
export const StyledContent = styled.div`
  width: 100%;
`;
export const StyledBody = styled.div`
  display: flex;
  padding-top: 30px;
  padding-left: 22px;
  padding-right: 24px;
`;
