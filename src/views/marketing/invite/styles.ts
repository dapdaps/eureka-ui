import styled from "styled-components";

export const StyledContainer = styled.div`
  position: relative;
  font-family: Montserrat;
  color: #FFF;
  --paddingTop: 130px;
  --padding-top: -138px;
  &.mobile-invite {
    .logo {
      width: 40px;
      height: 40px;
    }
    .logo-container {
      flex-direction: column;
    }
    .dapp-name {
      font-size: 20px;
    }
  }
  
  &.invite {
    .logo {
      width: 70px;
      height: 74px;
    }
    .dapp-name {
      font-size: 44px;
    }
  }
`;

export const StyledInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: var(--paddingTop);
  position: relative;
  z-index: 1;
`;

export const StyledHead = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledLogo = styled.img`
  object-fit: contain;
  margin-right: 16px;
`;

export const StyledLogoText = styled.img`
  width: 190px;
  height: 40px;
  object-fit: contain;
`;

export const StyledXContainer = styled.div`
  position: relative;
  z-index: 1;
`;


export const StyledX = styled.div`
  position: relative;
  z-index: 5;
  font-size: 52px;
  font-weight: 300;
  margin-left: 32px;
  margin-right: 32px;
`;

export const StyledBg = styled.div`
  position: absolute;
  width: 1544px;
  left: 50%;
  transform: translate(-50%, -208px);
`;
export const StyledBgImage = styled.img`
  /* display: block; */
  position: relative;
  width: 1544px;
  
`
export const StyledBgImageContainer = styled.div`
  position: fixed;
  top: 0;
  transform: translateX(-756px);
  z-index: 10;
`
export const StyledRect = styled.div`
  position: absolute;
  left: -50%;
  right: -50%;
  top: 0;
  display: flex;
  gap: 51px;
  z-index: 0;
  /* background: linear-gradient(0deg, #000 0%, #EBF479 75.02%); */
`
export const StyledLRect = styled.div`
  position: relative;
  flex: 1;
  height: 757px;
  background: linear-gradient(346deg, #1D1F07 4.22%, #000 37.86%);
`
export const StyledRRect = styled.div`
  position: relative;
  flex: 1;
  height: 757px;
  background: linear-gradient(14deg, #1D1F07 4.22%, #000 37.86%);
`
export const StyledRadialGradient = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  /* top: 0; */
  transform: translateX(-50%);
  width: 450px;
  height: 420px;
  flex-shrink: 0;
  border-radius: 450px;
  opacity: 0.6;
  background: radial-gradient(35.95% 35.95% at 50% 50%, #EBF479 0%, rgba(235, 244, 121, 0.00) 100%);
  filter: blur(50px);
  z-index: 10;
`
export const StyledMouseImage = styled.img`
  position: absolute;
  animation: jump linear 2s infinite;
  @keyframes jump {
    0% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-5%);
    }
    50% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(5%);
    }
    100% {
      transform: 0;
    }
  }
`
export const StyledLeftMouseImage = styled(StyledMouseImage)`
  right: 140px;
  bottom: 0;
  width: 293px;
`
export const StyledRightMouseImage = styled(StyledMouseImage)`
  animation-delay: 1s;
  position: absolute;
  left: 241px;
  bottom: 154px;
  width: 159px;
`

// export const StyledRect = styled.div`
//     width: 66px;
//     height: 100%;
//     background: #EBF479;
//     margin: 0 auto;
// `;

// export const StyledLight = styled.div`
//   width: 1000px;
//   height: 198px;
//   background: url("/images/marketing/flashlight.svg") no-repeat center;
//   background-size: contain;
// `;

// export const StyledAperture = styled.div`
//   border-radius: 450px;
//   opacity: 0.6;
//   background: radial-gradient(35.95% 35.95% at 50% 50%, #EBF479 0%, rgba(235, 244, 121, 0.00) 100%);
//   filter: blur(50px);
//   width: 450px;
//   height: 420px;
//   position: absolute;
//   bottom: 80px;
//   `;

export const StyledName = styled.div`
  font-weight: 700;
  line-height: 1.5;
  text-transform: capitalize;
`;

export const StyledDesc = styled.div`
  max-width: 882px;
  min-width: 882px;
  text-align: center;
  padding: 16px;
  border-radius: 10px;
  background: rgba(37, 37, 37, 0.60);
  backdrop-filter: blur(5px);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 55px;
  position: relative;
  z-index: 1;
  p {
    margin: 0;
  }
  
`;

export const StyledConnectButton = styled.button`
  border-radius: 12px;
  background: linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%);
  color: #1E2028;
  font-size: 18px;
  font-weight: 600;
  padding: 12px 54px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

export const StyledMedals = styled.div`
  margin-bottom: 54px;
  position: relative;
  z-index: 1;
`;
export const StyledMedal = styled.div<{ $url: string }>`
  filter: drop-shadow(0px 0px 20px #FFF);
  width: 136px;
  height: 136px;
  background-color: #fff;
  border-radius: 50%;
  background-image: ${({ $url }) => 'url(' + $url + ')'};
  background-size: 100px 100px;
  background-position: center;
  background-repeat: no-repeat;
  
`;

export const StyledLogoContainer = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledContent = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
`;
