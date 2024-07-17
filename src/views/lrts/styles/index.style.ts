import styled from 'styled-components';

export const Container = styled.div`
  background-color: #151515;
  font-family: Orbitron;
`;

export const Banner = styled.div`
  height: 657px;
  padding-top: 28px;
  background: url(/images/lrts/bg-home.png) center no-repeat #000;
  background-size: cover;
  .mySwiper {
    margin-top: 120px;
    padding: 55px 150px;
    overflow: hidden;
  }
  .swiper .swiper-slide {
    /* transform: scale(0.8, 0.8); */
    transition: transform 0.3s ease-in;
    .lst-content {
      position: relative;
      width: 194px;
      height: 150px;
    }
    .lst-img {
      width: 100%;
      cursor: pointer;
      transition: width 0.3s ease-in;
    }
    .lst-title {
      position: absolute;
      top: 16px;
      color: #fff;
      font-family: Orbitron;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      width: 100%;
      text-align: center;
    }
    .dapp-info {
      position: absolute;
      top: 48px;
      right: 9px;
      display: flex;
      align-items: center;
      gap: 4px;
      color: #fff;
      font-family: Montserrat;
      font-size: 7px;
    }
    .lst-range {
      position: absolute;
      top: 114px;
      left: 10px;
      color: rgba(255, 255, 255, 0.5);
      font-family: Orbitron;
      font-size: 9px;
      font-weight: 700;
    }
    .min-apr {
      position: absolute;
      top: 98px;
      right: 10px;

      color: rgba(255, 255, 255, 0.5);
      font-family: Orbitron;
      font-size: 9px;
      font-weight: 700;
    }
    .max-apr {
      position: absolute;
      top: 110px;
      right: 10px;

      color: #fff;
      font-family: Orbitron;
      font-size: 12px;
      font-weight: 700;
    }
  }

  .swiper .swiper-slide.swiper-slide-active {
    .lst-content {
      position: relative;
      width: 100%;
    }
    .lst-img {
      width: 300px;
    }
    .lst-title {
      font-size: 26px;
      top: 22px;
    }
    .dapp-info {
      position: absolute;
      top: 75px;
      right: 15px;

      color: #fff;
      font-family: Montserrat;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    .lst-range {
      position: absolute;
      top: 177px;
      left: 10px;
      color: rgba(255, 255, 255, 0.5);
      font-family: Orbitron;
      font-size: 14px;
      font-weight: 700;
    }
    .min-apr {
      position: absolute;
      top: 150px;
      right: 10px;

      color: rgba(255, 255, 255, 0.5);
      font-family: Orbitron;
      font-size: 16px;
      font-weight: 700;
    }
    .max-apr {
      position: absolute;
      top: 170px;
      right: 10px;

      color: #fff;
      font-family: Orbitron;
      font-size: 26px;
      font-weight: 700;
    }
    transform: translate(-50px, -50px);
  }
`;

export const Title = styled.div`
  text-align: center;
  font-size: 100px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  background: linear-gradient(180deg, #fff 38.5%, #677079 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
export const Desc = styled.div`
  color: #828282;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  .bold {
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  }
`;