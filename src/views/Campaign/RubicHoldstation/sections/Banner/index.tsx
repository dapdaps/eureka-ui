import Image from 'next/image';

import { StyledFlex } from '@/styled/styles';

import { StyledBanner, StyledBannerImage, StyledContainer, StyledTitle } from './styles';
import Total from './Total';

const Banner = () => {
  return (
    <StyledContainer>
      <StyledBanner>
        <div>
          <Image
            src="/images/campaign/rubic-holdstation/banner-title.png"
            width={405}
            height={66}
            alt="Rubic & Holdstation"
          />
          <StyledTitle>
            <StyledFlex alignItems="flex-end" gap="23px">
              <span>7500 USDT</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="150" height="86" viewBox="0 0 150 86" fill="none">
                <path
                  d="M31.7671 84.4554C50.6674 84.4554 70.1149 65.5367 75.734 43C81.353 20.4633 71.3394 1.54456 52.4391 1.54456C33.5388 1.54456 14.0912 20.4633 8.47219 43C2.85315 65.5367 12.8668 84.4554 31.7671 84.4554Z"
                  fill="white"
                  stroke="#202020"
                  strokeWidth="3"
                />
                <circle
                  cx="16.9748"
                  cy="16.9748"
                  r="16.9748"
                  transform="matrix(1 0 -0.241922 0.970296 39.6211 35.9414)"
                  fill="black"
                />
                <path
                  d="M97.2397 84.4554C116.14 84.4554 135.588 65.5367 141.207 43C146.826 20.4633 136.812 1.54456 117.912 1.54456C99.0114 1.54456 79.5639 20.4633 73.9448 43C68.3258 65.5367 78.3394 84.4554 97.2397 84.4554Z"
                  fill="white"
                  stroke="#202020"
                  strokeWidth="3"
                />
                <circle
                  cx="16.9748"
                  cy="16.9748"
                  r="16.9748"
                  transform="matrix(1 0 -0.241922 0.970296 107.52 35.9414)"
                  fill="black"
                />
              </svg>
            </StyledFlex>
            <div className="primary">Grand Lotto</div>
            <div className="sub">Play Onchain and Win Prizes</div>
          </StyledTitle>
        </div>
        <StyledBannerImage src="/images/campaign/rubic-holdstation/banner.png" width={762} height={611} alt="Lottery" />
      </StyledBanner>
      <Total />
    </StyledContainer>
  );
};

export default Banner;
