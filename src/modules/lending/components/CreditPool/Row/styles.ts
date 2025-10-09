import styled from 'styled-components';

export const StyledRow = styled.div`
  margin-bottom: 10px;
`;
export const StyledRowHeader = styled.div`
  border: 1px solid var(--agg-border-color, #373a53);
  height: 84px;
  display: flex;
  align-items: center;
  /* background-color: var(--agg-secondary-color, #262836); */
  padding-left: 22px;
  padding-right: 24px;
  border-radius: 16px;
  cursor: pointer;
`;
export const StyledRowItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
export const StyledExpand = styled.div`
  cursor: pointer;
  transform-origin: center;
  transform: rotate(-90deg);
  transition: 0.3s;

  &.expand {
    transform: rotate(0deg);
  }
`;
