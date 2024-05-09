import styled from 'styled-components';

export const StyledMarketList = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const StyledMarketListItem = styled.div`
  background: #212330;
  border: 1px solid #373A53;
  border-radius: 8px;
  width: 60px;
  height: 54px;
  text-align: center;
  font-size: 12px;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export const StyledItemIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export const StyledItemName = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
`;