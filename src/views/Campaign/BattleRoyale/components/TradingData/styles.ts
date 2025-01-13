import Image from 'next/image';
import styled from 'styled-components';

export const StyledBanner = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
  z-index: 2;
  height: 688px;
  padding-top: 209px;
  width: 1244px;
  margin: 0 auto;
  padding-left: 27px;

  &::before {
    content: '';
    position: absolute;
    left: -350px;
    top: 90px;

    width: 698px;
    height: 698px;
    display: block;
    border-radius: 698px;
    opacity: 0.3;
    background: radial-gradient(50% 50% at 50% 50%, #ff6bbb 0%, rgba(255, 107, 187, 0) 100%);
  }
`;

export const StyledTitle = styled.div`
  margin-top: 74px;
  color: #fff;
  font-size: 42px;
  font-style: italic;
  font-weight: 800;
  line-height: 100%;
  position: relative;

  .primary {
    font-size: 90px;
    font-style: italic;
    font-weight: 700;
    line-height: 100%; /* 90px */
    text-transform: capitalize;
    background: linear-gradient(116deg, #c8ff7c 11.9%, #ffa5db 64.92%, #7a78ff 104.11%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 13px;
    padding-right: 5px;
    margin-left: -5px;
  }

  .sub {
    color: #fff;
    font-size: 26px;
    font-style: italic;
    font-weight: 600;
    line-height: 100%;
    margin-top: 18px;
  }
`;

export const StyledBannerImage = styled(Image)`
  position: absolute;
  z-index: 1;
  right: -100px;
  bottom: 0;
`;

export const StyledContainer = styled.div`
  width: 100vw;
  height: 396px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
  position: relative;
  top: -30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledLogo = styled.img`
  width: 770px;
  height: 42px;
  margin-top: 70px;
  margin-bottom: 50px;
`;

export const StyledTitleHeader = styled.div`
  margin: 0 auto;
  margin-top: 40px;
  width: 752px;
  background: linear-gradient(180deg, #fff 0%, #999 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: Burial;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 38.4px */
  letter-spacing: 4px;
`;

export const StyledTotal = styled.div`
  display: flex;
  align-items: center;
  min-width: 1244px;

  &::before {
    position: absolute;
    top: -170px;
    left: 55%;
    content: '';
    display: block;
    width: 340px;
    height: 340px;
    border-radius: 340px;
    opacity: 0.3;
    background: radial-gradient(50% 50% at 50% 50%, #b06bff 0%, rgba(176, 107, 255, 0) 100%);
  }
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
  font-family: Montserrat;
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
  font-family: Montserrat;
`;

export const StyledTotalLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: #fff;
`;
