import { styled } from 'styled-components';

import { DefaultIcon } from '@/views/Portfolio/config';
import ImageFallback from '@/views/Portfolio/components/ImageFallback';
import React from 'react';

export const StyledContainer = styled.div<{ size: string | number }>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  flex-shrink: 0;
  border-radius: 16px;
  position: relative;
  
  .main-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .sub-image {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    border: 2px solid #272835;
    background: #272835;
    position: absolute;
    z-index: 1;
    right: -2px;
    bottom: -2px;
  }
`;

const DAppIconWithChain = (props: { icon: string; chainIcon: string; style?: React.CSSProperties; size: number; }) => {
  const { icon, chainIcon, style, size = 32 } = props;

  return (
    <StyledContainer style={style} size={size}>
      <ImageFallback className="main-image" src={icon} width={size} height={size} alt=""  />
      <ImageFallback className="sub-image" src={chainIcon} width={16} height={16} alt=""  />
    </StyledContainer>
  );
};

export default DAppIconWithChain;
