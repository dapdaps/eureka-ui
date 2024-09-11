import { useEffect, useState } from 'react';
import styled from 'styled-components';

import config from './config';

const StyledContainer = styled.div<{ bg: string; size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-image: ${({ bg }) => bg};
  filter: drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25));
  display: flex;
  justify-content: center;
`;

const StyledInner = styled.div<{ size: number }>`
  width: ${({ size }) => 0.65 * size}px;
  height: ${({ size }) => 0.65 * size}px;
  border-radius: 50%;
  background-image: radial-gradient(50% 50% at 50% 50%, #fff 0%, rgba(255, 255, 255, 0.6) 100%);
  margin-top: 8px;
  text-align: center;
  line-height: ${({ size }) => 0.65 * size}px;
  color: #000;
  font-size: 36px;
  font-style: normal;
  text-transform: capitalize;
`;

export default function NumberBall({ number, size = 80 }: any) {
  const [rotate, setRotate] = useState(0);
  useEffect(() => {
    const _random = Math.random();
    setRotate(_random < 0.3 ? -12 : _random > 0.7 ? 12 : 0);
  }, []);
  return (
    <StyledContainer
      size={size}
      bg={number ? config[number].bg : 'radial-gradient(70.56% 70.56% at 50% 50%, #979ABE 0%, #3D405A 100%)'}
    >
      <StyledInner size={size} style={{ transform: `rotate(${rotate}deg)`, fontWeight: number ? 900 : 500 }}>
        {number || '?'}
      </StyledInner>
    </StyledContainer>
  );
}
