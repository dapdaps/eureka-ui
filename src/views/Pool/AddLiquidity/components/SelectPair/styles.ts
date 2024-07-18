import styled from 'styled-components';

export const StyledSubtitle = styled.div`
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledContainer = styled.div`
  margin-top: 15px;
  color: #ffffff;
`;

export const StyledTokensSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  margin-top: 18px;
`;

export const StyledTokenSelector = styled.div<{ $empty: boolean }>`
  width: 50%;
  height: 48px;
  padding: 11px 17px 11px 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: ${({ $empty }) => ($empty ? 'var(--button-color)' : '#2e3142')};
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

export const StyledToken = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StyledSymbol = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
