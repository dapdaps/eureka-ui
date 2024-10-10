import styled from 'styled-components';

export const StyledIconButton = styled.button`
  cursor: pointer;
  padding: 5px;
  background-color: transparent;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

export const StyledContainer = styled.div`
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #3d363d;
  padding: 0px 26px;
`;

export const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-left: 120px;
`;

export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledClearAll = styled.div`
  color: var(--button-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  cursor: pointer;
`;
