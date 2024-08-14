import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const StyledDappCard = styled.div`
  font-family: Montserrat;
  width: 405px;
  height: 312px;
  border-radius: 20px;
  border: 1px solid #202329;
  background: #18191E;
  flex-shrink: 0;
  cursor: pointer;
  transition: top .2s ease;
  top: 0;
  position: relative;

  &:hover {
    top: -5px;
  }
`;
export const StyledDappCardHead = styled.div<{ $logo: string; }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 69px;
  height: 146px;
  padding: 20px;
  background: ${({ $logo }) => `url("${$logo}") no-repeat center top 40px / 185px auto`};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    display: block;
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100% + 1px);
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`;
export const StyledDappCardCategory = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  position: relative;
  z-index: 1;
`;
export const StyledDappCardCategoryItem = styled.div<{ $colorRgb: string; }>`
  height: 24px;
  line-height: 22px;
  flex-shrink: 0;
  color: ${({ $colorRgb }) => `rgb(${$colorRgb})`};
  border-radius: 30px;
  border: ${({ $colorRgb }) => `1px solid rgb(${$colorRgb})`};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  padding: 0 12px;
`;
export const StyledDappCardNetworks = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
`;
export const StyledDappCardBody = styled.div`
  padding: 14px 20px 20px 20px;
  position: relative;
`;

export const StyledDappCardTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 17px;
`;
export const StyledDappCardLogo = styled.div<{ $logo: string; }>`
  width: 78px;
  height: 78px;
  border: 3px solid #202329;
  border-radius: 24px;
  background: ${({ $logo }) => `#131419 url("${$logo}") no-repeat center center / contain`};
  margin-top: -49px;
`;
export const StyledDappCardName = styled.div`
  color: #FFF;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const StyledDappCardDescription = styled.div`
  color: #979ABE;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-top: 11px;
  min-height: 34px;
`;
