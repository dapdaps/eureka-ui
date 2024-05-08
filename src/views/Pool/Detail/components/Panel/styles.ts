import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 396px;
  height: 228px;
  border-radius: 10px;
  border: 1px solid #373a53;
  background: #262836;
  box-sizing: border-box;
  padding: 20px 14px 16px;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const StyledValue = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 12px;
`;

export const StyledAmount = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledInt = styled.span`
  font-size: 30px;
`;

export const StyledFloat = styled.span`
  font-size: 26px;
`;

export const StyledPanel = styled.div`
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  padding: 12px;
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 92px;
  box-sizing: border-box;
`;

export const StyledPanelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StyledTokenIcon = styled.img`
  width: 26px;
  height: 26px;
`;

export const StyledTokenValue = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledTokenPercent = styled.div`
  color: #8d8d8d;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
