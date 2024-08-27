import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 1500px;
  height: 700px;
  background-image: url(/images/odyssey/v8/banner.png);
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
`;

export const StyledFrame = styled.div`
  height: 690px;
  width: 100%;
  background-image: url(/images/odyssey/v8/frame.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0px;
  z-index: 2;
`;

export const StyledLeftDoor = styled(motion.div)`
  height: 680px;
  width: 348px;
  background-image: url(/images/odyssey/v8/door-left.png);
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 11px;
  left: 0px;
  z-index: 1;
`;

export const StyledRightDoor = styled(motion.div)`
  height: 680px;
  width: 373px;
  background-image: url(/images/odyssey/v8/door-right.png);
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 11px;
  right: 0px;
  z-index: 1;
`;

export const StyledContent = styled.div`
  padding-top: 80px;
  gap: 99px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledLeftBg = styled.div`
  position: absolute;
  z-index: 3;
  left: 0px;
  top: 0px;
  width: 60px;
  height: 728px;
  background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #000 100%);
`;
export const StyledRightBg = styled.div`
  position: absolute;
  z-index: 3;
  right: 0px;
  top: 0px;
  width: 60px;
  height: 728px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, #000 100%);
`;
export const StyledBottomBg = styled.div`
  position: absolute;
  z-index: 3;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 372px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
`;

export const Rush = styled.div`
  position: relative;
  color: #fff;
  text-align: center;
  font-family: 'Trans-America';
  font-size: 100px;
  font-style: italic;
  font-weight: bold;
  line-height: 100%; /* 80px */
  font-style: italic;
  text-transform: capitalize;
  width: 100%;
  position: absolute;
  z-index: 4;
  bottom: 120px;

  .animation-title {
    position: relative;

    &::before {
      content: attr(data-text);
      position: absolute;
      width: 100%;
      text-shadow: 2px 0 red;
      left: -2px;
      clip-path: inset(0 0 0 0);
      animation: ani1 2s infinite linear alternate-reverse;
    }
    &::after {
      content: attr(data-text);
      position: absolute;
      width: 100%;
      text-shadow: -2px 0 blue;
      left: 2px;
      clip-path: inset(0 0 0 0);
      animation: ani2 2s infinite linear alternate-reverse;
    }
    @keyframes ani1 {
      0% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      5% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      15% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      20% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      25% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      30% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      35% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      40% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      45% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      50% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      55% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      60% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      65% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      70% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      75% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      80% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      85% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      90% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      95% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      100% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
    }

    @keyframes ani2 {
      0% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      5% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      15% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      20% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      25% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      30% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      35% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      40% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      45% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      50% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      55% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      60% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      65% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      70% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      75% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      80% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      85% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      90% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      95% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
      100% {
        clip-path: inset(${() => `${Math.random() * 100}px 0 ${Math.random() * 100}px 0`});
      }
    }
  }
`;
