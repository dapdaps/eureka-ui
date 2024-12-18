import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  font-family: Montserrat;
`;

export const StyledOdysseyContainer = styled.div<{ $isHoverButton?: boolean }>`
  margin-bottom: 44px;
  border-radius: 20px;
  border: 1px solid #202329;
  background: #101115;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s linear;

  &:hover {
    transform: ${({ $isHoverButton }) => (!$isHoverButton ? `translateY(-5px)` : '')};
  }
`;

export const StyledOdysseyDetail = styled.div`
  margin-bottom: 30px;
  position: relative;

  .detail-page-relative-odyssey-swiper {
    overflow: hidden;
  }

  .swiper-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  .swiper-pagination-bullet {
    width: 25px;
    height: 6px;
    background: rgba(55, 58, 83, 0.5);
    display: inline-block;
    margin: 0 6px;
    border-radius: 3px;
    transition: all 0.3s ease;

    &:hover {
      cursor: pointer;
    }
  }

  .swiper-pagination-bullet-active {
    width: 150px;
    background: #575a77;
  }

  .detail-page-relative-odyssey-card {
    margin-bottom: 0;
  }

  .swiper-pagination-button {
    position: absolute;
    left: -60px;
    top: 50%;
    transform: translateY(-50%);

    &.next {
      left: unset;
      right: -60px;
    }
  }
`;

export const StyledOdysseyBanner = styled(motion.div)`
  width: 100%;
  height: 202px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  position: relative;
`;

export const StyledOdysseyBannerMask = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0) 100%);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

export const StyledOdysseyTitle = styled.div<{ $isLive?: boolean }>`
  color: ${({ $isLive }) => ($isLive ? '#FFF' : '#979ABE')};
  opacity: ${({ $isLive }) => ($isLive ? 1 : 0.5)};
  font-size: 20px;
  font-weight: 600;
  height: 48px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 20px;
  padding-left: 20px;
`;

export const StyledOdysseyHead = styled.div`
  position: absolute;
  top: 16px;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1;
  .tales {
    width: 158px;
    height: 27px;
  }
`;

export const StyledRelatedTitle = styled.div`
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg, #fff 0%, #979abe 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  margin-top: 30px;
`;

export const StyledEmpty = styled.div`
  color: #979abe;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledOdysseyBody = styled.div`
  padding: 16px 0 20px 0;
  width: 100%;
`;

export const StyledOdysseyIcon = styled.div`
  width: 121px;
  height: 17px;
  background: url('/images/alldapps/icon-odyssey.svg') no-repeat center;
  background-size: contain;
`;

export const StyledOdysseyInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledOdysseyIconTitle = styled.div`
  height: 17px;
  background: linear-gradient(180deg, #fff 0%, #999 100%);
  border-radius: 3px;
  transform: skewX(-30deg);
  padding: 2px 5px;
  color: #000;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledVideo = styled.div<{ url?: string }>`
  width: 80px;
  height: 40px;
  border-radius: 4px;
  position: absolute;
  z-index: 5;
  bottom: 10px;
  right: 14px;
  background: ${(props) => (props.url ? `url(${props.url}) no-repeat center` : '')};
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const StyledVideoIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: contain;
`;

export const StyledOdysseyTop = styled(motion.div)<{ $isHoverButton?: boolean }>`
  position: relative;
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);

  &::before {
    content: '';
    display: ${({ $isHoverButton }) => ($isHoverButton ? 'block' : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 3;
    cursor: default;
    opacity: 0;
    transition: opacity 0.2s linear;
  }
  &:hover {
    &::before {
      opacity: ${({ $isHoverButton }) => ($isHoverButton ? 1 : 0)};
    }
  }
`;

export const StyledVideoContent = styled.div`
  padding: 10px;

  video {
    width: 600px;
    height: 337.5px;
  }
`;

export const StyledTagList = styled.div`
  padding-top: 40px;
  width: 100%;
  position: relative;
  overflow-x: auto;
  scrollbar-width: none;
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding-left: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledTagItem = styled(motion.div)`
  border-radius: 34px;
  background: #21222b;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  column-gap: 6px;
  min-height: 32px;
  font-size: 14px;
  line-height: 1;

  &.reward {
    padding: 0;
    background: unset;
    flex: 1;
    border-radius: 0;
  }
`;
export const StyledTagItemInner = styled.div`
  border-radius: 34px;
  height: 32px;
  display: flex;
  align-items: center;
  column-gap: 6px;
  padding: 0 9px;
  white-space: nowrap;

  &.tag-default {
    border: 1px solid #373a53;
    background: rgba(16, 17, 21, 0.8);

    .reward-text {
      color: #979abe;
      font-weight: 600;
      white-space: nowrap;
    }
  }

  &.tag-active {
    background: linear-gradient(to right, #8f41e9, #578aef);
    position: relative;
    background-clip: padding-box;
    border: 2px solid transparent;
    height: 36px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 0;
      margin: 2px;
      border-radius: inherit; /*important*/
      background: rgba(16, 17, 21);
    }

    .reward-text {
      font-weight: 600;
      background: linear-gradient(90deg, #ffaf65 3.39%, #ff84eb 50.73%, #9b82ff 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      z-index: 2;
    }
  }
`;
export const StyledTagIcon = styled.img`
  width: 18px;
  height: 24px;
  object-fit: contain;
`;

export const StyledTagLabel = styled.div`
  color: #fff;
  white-space: nowrap;
`;

export const StyledTagChains = styled.div`
  display: flex;
  align-items: center;

  .dapp-odyssey-card-tooltip {
    z-index: 1;
    width: auto;
  }
`;

export const StyledTagChain = styled(motion.div)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #292b33;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  margin-left: -6px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    margin-left: 0;
  }

  &.tag-more {
    &::before {
      display: block;
      content: '...';
      color: #979abe;
      font-size: 16px;
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const StyledBadgeTooltipList = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 14px;
  gap: 20px;
  background: #21232a;
`;

export const StyledOdysseyButton = styled(motion.button)`
  min-width: 286px;
  min-height: 60px;
  line-height: 1;
  color: #02051e;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  z-index: 4;
  background: #ebf479;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  left: 50%;
  position: absolute;
  bottom: 20px;

  .arrow-right {
    color: #000000;
    position: relative;
    z-index: 5;
  }
`;
