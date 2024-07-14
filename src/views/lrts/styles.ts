import styled from 'styled-components';

export const Container = styled.div`
  background-color: #151515;
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
    img {
      width: 194px;
      cursor: pointer;
      transition: width 0.3s ease-in;
    }
  }

  .swiper .swiper-slide.swiper-slide-active {
    img {
      width: 300px;
    }
    transform: translate(-50px, -50px);
  }
`;

export const Title = styled.div`
  text-align: center;
  font-family: Orbitron;
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
  font-family: Orbitron;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  .bold {
    color: #fff;
    font-family: Orbitron;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  }
`;
