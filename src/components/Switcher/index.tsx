import { memo } from 'react';
import styled from 'styled-components';

const StyledSwitcher = styled.div`
  width: 42px;
  height: 20px;
  box-sizing: border-box;
  background-color: #2e3142;
  border: 1px solid #373a53;
  border-radius: 16px;
  cursor: pointer;
  transition: 0.5s;
  display: flex;
  align-items: center;
  padding: 2px;
  &.active {
  }
  &.disabled {
    cursor: default;
  }
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

const Handler = styled.div`
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 50%;
  transition: 0.5s;
  transform: translateX(0);
  cursor: pointer;
  &.active {
    transform: translateX(20px);
    background-color: var(--switch-color);
  }
`;

const Switcher = ({ active, onChange, disabled }: any) => {
  return (
    <StyledSwitcher
      onClick={() => {
        onChange?.();
      }}
      className={`${active && 'active'} ${disabled && 'disabled'}`}
    >
      <Handler className={active && 'active'} />
    </StyledSwitcher>
  );
};

export default memo(Switcher);
