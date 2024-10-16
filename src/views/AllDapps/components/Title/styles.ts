import { motion } from 'framer-motion';
import Image from 'next/image';
import { styled } from 'styled-components';

import { AllDappsWrapper } from '@/views/AllDapps/styles';

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
  color: #ebf479;
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
export const StyledCategory = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding-top: 16px;
  position: relative;

  .skeleton-large {
    width: 130px;
    height: 46px;
  }
  .skeleton-small {
    width: 90px;
    height: 36px;
  }
`;
export const StyledCategoryItem = styled.div<{ $colorRgb: string; $disabled?: boolean }>`
  line-height: 1;
  flex-shrink: 0;
  border-radius: 32px;
  border: ${({ $colorRgb }) => `1px solid rgba(${$colorRgb},.5)`};
  color: ${({ $colorRgb }) => `rgb(${$colorRgb})`};
  padding: 13px;
  text-align: center;
  font-size: 18px;
  transition: all ease-in-out 0.3s;

  &.category-small {
    padding: 9px 14px;
    font-size: 16px;
  }

  ${({ $disabled }) => {
    if ($disabled) {
      return {
        opacity: '0.3',
        cursor: 'not-allowed'
      };
    }
    return {
      opacity: '1',
      cursor: 'pointer'
    };
  }}

  &.selected,
  &:hover {
    ${({ $disabled, $colorRgb }) => {
      if ($disabled) {
        return '';
      }
      return {
        'border-color': `rgb(${$colorRgb})`,
        background: `rgb(${$colorRgb})`,
        color: '#000',
        'box-shadow': `0px 0px 10px 0px rgba(${$colorRgb}, 0.6)`
      };
    }}
  }
`;
export const StyledTopDappLogoContainer = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 72px;
  height: 72px;
`;
export const StyledTopDappLogo = styled(motion(Image))`
  border: 3px solid #202329;
  border-radius: 24px;
  background: #131419;
  width: 72px;
  height: 72px;
`;
export const StyledTopDappLogoWrapper = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;

  ${({ $position }) => {
    if ($position === 'left') {
      return {
        left: 42
      };
    }
    return {
      right: 60
    };
  }}
`;
