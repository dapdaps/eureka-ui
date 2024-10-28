import styled from 'styled-components';

export const StyledRow = styled.div`
  margin-bottom: 10px;
`;
export const StyledRowHeader = styled.div`
  border: 1px solid #373a53;
  height: 84px;
  display: flex;
  align-items: center;
  background-color: #262836;
  padding-left: 22px;
  padding-right: 24px;
  border-radius: 16px;
  cursor: pointer;
`;
export const StyledRowItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: #fff;
`;
export const StyledExpand = styled.div`
  cursor: pointer;
  transform-origin: center;
  transform: rotate(-90deg);
  transition: 0.3s;
`;
export const StyledAssets = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  overflow: hidden;
  position: relative;
  flex: 1;
`;
export const StyledAssetMore = styled.div`
  display: block;
  text-align: center;
  width: 22px;
  height: 22px;
  line-height: 11px;
  border-radius: 50%;
  border: 1px solid #333648 !important;
  background: #18191e;
  color: #333648;
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;
export const StyledAssetIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
