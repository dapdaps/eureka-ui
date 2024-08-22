import styled from "styled-components";
import { motion } from 'framer-motion';

export const StyledContainer = styled.div`
  font-family: Montserrat;
  width: 100%;
  height: 833px;
  position: relative;
`;
export const StyledInner = styled.div`
  width: 1544px;
  margin: 0 auto;
  height: 100%;
  position: relative;
  overflow: hidden;

  @media (max-width: 1544px) {
    width: 1244px;
  }
`;
export const StyledMaskTop = styled.div`
  width: 100%;
  height: 196px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.00) 9.76%, #000 100%);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  pointer-events: none;
`;
export const StyledMaskLeft = styled(StyledMaskTop)`
  width: 40px;
  height: 100%;
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.00) 9.76%, #000 100%);
`;
export const StyledMaskRight = styled(StyledMaskTop)`
  width: 40px;
  height: 100%;
  left: unset;
  right: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.00) 9.76%, #000 100%);
`;
export const StyledMaskBottom = styled(StyledMaskTop)`
  height: 40px;
  top: unset;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 9.76%, #000 100%);
`;
export const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-wrap: wrap;
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateZ(3.3deg) skewX(-20deg) translateX(-450px) translateY(-450px);

  @media (max-width: 1544px) {
    transform: rotateX(45deg) rotateZ(3.3deg) skewX(-20deg) translateX(-450px) translateY(-450px) scale(0.8);
  }
`;
export const StyledGridRow = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: nowrap;
`;
export const StyledGridCell = styled(motion.div)<{ $size: number; $row: number; }>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-left: 1px solid #202329;
  border-top: ${({ $row }) => $row === 0 ? 0 : '1px solid #202329'};
  overflow: hidden;

  &:first-child {
    border-left: 0;
  }
  
  > .cell-image {
    cursor: pointer;
  }
`;

export const StyledTitle = styled.h2`
  color: #fff;
  font-weight: bolder;
  position: absolute;
  left: 75px;
  top: 258px;
  z-index: 1;
  pointer-events: none;
`;
export const StyledTitleSub = styled.h5`
  color: #979ABE;
  text-align: center;
  font-size: 26px;
  font-style: italic;
  font-weight: 300;
  line-height: normal;
  position: absolute;
  left: 82px;
  top: 424px;
  z-index: 1;
  transform: rotate(2deg);
  transform-origin: right center;
  pointer-events: none;
`;
