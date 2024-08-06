import { memo } from 'react';
import { StyledArrowDown, StyledMoreContainer, StyledMoreText } from '@/views/Dapp/components/DappDetail/styles';
import ArrowIcon from '@/components/Icons/ArrowIcon';

const Scroll = () => {
  return (
    <StyledMoreContainer>
      <StyledMoreText>Scroll to learn more</StyledMoreText>
      <StyledArrowDown
        initial={{
          y: 0,
        }}
        animate={{
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 0.3,
          ease: 'easeInOut',
        }}
      >
        <ArrowIcon size={12}/>
      </StyledArrowDown>
    </StyledMoreContainer>
  );
};

export default memo(Scroll);
