import { useEffect, useRef } from 'react';

import useCopy from '@/hooks/useCopy';
import useMobile from '@/hooks/useMobile';
import { StyledFlex } from '@/styled/styles';
import {
  StyledCard,
  StyledContainer,
  StyledIconCopy,
  StyledLink,
  StyledLogo,
  StyledTitle,
  StyledVideo,
  StyledWrapper
} from '@/views/Campaign/RubicHoldstation/Mobile/styles';

const RubicHoldstationMobile = () => {
  useMobile();

  const { copy } = useCopy();

  const videoRef = useRef<any>();

  const handleCopy = () => {
    copy(window.location.origin + '/campaign/home?category=rubic-holdstation', 'Copied!');
  };

  useEffect(() => {
    if (videoRef.current) return;
    videoRef.current.play();
  }, []);

  return (
    <StyledContainer>
      <StyledFlex justifyContent="center">
        <StyledLogo src="/images/campaign/rubic-holdstation/logo.svg" alt="" />
      </StyledFlex>
      <StyledTitle>Grand Lotto</StyledTitle>
      <StyledWrapper>
        <StyledCard>
          Explore campaign via desktop for <span className="primary">7500 USDT prizes!</span>
          <StyledFlex justifyContent="center">
            <StyledLink onClick={handleCopy}>
              <span>Copy link</span>
              <StyledIconCopy src="/images/campaign/rubic-holdstation/icon-copy.svg" alt="" />
            </StyledLink>
          </StyledFlex>
        </StyledCard>
      </StyledWrapper>
      <StyledVideo
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        tabIndex={-1}
        aria-label="Video player"
        src="/videos/campaign/rubic-holdstation.mov"
      />
    </StyledContainer>
  );
};

export default RubicHoldstationMobile;
