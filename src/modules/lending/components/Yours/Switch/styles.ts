import styled from 'styled-components';

export const Switcher = styled.div`
  width: 40px;
  height: 20px;
  box-sizing: border-box;
  background-color: var(--agg-primary-color, #181a27);
  border: 1px solid var(--agg-primary-color, var(--border-color));
  border-radius: 16px;
  cursor: pointer;
  transition: 0.5s;
  display: flex;
  align-items: center;
  &.active {
    background-color: var(--agg-secondary-color, var(--switch-color));
  }
  &.disabled {
    cursor: default;
  }
`;
export const Handler = styled.div`
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  background-color: var(--agg-secondary-color, #979abe);
  border: 1px solid var(--secondary-border-color);
  border-radius: 50%;
  transition: 0.5s;
  transform: translateX(0);
  cursor: pointer;
  &.active {
    transform: translateX(22px);
    background-color: var(--agg-primary-color, #fff);
    border-color: #523f7b;
  }
`;
