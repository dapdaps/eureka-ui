import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div`
  background: url(/images/lrts/bg-home.png) center no-repeat #000;
  background-size: cover;
  font-family: Orbitron;
  padding-top: 91px;
`;

export const Body = styled.div`
  width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
`;

export const Title = styled.div`
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: linear-gradient(180deg, #fff 38.5%, #677079 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
export const Desc = styled.div`
  color: #828282;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
