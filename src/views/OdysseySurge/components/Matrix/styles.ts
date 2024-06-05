import styled from 'styled-components';
import { DAPP_STATUS } from '@/views/OdysseySurge/config';

export const StyledMatrixContainer = styled.div`
  border-radius: 10px;
  width: 1200px;
  margin: 0 auto 120px;
`;

export const StyledMatrixBorder = styled.div`
  border-radius: 12px;
  border: 1px solid #33C5F4;
`;

export const StyledMatrixTag = styled.div`
  width: 325px;
  height: 39px;
  color: #000;
  font-family: Trans-America;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  padding: 8px 41px 8px 22px;
  margin-bottom: 20px;
  background: url('/images/odyssey/v2-1/matrix-title.svg') center no-repeat;
  background-size: contain;
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 22px;
  justify-content: center;
  margin-bottom: 20px;
`;

export const StyledTitle = styled.div`
  background: linear-gradient(180deg, #FFF 39.2%, #33C5F4 80%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: Trans-America;
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 60px */
`;

export const StyledSubTitle = styled.div`
  font-weight: 300;
  font-size: 18px;
  color: #fff;
  text-align: center;
  margin-bottom: 40px;
`;

export const StyledCardContainer = styled.div<{ count: number, status: DAPP_STATUS }>`
  width: 182px;
  height: 120px;
  flex-shrink: 0;
  flex-grow: 0;
  transform: scale(1);
  transform-style: preserve-3d;
  transition: transform 0.5s;
  border-radius: 12px;
  position: relative;
  border: 1px solid #373A53;
  cursor: pointer;
  
  ${({ status }) => {
    if (status === DAPP_STATUS.FINISHED) {
      return `transform: rotateY(180deg);`;
    }
    return ``;
  }}
`;

export const StyledGameClaim = styled.div`
  .claim-cell {
    width: 182px;
    height: 120px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    visibility: hidden;
    opacity: 0;

    &.active {
      visibility: visible;
      opacity: 1;
    }
  }
  .claim-row,
  .claim-col {
    position: absolute;
    z-index: 1;
    gap: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
  }
  .claim-row {
    width: 91px;
    height: 100%;
    right: -26px;
    top: 0;
    flex-direction: column;
    
    .claim-cell {
      width: 100%;
    }
  }
  .claim-col {
    top: unset;
    bottom: -29px;
    
    .claim-cell {
      height: 100%;
      justify-content: center;
      align-items: flex-start;
    }
  }
`;

export const StyledCardFront = styled.img`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  user-select: none;
  -webkit-user-drag: none;
  position: absolute;
  border-radius: 12px;
  transform: rotateY(180deg);
`;

export const StyledCardBack = styled.div`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  user-select: none;
  -webkit-user-drag: none;
  position: absolute;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #000;
  color: #FFF;
  padding: 20px 20px 16px;
  
  .card-name {
    opacity: 0.3;
  }
`;

export const StyledCardIcon = styled.img`
  opacity: 0.3;
  width: 56px;
  height: 56px;
`;

export const StyledGameContainer = styled.div`
  padding: 0 28px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  position: relative;
  margin: 0 auto;
`;

export const StyledMatrixLogo = styled.div`
  background: url('/images/odyssey/v2-1/matrix-logo.svg') center no-repeat;
  background-size: contain;
  width: 100px;
  height: 62px;
`;

export const StyledGameFooter = styled.div`
  position: relative;
  padding: 25px 25px 30px 50px;
  background: #33C5F4;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-family: Trans-America;
  line-height: 1;
  color: #000;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 86px;

  &::before {
    display: block;
    content: '';
    position: absolute;
    top: -22px;
    right: 0;
    background: url('/images/odyssey/v2-1/matrix-footer.svg') center no-repeat;
    background-size: contain;
    width: 406px;
    height: 96px;
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    content: '';
    background: url('/images/odyssey/v2-1/matrix-sign.svg') center no-repeat;
    background-size: contain;
    width: 362px;
    height: 78px;
  }
`;

export const StyledTextContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;

  &.center {
    flex: 1;
    flex-shrink: 0;
  }
`;

export const StyledCount = styled.div`
  font-size: 52px;
  margin-right: 13px;
`;

export const StyledText = styled.div`
  font-size: 20px;
`;

export const StyledPTS = styled.div`
  width: 91px;
  height: 47px;
  background: url("/images/odyssey/v2-1/matrix-pts.svg") no-repeat center / contain;
  color: #000;
  text-align: center;
  font-family: Trans-America;
  font-size: 16px;
  line-height: 1;
  font-style: normal;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
