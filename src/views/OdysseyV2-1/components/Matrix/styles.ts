import styled from "styled-components";

export const StyledMatrixContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  padding: 0 50px;
  border-radius: 12px;
  margin: 0 auto 120px;
`;

export const StyledMatrixBorder = styled.div`
  border-radius: 12px;
  border: 1px solid #33C5F4;
  `;

export const StyledMatrixTag = styled.div`
  background: url('/images/odyssey/v2-1/matrix-title.svg') center no-repeat;
  background-size: contain;
  width: 325px;
  height: 39px;
  color: #000;
  font-family: Trans-America;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  padding: 8px 41px 8px 22px;
  margin-bottom: 20px;
  `;

export const StyledTitleContainer = styled.div`
  
`;

export const StyledTitle = styled.div`
  background: linear-gradient(180deg, #FFF 39.2%, #33C5F4 80%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: Trans-America;
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 60px */
`;

export const StyledSubTitle = styled.div`
  font-weight: 300;
  font-size: 18px;
  color: #fff;
  text-align: center;
`;

export const StyledCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  `;

export const StyledCardIcon = styled.div``;

export const StyledGameContainer = styled.div`
  padding: 0 28px;
  display: grid;
  gap: 10px;
`;