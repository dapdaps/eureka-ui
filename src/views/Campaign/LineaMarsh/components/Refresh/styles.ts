import styled from 'styled-components';

export const StyledContainer = styled.button`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(151, 154, 190, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: rgba(151, 154, 190, 0.1);
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &.loading {
    cursor: not-allowed;
  }
`;
