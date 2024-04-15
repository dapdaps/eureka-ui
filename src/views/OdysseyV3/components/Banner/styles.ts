import styled from 'styled-components';

export const StyledContainer = styled.div`
  background-image: url(/images/odyssey/v3/banner_bg.webp);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center center;
  height: 400px;

  @media (max-width: 1544px) {
    background-size: inherit;
  }
`;

export const StyledContent = styled.div`
  padding-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTitle = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 60px;
  font-style: italic;
  font-weight: 700;
  line-height: 100%;
  text-transform: capitalize;
  margin: 68px 0px 16px;
`;

export const StyledDesc = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 20px;
  font-style: italic;
  font-weight: 400;
  line-height: 100%; /* 20px */
`;
