import styled from 'styled-components';

export const Container = styled.div`
  min-width: 1350px;
  margin: 0 auto;
  background-color: #151515;
  font-family: Orbitron;
`;
export const SwapContent = styled.div<{ $bg: string }>`
  background: ${(props: any) => `url(${props.$bg}) no-repeat`};
  position: relative;
  width: 194px;
  height: 150px;
`;
export const Banner = styled.div`
  height: 580px;
  padding-top: 20px;
  background: url(/images/lrts/bg-home.png) center no-repeat #000;
  /* background-size: contain; */
  background-size: 100% 100%;
  /* @media (min-width: 1650px) {
    height: 700px;
  }
  @media (min-width: 1800px) {
    height: 734px;
  }
   */
  @media (min-width: 2000px) {
    height: 810px;
  }
  .mySwiper {
    margin-top: 60px;
    padding-top: 55px;
    /* padding: 55px 150px; */
    overflow: hidden;
  }
  .swiper .swiper-slide {
    filter: brightness(0.7);
    width: 300px !important;
    display: flex;
    transition: transform 0.3s ease-in;
    justify-content: center;
    & {
      @media (min-width: 2000px) {
        width: 400px !important;
      }
    }

    .lst-content {
      position: relative;
      width: 194px;
      height: 150px;
      @media (min-width: 2000px) {
        width: 270px;
      }
    }
    .lst-img {
      width: 100%;
      cursor: pointer;
      transition: width 0.3s ease-in;
    }
    .lst-title {
      position: absolute;
      z-index: 1;
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
      z-index: 1;
      top: 48px;
      right: 9px;
      display: flex;
      align-items: center;
      gap: 4px;
      color: #fff;
      font-family: Montserrat;
      font-size: 7px;
      @media (min-width: 2000px) {
        top: 64px;
      }
    }
    .lst-range {
      position: absolute;
      z-index: 1;
      top: 114px;
      left: 10px;
      color: rgba(255, 255, 255, 0.5);
      font-family: Orbitron;
      font-size: 9px;
      font-weight: 700;
      @media (min-width: 2000px) {
        top: 165px;
      }
    }
    .min-apr {
      position: absolute;
      z-index: 1;
      top: 98px;
      right: 10px;
      color: rgba(255, 255, 255, 0.5);
      font-family: Orbitron;
      font-size: 9px;
      font-weight: 700;
      @media (min-width: 2000px) {
        top: 145px;
      }
    }
    .max-apr {
      position: absolute;
      z-index: 1;
      top: 110px;
      right: 10px;
      color: #fff;
      font-family: Orbitron;
      font-size: 12px;
      font-weight: 700;
      @media (min-width: 2000px) {
        top: 160px;
      }
    }
    &.swiper-slide-active {
      filter: none;
      height: 300px;
      .lst-content {
        position: relative;
        width: 100%;
      }
      .lst-title {
        font-size: 26px;
        top: 22px;
      }
      .dapp-info {
        position: absolute;
        z-index: 1;
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
        z-index: 1;
        top: 177px;
        left: 10px;
        color: rgba(255, 255, 255, 0.5);
        font-family: Orbitron;
        font-size: 14px;
        font-weight: 700;
        /* @media (min-width: 1800px) {
        top: 220px;
      } */
        @media (min-width: 2000px) {
          top: 245px;
        }
      }
      .min-apr {
        position: absolute;
        z-index: 1;
        top: 150px;
        right: 10px;

        color: rgba(255, 255, 255, 0.5);
        font-family: Orbitron;
        font-size: 16px;
        font-weight: 700;
        /* @media (min-width: 1800px) {
        top: 175px;
      } */
        @media (min-width: 2000px) {
          top: 215px;
        }
      }
      .max-apr {
        position: absolute;
        z-index: 1;
        top: 170px;
        right: 10px;

        color: #fff;
        font-family: Orbitron;
        font-size: 26px;
        font-weight: 700;
        /* @media (min-width: 1800px) {
        top: 200px;
      } */
        @media (min-width: 2000px) {
          top: 235px;
        }
      }
      transform: translate(0, -50px);
    }
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
