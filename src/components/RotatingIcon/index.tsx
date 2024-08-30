import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const BadgeContainer = styled.div<{ size: number }>`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const RotatingSVG = styled.div<{ duration: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${spin} ${(props) => props.duration}s linear infinite;
`;

const StaticSVG = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface RotatingIconProps {
  size?: number;
  duration?: number;
  rotatingIcon: React.ReactNode;
  staticIcon: React.ReactNode;
}

const RotatingIcon: React.FC<RotatingIconProps> = ({ size = 26, duration = 8, rotatingIcon, staticIcon }) => {
  return (
    <BadgeContainer size={size}>
      <RotatingSVG duration={duration}>{rotatingIcon}</RotatingSVG>
      <StaticSVG>{staticIcon}</StaticSVG>
    </BadgeContainer>
  );
};

export default RotatingIcon;
