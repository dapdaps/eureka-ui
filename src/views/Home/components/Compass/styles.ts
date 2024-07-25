import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 560px;
  background: #000;
`;

export const StyledContent = styled.div`
  width: 1244px;
  margin: 80px auto 0px;
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
  height: 500px;
  border-radius: 20px;
  border: 1px solid; 
  border-image-source: linear-gradient(180deg, #202329 0%, #101115 100%);
  background: #18191E;
`;

export const StyledCardBackgroundImage = styled.img`
      width: 720px;
      height: 500px;
`;

export const StyledCardMainContent = styled.div`
  padding: 30px 30px 30px 0;
  flex: 1;
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
`;

export const StyledCardChains = styled.img`
  width: 276px;
  height: 70px;
`;

export const StyledCardTitle = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 508px;
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
  line-height: 150%; /* 27px */
  width: 500px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledCardButton = styled.div`
  margin-top: 108px;
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  border-radius: 12px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  color: #02051e;
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
  transition: 0.5s;

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
    bottom: 30px;
    right: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
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
  bottom: 226px;
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
  bottom: 226px;
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
export const StyledChainsImg = styled.img``;

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
