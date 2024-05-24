import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 100px;
`;

export const StyledContent = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledTitle = styled.div`
  background: linear-gradient(180deg, #FFF 39.2%, #33C5F4 80%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: Trans-America;
  font-size: 42px;
  font-style: normal;
  font-weight: 400;
`;

export const StyledSubTitle = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  margin-bottom: 60px;
  `;

export const StyledBody = styled.div`
  max-width: 1186px;
  width: 100%;
  margin: 0 auto;
`;

export const StyledLeftPlate = styled.div`
  background: url('/images/odyssey/v2-1/plate-left.svg') center center no-repeat;
  background-size: contain;
  width: 52px;
  height: 235px;
  position: absolute;
  top: 68px;
  left: 0;
`;