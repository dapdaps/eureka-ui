import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 854px;
  margin: 0px auto;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledContent = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 232px;
  color: #101010;
`;

export const StyledContentTop = styled.div`
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 0px 20px;
`;

export const StyledTogglePositions = styled.button`
  padding: 0px 8px;
  height: 26px;
  border-radius: 4px;
  border: 1px solid #373a53;
  background: #2e3142;
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

export const StyledTopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
