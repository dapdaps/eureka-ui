import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 30px;
  border-radius: 4px;
  border: 1px solid #373a53;
  background: #2e3142;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

export const StyledItem = styled.div<{ $active: boolean }>`
  padding: 3px 8px;
  border-radius: 4px;
  color: #979abe;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  cursor: pointer;
  ${({ $active }) =>
    $active &&
    `
    background: #5E617E;
    color: #fff;
  `}
`;
