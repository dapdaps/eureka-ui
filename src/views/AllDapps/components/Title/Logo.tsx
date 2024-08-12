import React, { memo } from 'react';
import { StyledTopDappLogo, StyledTopDappLogoWrapper } from '@/views/AllDapps/components/Title/styles';
import { AnimatePresence } from 'framer-motion';

const Logo = (props: Props) => {
  const { dappList, position } = props;

  return (
    <StyledTopDappLogoWrapper $position={position}>
      <AnimatePresence mode="wait">
        {
         dappList.filter((it: any) => it.position === position).map((it: any) => (
            <StyledTopDappLogo
              key={it.key}
              src={it.logo}
              alt=""
              width={it.width}
              height={it.height}
              initial={{
                scale: 0.3,
                opacity: 0,
                x: it.x,
                y: it.y,
                rotate: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: it.rotate || 0,
              }}
              exit={{
                scale: 0.5,
                opacity: 0,
              }}
              transition={{
                scale: {
                  type: 'spring',
                  duration: 0.9,
                  bounce: 0.5,
                },
              }}
            />
          ))
        }
      </AnimatePresence>
    </StyledTopDappLogoWrapper>
  );
};

export default memo(Logo);

export interface Props {
  dappList: any;
  position: 'left' | 'right';
}