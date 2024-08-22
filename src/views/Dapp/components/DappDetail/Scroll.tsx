import { memo } from 'react';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import {
  StyledArrowDown,
  StyledArrowDownWrapper,
  StyledMoreContainer,
  StyledMoreText,
} from '@/views/Dapp/components/DappDetail/styles';

const Scroll = (props: Props) => {
  const { onArrowClick = () => {} } = props;

  return (
    <StyledMoreContainer>
      <StyledMoreText>Scroll to learn more</StyledMoreText>
      <StyledArrowDownWrapper onClick={onArrowClick}>
        <StyledArrowDown
          initial={{
            y: 0,
          }}
          animate={{
            y: [-5, 10, 12, 14, -5],
          }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0.3,
            repeatType: 'loop',
          }}
        >
          <ArrowIcon size={12}/>
        </StyledArrowDown>
      </StyledArrowDownWrapper>
    </StyledMoreContainer>
  );
};

export default memo(Scroll);

export interface Props {
  onArrowClick?(): void;
}
