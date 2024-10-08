import styled, { keyframes } from 'styled-components'
export {
  StyledFlex,
  StyledSvg, StyledText,
  StyledWrapper
} from '../../styles'

const AnimationSwitch = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0
  }

  1% {
    transform: translateY(0);
    opacity: 1
  }

  10% {
    transform: translateY(-25px)
  }

  13% {
    transform: translateY(-25px)
  }

  15% {
    transform: translateY(-50px)
  }

  18% {
    transform: translateY(-50px)
  }

  25% {
    transform: translateY(-75px)
  }

  28% {
    transform: translateY(-75px)
  }

  35% {
    transform: translateY(-100px)
  }

  38% {
    transform: translateY(-100px)
  }

  45% {
    transform: translateY(-125px)
  }

  48% {
    transform: translateY(-125px)
  }

  55% {
    transform: translateY(-150px)
  }

  58% {
    transform: translateY(-150px)
  }

  65% {
    transform: translateY(-175px)
  }

  68% {
    transform: translateY(-175px)
  }

  75% {
    transform: translateY(-200px)
  }

  78% {
    transform: translateY(-200px)
  }

  85% {
    transform: translateY(-225px)
  }

  88% {
    transform: translateY(-225px)
  }

  95% {
    transform: translateY(-250px)
  }

  98% {
    transform: translateY(-250px);
    opacity: 1
  }

  99% {
    transform: translateY(-250px);
    opacity: 0
  }

  to {
    transform: translateY(0);
    opacity: 0
  }
`
export const StyledQueryResult = styled.div`
`
export const StyledStatus = styled.div`
  color: #FE8601;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`
export const StyledStatusContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 11px 0 17px;
  background: #000;
  border-radius: 12px;
`
export const StyledStatusWrapper = styled.div`
  width: 432px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(to right, rgb(245, 217, 10), rgb(255, 122, 0));
  padding: 2px;
  &.success {
    background: linear-gradient(to right, rgb(0, 255, 26), rgb(35, 254, 175));
    ${StyledStatusContent} {
      padding: 0 3px 0 17px;
    }
    ${StyledStatus} {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 79px;
      height: 38px;
      border-radius: 12px;
      background: #24E462;
      color: #1E2028;
      font-family: Gantari;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 100%; 
    }
  }
`
export const StyledChainListWrapper = styled.div`
  width: 20px;
  height: 20px;
  overflow: hidden;
  position: relative;
`

export const StyledChain = styled.div`
  border-radius: 50%;
  overflow: hidden;
  font-size: 0;
`

export const StyledReward = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  width: 183px;
  height: 87px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px dashed #373A53;
`
export const StyledRewardText = styled.div`
  text-shadow: 0px 0px 4px rgba(235, 244, 121, 0.50);
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  background: linear-gradient(90deg, #FFDD4D 0%, #EBF479 109.42%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;ÍÍ
`
export const StyledChainList = styled.div`
  animation-delay: 0.3s;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  animation: 10s ease 0s infinite normal none running ${AnimationSwitch};
`
export const StyledGetPriceOff = styled.div`
  
  vertical-align: baseline;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  background: linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
export const StyledPriceOff = styled.span`
  /* text-decoration-line: underline; */
  border-bottom: 1px dashed #979ABE;
`

export const StyledLabelWrapper = styled.div`
  max-width: 270px;
  overflow: auto;
  &::-webkit-scrollbar {
    display:none
  }
`