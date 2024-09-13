import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding-top: 142px;
`;

export const StyledBanner = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
  margin-left: 90px;
`;

export const StyledTitle = styled.div`
  margin-top: 48px;
  color: #fff;
  font-size: 90px;
  font-style: italic;
  font-weight: 700;
  line-height: 100%;
  width: 703px;
  position: relative;
`;

export const StyledSubTitle = styled.div`
  color: #fff;
  font-size: 26px;
  font-style: italic;
  font-weight: 600;
  line-height: 100%;
  margin-top: 28px;
`;

export const StyledTotal = styled.div`
  width: 1244px;
  height: 145px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  position: relative;
  display: flex;
  align-items: center;
  padding: 42px 0px;
  margin: 0 auto;
  position: relative;
  top: -44px;
  z-index: 1;
`;

export const StyledTotalItem = styled.div`
  flex-grow: 1;
`;

export const StyledTotalLabel = styled.div`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
`;

export const StyledTotalValue = styled.div`
  color: #fff;
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  text-transform: capitalize;
  margin-top: 9px;
`;

export const StyledTotalLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: #fff;
`;
