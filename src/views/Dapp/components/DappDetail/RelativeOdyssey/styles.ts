import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledContainer = styled.div`
  font-family: Montserrat;
`;

export const StyledOdysseyContainer = styled.div`
  margin-bottom: 44px;
  border-radius: 20px;
  border: 1px solid #202329;
  background: #101115;
  cursor: pointer;
`;

export const StyledOdysseyDetail = styled.div`
  margin-bottom: 30px;
`;

export const StyledOdysseyBanner = styled.div<{ url: string }>`
  width: 100%;
  height: 202px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: ${props => props.url ? `url('${props.url}') no-repeat center top` : ''};
  background-size: cover;
  &.gray {
    filter: grayscale(100%);
  }
`;

export const StyledOdysseyTitle = styled.div`
  color: #FFF;
  font-size: 20px;
  font-weight: 600;
  height: 48px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 20px;
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
`;

export const StyledOdysseyTagShadow = styled.div`
  padding: 5px;
  border-radius: 16px;
  position: relative;
`;

export const StyledOdysseyTag = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(32, 34, 47, 1);
  padding: 6px 10px;
  display: flex;
  align-items: center;
  color: #979ABE;
  font-family: Gantari;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  position: relative;
  z-index: 2;

  &::before {
    display: block;
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #979ABE;
    margin-right: 5px;
  }
`;

export const StyledLiveBg = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: rgba(87, 219, 100, .2);
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  backdrop-filter: blur(4px);
`;

export const StyledRelatedTitle = styled.div`
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg, #FFF 0%, #979ABE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  margin-top: 30px;
`;

export const StyledEmpty = styled.div`
  color: #979ABE;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledOdysseyBody = styled.div`
  padding: 16px 0 20px 20px;
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
  background: linear-gradient(180deg, #FFF 0%, #999 100%);
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
  bottom: 10px;
  right: 14px;
  background: ${props => props.url ? `url(${props.url}) no-repeat center` : ''};
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


export const StyledOdysseyTop = styled.div`
  position: relative;
`;

export const StyledVideoModal = styled.div<{ visible?: boolean }>`
  display: ${props => props.visible ? 'block' : 'none'};
  .video-modal-overlay {
    backdrop-filter: blur(5px);
  }

  .video-modal {
    background: #18191E;
    border: 1px solid #202329;
    backdrop-filter: blur(10px);
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
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-top: 40px;
  width: 100%;
  position: relative;
`;

export const StyledTagItem = styled.div`
  border-radius: 34px;
  background: #21222B;
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
    width: 0;
    overflow: hidden;
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
  
  &.tag-default {
    border: 1px solid #373A53;
    background: rgba(16, 17, 21, 0.8);

    .reward-text {
      color: #979ABE;
      font-weight: 600;
    }
  }

  &.tag-active {
    background: linear-gradient(to right, #8F41E9, #578AEF);
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
      background: linear-gradient(90deg, #FFAF65 3.39%, #FF84EB 50.73%, #9B82FF 100%);
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
  color: #FFF;
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
  border: 2px solid #292B33;
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
      color: #979ABE;
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
  background: #21232A;
`;
