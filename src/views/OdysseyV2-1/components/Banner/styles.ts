import styled from "styled-components";

export const StyledBannerContainer = styled.div`
  background: url('/images/odyssey/v2-1/banner-bg.svg') top center no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 630px;
  position: relative;
  &::after {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%);
    width: 100%;
    height: 154px;
    bottom: 0;
    left: 0;
    display: block;
    content: '';
    position: absolute;
  }
  `;

export const StyledContent = styled.div`
  padding: 140px 75px 70px 75px;
  max-width: ${() => `var(--odyssey2-container-width)`};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  row-gap: 65px;
  `;

export const BannerTitle = styled.div`
  color: #FFF;
  font-size: 56px;
  font-style: italic;
  font-weight: 600;
  margin-bottom: 16px;
  line-height: 1;
  .title-active {
    color: #6BE3FC;
  }  
`;
export const BannerMain = styled.div``;
export const BannerDesc = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 20px;
  font-style: italic;
  font-weight: 600;
`;

export const StyledBannerPadding = styled.div`
  padding: 0 ${() => `var(--odyssey2-container-gutter)`};
  max-width: ${() => `var(--odyssey2-container-width)`};
  width: 100%;
  min-width: 1080px;
  `;