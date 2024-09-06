import styled from 'styled-components';

export const StyledButton = styled.button`
  background: var(--agg-primary-color, var(--button-color));
  height: 46px;
  border-radius: 10px;
  color: var(--agg-secondary-color, var(--button-text-color));
  font-size: 18px;
  font-weight: 500;
  border: none;
  width: 100%;
  transition: 0.5s;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
  }

  &.borrow {
    background-color: var(--agg-primary-color, var(--repay-border-color));
    border: 1px solid var(--repay-border-color);
  }

  &.repay {
    background-color: var(--agg-pink-color, var(--repay-bg-hover-color));
    border: 1px solid var(--repay-border-color);
  }
`;
