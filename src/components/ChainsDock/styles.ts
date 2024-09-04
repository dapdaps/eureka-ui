import { motion } from 'framer-motion';
import styled from "styled-components";

export const StyledContainer = styled(motion.div)<{ $top?: number; }>`
  position: fixed;
  z-index: 60;
  right: 0;
  top: 0;
  width: 66px;
  height: calc(100vh);
  padding: 74px 0 0;
  padding-top: ${({ $top }) => `${74 + ($top || 0)}px`};;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledInner = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 110px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 10px;
  gap: 10px;

  .chain-dock-img {
    cursor: pointer;
  }
`;
export const StyledMask = styled(motion.div)`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  width: 120px;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.00) 0%, #000 100%);
  pointer-events: none;
`;
export const StyledLine = styled.div`
  width: 33px;
  height: 1px;
  background: #333740;
  flex-shrink: 0;
`;

export const StyledDot = styled.div<{ $isUsd: boolean }>`
  
  &.show-dot {
    .chain-dock-img::before {
      content: '';
      display: block;
      background-color: #68CF56;
      position: absolute;
      top: 50%;
      left: -12px;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      }
  }
`;