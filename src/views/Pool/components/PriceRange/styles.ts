import styled from 'styled-components';

export const StyledContainer = styled.div<{ $from?: string }>`
  margin-top: 20px;
  ${({ $from }) =>
    $from === 'detail' &&
    `
    border-radius: 10px;
    border: 1px solid #373A53;
    background: #262836;
    padding: 20px;
    `}
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTop = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const StyledCard = styled.div`
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  height: 112px;
  flex-grow: 1;
  padding: 18px 0px;
  text-align: center;
  box-sizing: border-box;
  margin-top: 14px;
`;

export const StyledCardTitle = styled.div`
  color: #979abe;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const StyledCardValue = styled.div`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 8px;
`;

export const StyledCardDesc = styled.div`
  color: #8d8d8d;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 2px;
`;

export const StyledSubtitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
