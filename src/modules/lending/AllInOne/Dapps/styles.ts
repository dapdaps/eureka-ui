import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  flex-wrap: nowrap;
  gap: 10px;
`;
export const StyledMarket = styled.button`
  background: rgb(33, 35, 48);
  border: 1px solid rgb(55, 58, 83);
  border-radius: 8px;
  width: 60px;
  height: 54px;
  text-align: center;
  font-size: 12px;
  color: rgb(151, 154, 190);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.15s;

  &.active,
  &:hover {
    background: rgb(50, 54, 75);
    color: rgb(255, 255, 255);
  }
`;
export const StyledMarketName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 2px;
  width: 100%;
`;
