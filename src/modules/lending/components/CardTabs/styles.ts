import styled from 'styled-components';

export const StyledTabs = styled.div`
  height: 40px;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: var(--agg-secondary-color, rgba(33, 35, 48, 0.5));
  display: flex;
  align-items: center;
`;
export const StyledTab = styled.div`
  height: 32px;
  line-height: 32px;
  padding: 0px 15px;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;
  /* border: 1px solid rgba(33, 35, 48, 0.5); */
  box-sizing: border-box;

  &.active {
    color: #fff;
    border-radius: 8px;
    /* border: 1px solid #373a53; */
    background: var(--agg-primary-color, #32364b);
  }

  &:hover {
    opacity: 0.8;
  }
`;
