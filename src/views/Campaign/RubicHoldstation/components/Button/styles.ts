import styled from 'styled-components';

export const StyledContainer = styled.button`
  border-radius: 10px;
  background: #ebf479;
  height: 52px;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  padding: 0 35px;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
