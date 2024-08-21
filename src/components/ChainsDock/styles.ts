import styled from "styled-components";
import { motion } from 'framer-motion';

export const StyledContainer = styled(motion.div)`
  position: fixed;
  z-index: 1;
  right: 0;
  top: 0;
  width: 66px;
  height: calc(100vh);
  padding: 74px 0 0;
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
