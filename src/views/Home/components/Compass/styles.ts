import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 560px;
  background: #000;
  margin-top: 100px;
  @media (max-width: 1440px) {
      transform: scale(.88);
      transform-origin: center; 
      transition: all 0.5s ease 0s;
      position: relative;
      z-index: 10;
  }
`;

export const StyledContent = styled.div`
  width: 1244px;
  margin: 80px auto 0px;
  position: relative;
  @media (max-width: 1440px) {
    margin-top: 20px;
    transition: all 0.5s ease 0s;
  }
`;

export const StyledInner = styled.div`
  position: relative;
  z-index: 10;
`;


export const StyledTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 165%; /* 59.4px */
  text-transform: capitalize;
  padding: 58px 0px 12px;
`;
export const StyledLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 222px;
`;
export const StyledCard = styled.div`
  position: relative;
  width: 1244px;
  height: 400px;
  border-radius: 20px;
  border: 1px solid #202329;
  border-image-source: linear-gradient(180deg, #202329 0%, #101115 100%);
  background: #18191E;
`;

export const StyledCardBackgroundImage = styled.img`
  width: 720px;
  height: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

export const StyledCardMainContent = styled.div`
  height: 100%;
  padding: 30px 30px 30px 0;
  flex: 1;
  align-self: stretch;
  position: relative;
  .title {
    color: #979ABE;
    font-size: 20px;
    font-family: Montserrat;
    line-height: 24px;
    font-weight: 500;
    margin-bottom: 62px;
  }
  .card_section {
    .logo {
      width: 263px;
      height: 45px;
    }
    .head {
      width: 412px;
      font-size: 32px;
      font-family: Montserrat;
      font-weight: 700;
      line-height: 39px;
      color: #fff;
    }
    .card-tips {
      margin-top: 20px;
      font-size: 16px;
      font-family: Montserrat;
      line-height: 24px;
      font-weight: 400;
      color: #979ABE;
    }
  }
  .btns {
    position: absolute;
    width: calc(100% - 50px);
    bottom: 40px;
    display: flex;
    font-family: Montserrat;
    justify-content: space-between;
    gap: 20px;
    & > *:only-child {
      flex: 1;
    }
    & > *:not(:only-child) {
      flex: 1 0 50%;
    }
  }
`;

export const StyledCardChains = styled.img`
  width: 276px;
  height: 70px;
`;

export const StyledCardTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  width: 460px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledCardDesc = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  width: 460px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledComingSoon = styled.div`
  color: #00E2FF;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  
  &.btns {
    bottom: 50px;
  }
`;

export const StyledCompassButton = styled.div`
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #EBF479;
  color: rgb(2, 5, 30);
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  cursor: pointer;
  transition: all 0.5s ease 0s;
  &.plain {
    background: transparent;
    color: #EBF479;
    border: 1px solid #EBF479;
  }
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`

export const StyledCardButton = styled.div`
  position: absolute;
  left: 706px;
  bottom: 29px;
  width: 213px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 12px;
  background: linear-gradient(rgb(238, 243, 191) 0%, rgb(233, 244, 86) 100%);
  color: rgb(2, 5, 30);
  text-align: center;
font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  cursor: pointer;
  transition: all 0.5s ease 0s;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const StyledCompassIcon = styled.div`
  position: absolute;
  right: 29px;
  top: -54px;
  z-index: 20;
`;

export const StyledWinPtsIcon = styled.div`
  position: absolute;
  right: -34px;
  top: 0px;
  z-index: 20;
`;
export const StyledSwiperWrapper = styled.div`
  position: relative;
  .swiper-pagination {
    position: absolute;
    bottom: -40px;
    right: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transform: translateX(50%);
  }

  .swiper-pagination-bullet {
    width: 25px;
    height: 6px;
    background: rgba(55, 58, 83, 0.5);
    display: inline-block;
    margin: 0 6px;
    border-radius: 3px;
    transition: all 0.3s ease;
    &:hover {
      cursor: pointer;
    }
  }

  .swiper-pagination-bullet-active {
    width: 150px;
    background: #575A77;
  }
`;
export const StyledSwiperNextButton = styled.button`
  position: absolute;
  right: -64px;
  bottom: 176px;
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #333648;
  background: #18191E;
  transition: all 0.2s linear;
  z-index: 6;
  
  &:hover,
  &:focus {
    background: #1F2229;
  }
`;
export const StyledSwiperPrevButton = styled(StyledSwiperNextButton)`
  left: -64px;
  right: unset;
  transform: rotate(180deg);
`;
export const StyledChainsImg = styled.img`
  width: auto;
  margin-left: 16px;
`;

export const StyledCominsoon = styled.div`
  color: #00e2ff;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  left: 706px;
  bottom: 29px;
  width: 213px;
  height: 50px;
`;


export const StyleAdTitle = styled.div`
  font-family: Montserrat;
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
  text-align: left;
  color: #fff;
`


export const StyledOdysseyHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledOdysseyInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledOdysseyIcon = styled.div`
  width: 121px;
  height: 17px;
  background: url('/images/alldapps/icon-odyssey.svg') no-repeat center;
  background-size: contain;
`;

export const StyledOdysseyIconTitle = styled.div`
  height: 17px;
  background: linear-gradient(180deg, #FFF 0%, #999 100%);
  border-radius: 3px;
  transform: skewX(-20deg);
  padding: 2px 5px;
  color: #000;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;