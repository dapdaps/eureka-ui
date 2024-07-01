import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 26px;
  border-radius: 4px;
  border: 1px solid #373a53;
  background: #2e3142;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
`;

export const StyledItem = styled.div<{ $active: boolean }>`
  padding: 4px 14px;
  transition: 0.3s;
  cursor: pointer;
  border-radius: 4px;

  ${({ $active }) =>
    $active &&
    `
  border: 1px solid #373A53;
  background: #262836;
  `}

  &:hover {
    background: rgba(38, 40, 54, 0.5);
  }
`;
