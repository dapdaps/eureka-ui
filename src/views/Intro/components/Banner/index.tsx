import ArrowSvg from "@public/images/intro/arrow.svg";
import ArrowRightSvg from "@public/images/intro/arrow-right.svg";
import BridgeSvg from "@public/images/intro/bridge.svg";
import DavinciSvg from "@public/images/intro/davinci.svg";
import PoundSignSvg from "@public/images/intro/pound-sign.svg";
import StarSvg from "@public/images/intro/star.svg";
import SwapSvg from "@public/images/intro/swap.svg";
import { useRouter } from "next/router";
import { memo } from "react";
import styled from "styled-components";

import { StyledFlex, StyledFont } from "@/styled/styles";
const StyledBanner = styled.div`
  margin: 0 auto;
  padding-top: 72px;
  max-width: 1452px;
  width: 100%;
  background: url('/images/intro/banner-bg.svg') no-repeat center;
  background-size: 100% 511px;
`
const StyledSuperButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #202329;
  background: #18191E;
  backdrop-filter: blur(10px);
  cursor: pointer;
`
const StyledExporeButton = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 277px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #EBF479;
  cursor: pointer;
`

const StyledMainHeading = styled.div`
  position: relative;
  margin: 30px auto 62px;
  width: 917px;
  @keyframes FlickerAnimation {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }
  @keyframes RotateAnimation {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .StarSvg {
    animation: FlickerAnimation 1.5s linear infinite;
  }
  .DavinciSvg {
    animation: RotateAnimation 3.5s linear infinite;
  }
`
const StyledMainTips = styled.div`
  width: 731px;
  margin: 0 auto 30px;
`
export default memo(function Banner() {
  const router = useRouter()
  return (
    <StyledBanner>
      <StyledFlex justifyContent="center" gap="10px">
        <StyledFont color="#FFF" fontSize="18px" lineHeight="150%">Quick start your Web3 journey with</StyledFont>
        <StyledSuperButton style={{ width: 152 }} onClick={() => router.push("https://app.dapdap.net/super-bridge")}>
          <BridgeSvg />
          <StyledFont color="#FFF" fontWeight="600" lineHeight="100%">Super Bridge</StyledFont>
        </StyledSuperButton>
        <StyledSuperButton style={{ width: 145 }} onClick={() => router.push("https://app.dapdap.net/super-swap")}>
          <SwapSvg />
          <StyledFont color="#FFF" fontWeight="600" lineHeight="100%">SuperSwap</StyledFont>
        </StyledSuperButton>
      </StyledFlex>
      <StyledMainHeading>
        <StyledFont color="#FFF" fontSize="90px" fontWeight="800" lineHeight="100%" textAlign="center">The Next-gen DeFi Consumer App</StyledFont>
        <ArrowSvg style={{ position: "absolute", left: 432, bottom: -43 }} />
        <PoundSignSvg style={{ position: "absolute", left: 178, top: -14 }} />
        <DavinciSvg className="DavinciSvg" style={{ position: "absolute", right: -142, bottom: -136 }} />
        <StarSvg className="StarSvg" style={{ position: "absolute", left: -18, bottom: -37 }} />
      </StyledMainHeading>
      <StyledMainTips>
        <StyledFont color="#FFF" fontSize="20px" lineHeight="150%" textAlign="center">DapDap offers a first-of-its-kind DeFi experience. We simplify the complex landscape of Ethereum L2s and EVMs, providing a single, unified gateway to explore and interact with multiple networks and their apps.</StyledFont>
      </StyledMainTips>
      <StyledExporeButton
        onClick={() => {
          router.push('https://app.dapdap.net/')
        }}
      >
        <StyledFont color="#000" fontSize="18px" fontWeight="600">Explore now</StyledFont>
        <ArrowRightSvg />
      </StyledExporeButton>
    </StyledBanner>
  )
})