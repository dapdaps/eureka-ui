import { styled } from 'styled-components';
import { AllDappsWrapper } from '@/views/AllDapps/styles';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const StyledHead = styled(AllDappsWrapper)`
  padding: 0;
  font-family: Montserrat;
  color: white;
`;
export const StyledTitle = styled.div`
  text-align: center;
  font-size: 46px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  position: relative;
`;
export const StyledTitleText = styled.div`
  padding: 101px 0 0 27px;
`;
export const StyledTitlePrimary = styled.span`
  color: #EBF479;
  font-weight: 700;
`;
export const StyledTitleSub = styled.div`
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  margin-top: 40px;
`;
export const StyledCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;
export const StyledCategoryItem = styled.div<{ $colorRgb: string; }>`
  height: 46px;
  line-height: 44px;
  flex-shrink: 0;
  border-radius: 32px;
  border: ${({ $colorRgb }) => `1px solid rgba(${$colorRgb},.5)`};
  color: ${({ $colorRgb }) => `rgb(${$colorRgb})`};
  padding: 0 14px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  transition: all ease-in-out 0.3s;
  
  &.selected,
  &:hover {
    border-color: ${({ $colorRgb }) => `rgb(${$colorRgb})`};
    background: ${({ $colorRgb }) => `rgb(${$colorRgb})`};
    color: #000;
    box-shadow: ${({ $colorRgb }) => `0px 0px 10px 0px rgba(${$colorRgb}, 0.60)`};
  }
`;
export const StyledTopDappLogo = styled(motion(Image))``;
export const StyledTopDappLogoWrapper = styled.div<{ $position: 'left' | 'right'; }>`
  position: absolute;
  
  ${({ $position }) => {
    if ($position === 'left') {
      return {
        left: 42,
      };
    }
    return {
      right: 60,
    };
  }}
`;
