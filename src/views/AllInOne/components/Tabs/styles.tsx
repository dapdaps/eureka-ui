import styled from 'styled-components';

export const StyledTabsContainer = styled.div`
  padding: 4px;
  background: #212330;
  border: 1px solid #373A53;
  display: flex;
  align-items: center;
  column-gap: 10px;
  border-radius: 8px;
  font-size: 14px;
  width: fit-content;
  color: #979ABE;

`;
export const StyledTabItem = styled.div`
  min-width: 76px;
  border-radius: 8px;
  padding: 4px 10px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  &.active {
    border: 1px solid #373A53;
    background: #32364B;
    color: #fff;
  }
`;
