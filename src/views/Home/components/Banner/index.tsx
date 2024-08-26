import { memo } from 'react';

import Bg from './Bg';
import { StyledContainer, StyledContent, StyledSubTitleWrapper } from './styles';

const Banner = () => {
  return (
    <StyledContainer>
      <Bg />
      <StyledContent>
        <StyledSubTitleWrapper>
          <div>Your Universal Gateway into <span>Ethereum L2s</span></div>
        </StyledSubTitleWrapper>
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Banner);
