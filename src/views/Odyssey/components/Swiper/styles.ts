import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 380px;
  background: transparent
`;

export const StyledContent = styled.div`
  width: 1244px;
  margin: 0 auto;
  position: relative;
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
  height: 380px;
  border-radius: 20px;
  border: 1px solid #202329; 
  border-image-source: linear-gradient(180deg, #202329 0%, #101115 100%);
  background: #18191E;
`;

export const StyledCardBackgroundImage = styled.img`
  width: 660px;
  height: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

export const StyledCardMainContent = styled.div`
  padding: 30px 30px 30px 0;
  flex: 1;
  align-self: stretch;
  position: relative;
  .title {
    color: #979ABE;
    font-size: 20px;
    line-height: 24px;
    font-weight: 500;
    margin-bottom: 106px;
  }
  .card_section {
    .logo {
      width: 263px;
      height: 45px;
    }
    .head {
      width: 412px;
      font-size: 32px;
      font-weight: 700;
      line-height: 39px;
      color: #fff;
    }
    .card-tips {
      margin-top: 20px;
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      color: #979ABE;
    }
  }
  .btns {
    position: absolute;
    width: calc(100% - 50px);
    bottom: 20px;
    display: flex;
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
  font-size: 32px;
  font-weight: 700;
  width: 508px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 39px; 
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 45px;
  margin-bottom: 28px;
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

export const StyleChainIconImg = styled.img`
  width: 30px;
  height: 30px;
  &:hover {
    cursor: pointer;
  }
`

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
  font-family: Gantari;
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
export const StyledSwiperNextButton = styled.div`
  position: absolute;
  right: -64px;
  bottom: 166px;
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #333648;
`;
export const StyledSwiperPrevButton = styled.div`
  position: absolute;
  left: -64px;
  bottom: 166px;
  transform: rotate(180deg);
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #333648;
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
  justify-content: space-between;
`;

export const StyledOdysseyInfo = styled.div`
  display: flex;
  align-items: center;

  .chainList {
    margin-left: 14px;
    display: flex;
    max-width: 180px;
    flex-flow: wrap row;

    gap: 4px;
    span {
      width: 30px;
      height: 30px;
      background-color: #f00;
    }
  }
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

export const StyleList = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const StyledVideo = styled.div<{ url?: string }>`
  width: 80px;
  height: 40px;
  border-radius: 4px;
  position: absolute;
  bottom: 10px;
  left: 560px;
  background: ${props => props.url ? `url(${props.url}) no-repeat center` : ''};
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const StyledVideoIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: contain;
`;