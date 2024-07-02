import styled from 'styled-components';

export { LoadingWrapper } from '../styles';

export { StyledHeader, StyledRow, StyledPool, StyledIcons, StyledIcon, StyledTitle } from '../Pools/styles';

export const StyledContainer = styled.div`
  padding-top: 18px;

  .gary {
    color: #979abe;
  }
`;

const StyledButton = styled.button`
  width: 107px;
  height: 36px;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.5s;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;

export const StyledPrimaryButton = styled(StyledButton)`
  background: #ff4500;
`;

export const StyledGhostButton = styled(StyledButton)`
  border: 1px solid #ff4500;
  background: transparent;
`;

export const StyledRange = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledHandler = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
