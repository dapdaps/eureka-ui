import { AnimatePresence } from 'framer-motion';
import React, { memo } from 'react';

import {
  StyledTopDappLogo,
  StyledTopDappLogoContainer,
  StyledTopDappLogoWrapper
} from '@/views/AllDapps/components/Title/styles';

const Logo = (props: Props) => {
  const { dappList, position } = props;

  return (
    <StyledTopDappLogoWrapper $position={position}>
      <AnimatePresence mode="wait">
        {dappList.length > 0
          ? dappList.map((it: any) => (
              <StyledTopDappLogoContainer
                key={it.key}
                initial={{
                  scale: 0.3,
                  opacity: 0,
                  rotate: 0,
                  x: it.x,
                  y: it.y
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotate: it.rotate || 0
                }}
                exit={{
                  scale: 0.5,
                  opacity: 0
                }}
                transition={{
                  type: 'spring',
                  duration: 0.6,
                  bounce: 0.5
                }}
              >
                <StyledTopDappLogo src={it.logo} alt="" width={it.width} height={it.height} />
              </StyledTopDappLogoContainer>
            ))
          : null}
      </AnimatePresence>
    </StyledTopDappLogoWrapper>
  );
};

export default memo(Logo);

export interface Props {
  dappList: any;
  position: 'left' | 'right';
}
