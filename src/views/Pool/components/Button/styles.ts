import styled from 'styled-components';

export const StyledContainer = styled.button`
  border-radius: 6px;
  background: var(--button-color, #ebf479);
  color: var(--button-text-color, #fff);
  text-align: center;
  font-style: normal;
  font-weight: 600;
  transition: 0.5s;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }

  &:not(:disabled):active {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.3;
  }
`;
