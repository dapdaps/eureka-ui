import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #979abe;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  padding-top: 20px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
