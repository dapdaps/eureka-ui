import { useRouter } from "next/router";
import { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { StyledContainer, StyledFlex, StyledFont, StyledSvg } from "@/styled/styles";

const StyledMiniCardContainer = styled.div`
  width: 100%;
  padding: 90px 14px 14px;

  @keyframes SwayAnimation {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-15deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(15deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  @keyframes ShakeAnimation {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(-15px, 15px);
    }
    50% {
      transform: translate(0, 0);
    }
    75% {
      transform: translate(15px, -15px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  .SuperBridgeSvg {
    transform-origin: bottom center;
    &.AnimateRunning {
      animation: SwayAnimation 2s linear 1;
    }
  }
  
  .SuperSwapSvg {
    &.AnimateRunning {
      animation: ShakeAnimation 2s linear 1;
    }
  }

  .SuperBridgeMiniCard {
  }
`
const StyledMiniCard = styled.div`
  position: relative;
  flex: 1;
  border-radius: 30px;
  height: 300px;
  background-color: red;
  cursor: pointer;
`
const StyledAllInOneBg = styled.div`
  position: absolute;
  left: 0;
  top: -14px;
  width: 415px;
  height: 505px;
`
const StyledTiltChainsContainer = styled.div`
  position: absolute;
  width: 433px;
  height: 300px;
  overflow: hidden;
  left: 0;
  top: -42px;
`
const StyledTiltChains = styled.div`
  position: absolute;
  left: 52px;
  top: 42px;
  transition-property: transform;
  transition-timing-function: initial;
`
const StyledTiltChain = styled.img`
  position: absolute;
  width: 216px;
  height: 216px;
  transition-duration: 1s;
  transition-property: width, height, transform;
  &.current {
    transform: translate(-42px, -38px);
    width: 300px;
    height: 300px;
  }
`
const StyledKeyboardImage = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 415px;
`
const StyledRockerContainer = styled.div`
  position: absolute;
  top: 173px;
  left: 236px;
`
const StyledRockerImage = styled.img`
  width: 82px;
  transform-origin: center bottom;
  transition: all 0.5s;
  &.running {
    transform: rotate(42deg);
  }
`
const StyledTryClickContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  position: absolute;
  right: 0;
  top: -14px;
  transform: translate(100%, 0);
`
const StyledTryClickArrowImage = styled.img`
  width: 48px;
`
const StyledTryClickFontImage = styled.img`
  width: 78px;
`
const StyledMiniCardImage = styled.img``

const StyledRightSvg = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const StyledBlackRoundedSvg = styled.div`
  position: absolute;
  display: flex;
  stroke: #000;
`
const StyledWhiteRoundedSvg = styled.div`
  position: absolute;
  display: flex;
  stroke: #FFF;
`
const StyledPortfolioButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 50px;
  padding: 0 25px;
  border-radius: 12px;
  background: #5B56F3;

`
const StyledEyesImage = styled.img`
  position: absolute;
  width: 44px;
  left: 23px;
  top: 59px;
`
const StyledOdysseyVideoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 427px;
  height: 260px;
  border-radius: 20px;
  background-color: #ecec84;
  overflow: hidden;
  background-blend-mode: luminosity;
`
const StyledOdysseyVideo = styled.video`
  width: 100%;
`
const StyledChainList = styled.div`
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`
const StyledChainImage = styled.img`
  width: 56px;
`
const StyledOdysseyFontImage = styled.img`
  width: 306px;
`
const StyledRockerRunningAudio = styled.audio``
const WhiteRightSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
    <circle cx="26" cy="26" r="26" fill="white" />
    <path d="M19.0715 33.0715L33.2136 18.9294M33.2136 18.9294L19.0708 18.9292M33.2136 18.9294L33.2136 33.0716" stroke="black" stroke-width="2" stroke-linecap="round" />
  </svg>
)
const BlackRightSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
    <circle cx="26" cy="26" r="26" fill="black" />
    <path d="M19.0715 33.0715L33.2136 18.9294M33.2136 18.9294L19.0708 18.9292M33.2136 18.9294L33.2136 33.0716" stroke="white" stroke-width="2" stroke-linecap="round" />
  </svg>
)
const RoundedSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
    <path d="M30.5 1H21C9.9543 1 1 9.95431 1 21V31" stroke="black" />
  </svg>
)

const CHAINS = [{
  icon: '/images/intro/chains/linea.svg',
  label: "linea"
}, {
  icon: '/images/intro/chains/scroll.svg',
  label: "scroll"
}, {
  icon: '/images/intro/chains/manta.svg',
  label: "manta"
}, {
  icon: '/images/intro/chains/blast.svg',
  label: "blast"
}, {
  icon: '/images/intro/chains/thruster.svg',
  label: "thruster"
}, {
  icon: '/images/intro/chains/mode.svg',
  label: "mode"
},]
const TILT_CHAINS = [{
  path: 'polygon-zkevm',
  icon: '/images/intro/allinone/chains/polygon zkevm.png',
}, {
  path: 'zksync',
  icon: '/images/intro/allinone/chains/ZKsync.png',
}, {
  path: 'scroll',
  icon: '/images/intro/allinone/chains/scroll.png',
}, {
  path: 'optimism',
  icon: '/images/intro/allinone/chains/OP.png',
}, {
  path: 'linea',
  icon: '/images/intro/allinone/chains/Linea.png',
}, {
  path: 'arbitrum',
  icon: '/images/intro/allinone/chains/arbitrum.png',
}, {
  path: 'avalanche',
  icon: '/images/intro/allinone/chains/Avalanche.png',
}, {
  path: 'base',
  icon: '/images/intro/allinone/chains/base.png',
}, {
  path: 'gnosis',
  icon: '/images/intro/allinone/chains/gnosis.png',
}, {
  path: 'manta',
  icon: '/images/intro/allinone/chains/manta.png',
}, {
  path: 'blast',
  icon: '/images/intro/allinone/chains/blast.png',
}, {
  path: 'mantle',
  icon: '/images/intro/allinone/chains/mantle.png',
}, {
  path: 'metis',
  icon: '/images/intro/allinone/chains/metis.png',
}, {
  path: 'mode',
  icon: '/images/intro/allinone/chains/mode.png',
},]
const POSITIONS = [168, 70]
export default memo(function MiniCard() {
  const router = useRouter()

  const [rockerRunning, setRockerRunning] = useState(false)
  const [chainsRunning, setChainsRunning] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(1)

  const miniCardContainerRef = useRef(null)
  const rockerRunningAudioRef = useRef<any>(null)

  const handleMouseEnterAnimateRunning = function (card: any, svg: any) {
    card?.addEventListener("mouseenter", function () {
      svg?.classList.add('AnimateRunning');
    })
    svg?.addEventListener("animationend", function () {
      svg?.classList.remove('AnimateRunning');
    })
  }
  const handleClickRocker = function (event: any) {
    event.stopPropagation()
    if (chainsRunning) {
      return
    }
    setRockerRunning(true)
    setChainsRunning(true)
    setCurrentIndex((prevIndex) => prevIndex + 1);
    rockerRunningAudioRef?.current && rockerRunningAudioRef?.current?.play()
    setTimeout(() => {
      setRockerRunning(false)
    }, 300)
  }
  useEffect(() => {
    const target: any = miniCardContainerRef?.current
    if (target) {
      handleMouseEnterAnimateRunning(target?.querySelector(".SuperBridgeMiniCard"), target?.querySelector(".SuperBridgeSvg"))
      handleMouseEnterAnimateRunning(target?.querySelector(".SuperSwapMiniCard"), target?.querySelector(".SuperSwapSvg"))
    }
  }, [])
  useEffect(() => {
    const swiperSlide: HTMLElement | null = document.querySelector('.swiper-slide');
    const sliders: NodeListOf<HTMLElement> | undefined = swiperSlide?.querySelectorAll('.swiper-item')
    const handleTransitionEnd = () => {
      const remainderIndex = currentIndex % TILT_CHAINS.length
      if (sliders && sliders.length > 0) {
        const last = sliders[sliders.length - 1]
        const nextIndex = remainderIndex - 2 < 0 ? (TILT_CHAINS.length + remainderIndex - 2) : remainderIndex - 2
        const nextDom = Array.from(sliders).find(slider => Number(slider?.getAttribute("data-index") ?? -1) === nextIndex)
        if (nextDom) {
          nextDom.style.left = parseInt(last.style.left) + POSITIONS[0] + 'px'
          nextDom.style.top = parseInt(last.style.top) - POSITIONS[1] + 'px'
          swiperSlide?.append(nextDom)
        }
      }
      setChainsRunning(false)
    };

    swiperSlide && swiperSlide.addEventListener('transitionend', handleTransitionEnd);
    return () => {
      swiperSlide?.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentIndex]);

  return (
    <StyledMiniCardContainer ref={miniCardContainerRef}>
      <StyledFlex gap="14px" style={{ marginBottom: 14 }}>
        <StyledMiniCard
          style={{ backgroundColor: "#5B56F3", height: 614 }}
          onClick={() => {
            const path = TILT_CHAINS[currentIndex % TILT_CHAINS.length]?.path
            router.push(`/all-in-one/${path}`)
          }}
        >
          <StyledRightSvg style={{ right: 10, top: 10 }}>
            {WhiteRightSvg}
          </StyledRightSvg>
          <StyledAllInOneBg>
            <StyledTiltChainsContainer>
              <StyledTiltChains className="swiper-slide" style={{ transitionDuration: chainsRunning ? "1s" : "0s", transform: `translate(${-POSITIONS[0] * currentIndex}px, ${POSITIONS[1] * currentIndex}px)` }}>
                {
                  TILT_CHAINS.map((chain, index) => (
                    <StyledTiltChain key={index} data-index={index} className={["swiper-item", index === (currentIndex % TILT_CHAINS.length) ? "current" : ""].join(" ")} src={chain.icon} style={{ left: POSITIONS[0] * index, top: -POSITIONS[1] * index }} />
                  ))
                }
              </StyledTiltChains>
            </StyledTiltChainsContainer>
            <StyledKeyboardImage src="/images/intro/allinone/keyboard.png" />
            <StyledRockerContainer>
              <StyledRockerImage src="/images/intro/allinone/rocker.png" className={rockerRunning ? "running" : ""} onClick={handleClickRocker} />
              {
                !rockerRunning && (
                  <StyledTryClickContainer>
                    <StyledTryClickArrowImage src="/images/intro/allinone/try-click-arrow.svg" />
                    <StyledTryClickFontImage src="/images/intro/allinone/try-click-font.svg" />
                  </StyledTryClickContainer>
                )
              }
            </StyledRockerContainer>
          </StyledAllInOneBg>
          {/* <StyledMiniCardImage src="/images/intro/allinone-bg.png" style={{ width: 415, position: 'absolute', left: 0, top: -14 }} /> */}
          <StyledContainer style={{ position: 'absolute', width: 302, right: 33, bottom: 59 }}>
            <StyledFont color="#FFF" fontSize="56px" fontWeight="700" lineHeight="100%">All-In-One</StyledFont>
            <StyledFont color="#FFF" fontSize="32px" fontWeight="700" lineHeight="100%" style={{ marginTop: 13, marginBottom: 27 }}>for 15+ L2s</StyledFont>
            <StyledFont color="#FFF" fontSize="18px" fontWeight="500" lineHeight="150%">Seamlessly trade, lend, and manage liquidity across multiple networks within a completely unified interface, making your Web3 experience smooth and uninterrupted.</StyledFont>
          </StyledContainer>
        </StyledMiniCard>
        <StyledFlex flexDirection="column" gap="14px" style={{ flex: 1 }}>
          <StyledFlex gap="14px" style={{ width: "100%" }}>
            <StyledMiniCard
              className="SuperBridgeMiniCard"
              style={{ backgroundColor: "#F2F2F2" }}
              onClick={() => {
                router.push("/super-bridge")
              }}
            >
              <StyledBlackRoundedSvg style={{ top: 12, left: 12 }}>
                {RoundedSvg}
              </StyledBlackRoundedSvg>
              <StyledBlackRoundedSvg style={{ top: 12, right: 12, transform: 'rotate(90deg)' }}>
                {RoundedSvg}
              </StyledBlackRoundedSvg>
              <StyledBlackRoundedSvg style={{ bottom: 12, left: 12, transform: 'rotate(270deg)' }}>
                {RoundedSvg}
              </StyledBlackRoundedSvg>
              <StyledSvg className="SuperBridgeSvg" style={{ position: 'absolute', right: 25, top: -31 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="110" viewBox="0 0 80 110" fill="none">
                  <path d="M5.89809 94.0532C6.31682 90.2847 9.21297 87.5979 10.6087 86.7256L57.4531 88.0341C57.4531 88.0341 61.6403 90.3894 61.6403 95.8851C61.6403 97.9787 63.734 109.232 35.4703 109.232C7.2066 109.232 5.37469 98.7638 5.89809 94.0532Z" fill="white" stroke="black" />
                  <path d="M5.898 84.1083C-0.906734 75.2092 -2.21369 55.8983 12.4416 45.6396C17.5841 38.8236 21.9107 34.34 30.5064 25.1513C27.3743 15.9917 27.9922 3.95369 37.5807 1.33636C43.3381 -0.235221 48.2987 3.95227 48.2987 8.66414C51.6333 6.22996 54.676 4.54443 57.2082 3.95356C66.3678 1.81633 70.8167 10.4947 63.4891 18.8691C59.177 23.7972 53.7039 29.5464 48.2987 35.7837C51.9583 33.0766 60.1971 30.2159 66.0901 35.7837C68.1046 37.687 69.1273 39.8809 69.1273 42.7595C74.134 43.2829 81.1117 48.831 78.39 57.4148C76.7478 62.5942 73.0322 65.5565 69.1273 66.8873C70.2904 74.8085 66.7578 91.3313 52.7434 91.9594C35.2253 92.7445 14.902 95.8836 5.898 84.1083Z" fill="#EBF479" />
                  <path d="M12.4416 45.6396C-2.21369 55.8983 -0.906734 75.2092 5.898 84.1083C14.902 95.8836 35.2254 92.7445 52.7434 91.9594C66.7578 91.3313 70.2904 74.8085 69.1273 66.8873M12.4416 45.6396C17.5841 38.8236 21.9107 34.34 30.5064 25.1513M12.4416 45.6396C28.6611 34.2859 54.9331 44.267 60.1971 55.0595M34.416 60.8169C38.0744 63.1034 41.5213 64.9007 44.6466 66.1232M42.553 42.6839C44.4214 40.3311 46.3557 38.0259 48.2987 35.7837M48.2987 8.66414C51.6333 6.22996 54.676 4.54443 57.2082 3.95356C66.3678 1.81633 70.8167 10.4947 63.4891 18.8691C59.177 23.7972 53.7039 29.5464 48.2987 35.7837M48.2987 8.66414C48.2987 3.95227 43.3381 -0.235221 37.5807 1.33636C27.9922 3.95369 27.3743 15.9917 30.5064 25.1513M48.2987 8.66414C48.3026 10.1471 47.5776 13.6887 44.6466 15.9917C41.7155 18.2947 38.7147 18.2386 37.5807 17.9227C35.2329 20.2003 32.8562 22.6393 30.5064 25.1513M48.2987 35.7837C51.9583 33.0766 60.1971 30.2159 66.0901 35.7837C68.1046 37.687 69.1273 39.8809 69.1273 42.7595M60.1971 55.0595C60.8784 56.4565 61.2078 57.867 61.1178 59.2467C60.9018 62.5582 59.8931 64.8597 58.2391 66.2657M60.1971 55.0595C62.8736 52.6374 67.0603 47.8657 69.1273 42.7595M69.1273 42.7595C74.134 43.2829 81.1117 48.831 78.39 57.4148C76.7478 62.5942 73.0322 65.5565 69.1273 66.8873M58.2391 66.2657C60.5405 67.866 64.9426 68.3134 69.1273 66.8873M58.2391 66.2657C55.3813 68.695 50.5969 68.4508 44.6466 66.1232M44.6466 66.1232C46.2112 69.8502 47.2993 78.1939 39.1342 81.753" stroke="black" />
                </svg>
              </StyledSvg>
              <StyledRightSvg style={{ right: 10, bottom: 10 }}>
                {BlackRightSvg}
              </StyledRightSvg>
              <StyledContainer style={{ paddingTop: 67 }}>
                <StyledFlex gap="6px" style={{ paddingLeft: 24, marginBottom: 14 }}>
                  <StyledSvg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="40" viewBox="0 0 27 40" fill="none">
                      <path d="M1.13653 18.6997L19.3663 1.55989C20.0706 0.897719 21.1748 1.68303 20.7804 2.56562L14.9706 15.5677C14.7253 16.1166 15.087 16.745 15.6848 16.8087L24.9366 17.7943C25.7013 17.8758 26.0053 18.8267 25.4296 19.3367L3.5086 38.7531C2.76751 39.4095 1.67208 38.5393 2.14389 37.6689L10.3803 22.4754C10.6784 21.9254 10.3273 21.2481 9.70599 21.1748L1.63902 20.2232C0.892255 20.1351 0.588702 19.2147 1.13653 18.6997Z" fill="#EBF479" stroke="black" stroke-linecap="round" />
                    </svg>
                  </StyledSvg>
                  <StyledFont color="#000" fontSize="26px" fontWeight="700" lineHeight="100%">Super Bridge</StyledFont>
                </StyledFlex>
                <StyledFont color="#000" fontSize="18px" fontWeight="500" lineHeight="150%" style={{ width: 322, paddingLeft: 33, opacity: 0.8 }}>
                  One UI to rule them all: Super Bridge aggregates routes from 18+ top bridges, ensuring you always receive optimal returns!
                </StyledFont>
              </StyledContainer>
            </StyledMiniCard>
            <StyledMiniCard
              className="SuperSwapMiniCard"
              style={{ backgroundColor: "#5B56F3" }}
              onClick={() => {
                router.push("/super-swap")
              }}
            >
              <StyledWhiteRoundedSvg style={{ top: 12, left: 12 }}>
                {RoundedSvg}
              </StyledWhiteRoundedSvg>
              <StyledWhiteRoundedSvg style={{ top: 12, right: 12, transform: 'rotate(90deg)' }}>
                {RoundedSvg}
              </StyledWhiteRoundedSvg>
              <StyledWhiteRoundedSvg style={{ bottom: 12, left: 12, transform: 'rotate(270deg)' }}>
                {RoundedSvg}
              </StyledWhiteRoundedSvg>
              <StyledSvg className="SuperSwapSvg" style={{ position: 'absolute', right: 25, top: -26 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="95" height="110" viewBox="0 0 95 110" fill="none">
                  <path d="M92.1591 67.4732C88.4381 60.373 81.0567 61.0722 76.3052 63.7275L55.3417 96.0099C52.1274 102.439 56.3095 108.109 65.7459 108.98C83.8518 110.65 98.1063 78.8209 92.1591 67.4732Z" fill="white" stroke="black" />
                  <path d="M71.3814 33.5304C74.5167 48.0447 80.2946 53.4851 80.0013 66.5276C79.6503 82.1317 66.8886 96.7246 54.0356 99.5356C41.1825 102.347 23.7889 99.2413 18.1544 92.9194C14.7052 92.3943 10.4625 90.6416 9.04668 89.3921C6.42808 87.0811 5.0789 81.3662 10.1414 79.3895C7.36458 78.1196 5.5753 76.2533 4.60432 74.1441C2.5598 69.7029 3.47798 65.164 7.12458 62.6739C5.31744 60.9217 4.53522 59.3751 4.43699 56.412C4.24774 50.7034 9.51608 48.5327 9.51608 48.5327C6.3688 44.458 6.17523 38.6165 10.1661 34.8823C17.2146 28.2871 38.422 33.1005 49.3948 37.8721C49.3948 37.8721 47.8411 21.2537 52.1314 12.8659C57.3251 2.71206 66.9071 5.04579 69.7851 9.57831C72.6632 14.1109 68.6318 20.8016 71.3814 33.5304Z" fill="#EBF479" />
                  <path d="M49.3948 37.8721C49.3948 37.8721 47.8411 21.2537 52.1314 12.8659C57.3251 2.71206 66.9071 5.04579 69.7851 9.57831C72.6632 14.1109 68.6318 20.8016 71.3814 33.5304C74.5167 48.0447 80.2946 53.4851 80.0013 66.5276C79.6503 82.1317 66.8886 96.7246 54.0356 99.5356C41.1825 102.347 23.7889 99.2413 18.1544 92.9194M49.3948 37.8721C38.422 33.1005 17.2146 28.2871 10.1661 34.8823C6.17523 38.6165 6.3688 44.458 9.51608 48.5327M49.3948 37.8721C49.3948 37.8721 48.6037 46.6428 45.2601 56.3991C41.0805 68.5945 49.1336 74.9588 49.1336 74.9588M25.5869 36.57C27.5014 37.0607 34.5946 39.0462 38.7686 43.2988C45.2614 49.9141 41.6397 55.6026 34.7628 56.7784M9.51608 48.5327C11.9036 51.6236 16.6049 53.8815 22.2594 55.41C27.0698 56.7103 31.7542 57.2928 34.7628 56.7784M9.51608 48.5327C9.51608 48.5327 4.24774 50.7034 4.43699 56.412C4.53522 59.3751 5.31744 60.9217 7.12458 62.6739M32.0529 69.9782C40.3363 67.848 39.5816 58.9928 34.7628 56.7784M32.0529 69.9782C24.3153 71.968 12.4685 67.8554 7.12458 62.6739M32.0529 69.9782C37.8877 70.6167 37.0777 78.0178 30.0357 80.7028M7.12458 62.6739C3.47798 65.164 2.5598 69.7029 4.60432 74.1441C5.5753 76.2533 7.36458 78.1196 10.1414 79.3895M30.0357 80.7028C25.3787 82.4784 15.5175 81.8481 10.1414 79.3895M30.0357 80.7028C35.0369 81.2501 35.7205 87.2594 32.3642 90.2569C28.1571 94.0143 23.9895 93.558 18.1544 92.9194M10.1414 79.3895C5.0789 81.3662 6.42808 87.0811 9.04668 89.3921C10.4625 90.6416 14.7052 92.3943 18.1544 92.9194" stroke="black" />
                </svg>
              </StyledSvg>
              <StyledRightSvg style={{ right: 10, bottom: 10 }}>
                {WhiteRightSvg}
              </StyledRightSvg>
              <StyledContainer style={{ paddingTop: 67 }}>
                <StyledFlex gap="6px" style={{ paddingLeft: 24, marginBottom: 14 }}>
                  <StyledSvg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 24" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8625 0C10.5916 -6.48652e-09 10.3317 0.107621 10.1401 0.299194L0.301382 10.136C-0.342382 10.7796 0.113471 11.8803 1.0238 11.8803L16.3244 11.8803C16.8663 11.8803 17.386 11.6651 17.7692 11.2819L27.3087 1.74431C27.9525 1.10067 27.4966 8.47776e-08 26.5863 8.40896e-08L10.8625 0ZM0.301547 21.9754L9.09391 13.1848H16.8462C17.3881 13.1848 17.9079 12.9695 18.2911 12.5864L19.0382 11.8394H26.5865C27.4968 11.8394 27.9526 12.9401 27.3089 13.5837L17.7694 23.1213C17.3862 23.5045 16.8665 23.7197 16.3246 23.7197H1.02397C0.113635 23.7197 -0.342218 22.6191 0.301547 21.9754Z" fill="#EBF479" />
                    </svg>
                  </StyledSvg>
                  <StyledFont color="#FFF" fontSize="26px" fontWeight="700" lineHeight="100%">Super Swap</StyledFont>
                </StyledFlex>
                <StyledFont color="#FFF" fontSize="18px" fontWeight="500" lineHeight="150%" style={{ width: 322, paddingLeft: 33, opacity: 0.8 }}>
                  One UI to rule them all: Super Swap aggregates providers from 75+ of the most popular DEXes, guaranteeing your trades always take the best routes!
                </StyledFont>
              </StyledContainer>
            </StyledMiniCard>
          </StyledFlex>
          <StyledContainer style={{ width: "100%" }}>
            <StyledMiniCard
              style={{ background: `#EBF479 url(/images/intro/portfolio-bg.svg) no-repeat center`, backgroundSize: '100%' }}
              onClick={() => {
                router.push("/portfolio")
              }}
            >
              <StyledContainer style={{ paddingTop: 48, paddingLeft: 32, paddingRight: 25 }}>
                <StyledRightSvg style={{ right: 10, top: 10 }}>
                  {BlackRightSvg}
                </StyledRightSvg>
                <StyledSvg style={{ position: 'absolute', right: 73, top: -46 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="125" height="148" viewBox="0 0 125 148" fill="none">
                    <path d="M123.912 103.516C122.782 84.6775 107.283 81.5349 99.4339 84.3607L60.8156 125.806C60.3446 132.243 63.3588 145.493 79.1833 147C98.964 148.884 125.325 127.065 123.912 103.516Z" fill="white" stroke="black" />
                    <path d="M75.884 128.633C69.2714 129.883 48.5381 131.433 34.4388 120.626C28.0757 115.749 20.1899 105.299 13.4525 99.2961C6.71505 93.2936 16.4484 85.7905 23.9344 88.0415C31.4204 90.2924 38.1578 97.7955 46.0166 99.2961C53.8754 100.797 66.259 95.8717 63.6389 78.6146C61.2631 62.967 47.4425 61.462 39.6535 65.4842C27.3031 71.8618 14.5298 87.6899 3.73462 78.6146C-7.86795 68.8606 19.8454 50.8531 41.9157 38.8482C49.4017 34.7762 66.6046 43.2383 66.6046 43.2383C61.9881 32.271 55.3003 8.61057 65.4813 1.70771C70.3748 -1.61014 75.1015 7.13069 79.0751 19.7153C80.4079 13.9629 84.9449 2.68322 92.4309 3.58359C96.9499 4.12711 97.0198 13.8853 96.3654 28.7872C97.3878 29.2581 99.9035 31.9297 101.787 38.8482C103.671 45.7666 98.1766 58.258 95.1938 63.6388C98.9368 67.3904 101.787 81.8717 101.787 94.2518C101.787 116.889 89.0913 124.881 75.884 128.633Z" fill="#EBF479" />
                    <path d="M66.6046 43.2383C66.6046 43.2383 49.4017 34.7762 41.9157 38.8482C19.8454 50.8531 -7.86795 68.8606 3.73462 78.6146C14.5298 87.6899 27.3031 71.8618 39.6535 65.4842C47.4425 61.462 61.2631 62.967 63.6389 78.6146C66.259 95.8717 53.8754 100.797 46.0166 99.2961C38.1578 97.7955 31.4204 90.2924 23.9344 88.0415C16.4484 85.7905 6.71505 93.2936 13.4525 99.2961C20.1899 105.299 28.0757 115.749 34.4388 120.626C48.5381 131.433 69.2714 129.883 75.8841 128.633C89.0913 124.881 101.787 116.889 101.787 94.2518C101.787 81.8717 98.9368 67.3904 95.1938 63.6388M66.6046 43.2383C61.9881 32.271 55.3003 8.61057 65.4813 1.70771C70.3748 -1.61014 75.1015 7.13069 79.0751 19.7153M66.6046 43.2383C75.9427 47.3232 89.8827 54.4329 95.1938 63.6388M95.1938 63.6388C95.1938 63.6388 83.3687 33.3131 79.0751 19.7153M95.1938 63.6388C98.1766 58.258 103.671 45.7666 101.787 38.8482C99.9035 31.9297 97.3878 29.2581 96.3654 28.7872M95.1938 63.6388C95.1938 50.5724 95.9357 38.5711 96.3654 28.7872M79.0751 19.7153C80.4079 13.9629 84.9449 2.68322 92.4309 3.58359C96.9499 4.12711 97.0198 13.8853 96.3654 28.7872" stroke="black" />
                  </svg>
                  <StyledEyesImage src="/images/intro/eyes.gif" />
                </StyledSvg>
                <StyledFont color="#000" fontSize="36px" fontWeight="700">Portfolio Analytics</StyledFont>
                <StyledFont color="#000" fontSize="18px" fontWeight="500" lineHeight="150%" style={{ marginTop: 31, marginBottom: 22 }}>Effortlessly view and manage your assets across networks. Track your bridging, swapping, liquidity, and lending activities in real-time with our comprehensive data support.</StyledFont>
                <StyledFlex gap="10px">
                  <StyledPortfolioButton>
                    <StyledSvg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.000121621 3.62261C-1.62888e-05 3.6226 -3.66687e-05 3.6226 5.92328e-05 3.6226V0C0.634175 0 1.37268 0.184967 2.09001 0.44824C2.84274 0.724506 3.69817 1.13393 4.59563 1.68403C6.39086 2.78442 8.41188 4.48325 10.1413 6.9028C12.9487 10.8305 15.9264 11.3774 17 11.3774V15C14.8574 15 10.8132 13.9436 7.31823 9.0539C5.89643 7.06471 4.24179 5.68002 2.80456 4.79907C2.0858 4.3585 1.4358 4.0528 0.914865 3.86161C0.654561 3.76607 0.43763 3.70322 0.26949 3.66554C0.186006 3.64682 0.120091 3.63556 0.0712859 3.62921C0.0246953 3.62315 0.0019605 3.62265 0.000121621 3.62261Z" fill="#EBF479" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.16869 9.40994C2.83695 11.1348 0.675467 11.6191 0 11.6191V15C1.62183 15 4.5144 14.1561 7.30521 12.0917L5.16869 9.40994ZM13.173 2.18196C11.9247 2.86261 10.6453 3.80061 9.53594 4.86955L12.0169 7.26018C12.9125 6.39721 13.9407 5.64798 14.901 5.1244C15.9136 4.57223 16.6488 4.38086 17 4.38086V1C15.7431 1 14.3689 1.52989 13.173 2.18196Z" fill="#979ABE" />
                      </svg>
                    </StyledSvg>
                    <StyledFont color="#FFF" fontSize="16px" fontWeight="500">Bridged</StyledFont>
                  </StyledPortfolioButton>
                  <StyledPortfolioButton>
                    <StyledSvg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
                        <circle cx="16" cy="10" r="8" fill="#979ABE" />
                        <circle cx="10" cy="10" r="9" fill="#EBF479" stroke="#5B56F3" stroke-width="2" />
                      </svg>
                    </StyledSvg>
                    <StyledFont color="#FFF" fontSize="16px" fontWeight="500">Swapped</StyledFont>
                  </StyledPortfolioButton>
                  <StyledPortfolioButton>
                    <StyledSvg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.80193 10.1848C13.4711 9.28616 14.3966 11.383 14.1621 11.1765C14.1621 10.5794 13.8617 9.67863 13.1648 8.51671C12.4938 7.39823 11.5731 6.22921 10.6119 5.14588C9.66921 4.08348 8.72121 3.14099 8 2.45689C7.27879 3.14099 6.33079 4.08348 5.38812 5.14588C4.42687 6.22921 3.50615 7.39823 2.83524 8.51671C2.13827 9.67863 1.83786 10.5794 1.83786 11.1765C1.83786 14.5047 6.73883 10.935 9.80193 10.1848ZM8 19C12.4183 19 16 15.4973 16 11.1765C16 6.85565 8 0 8 0C8 0 0 6.85565 0 11.1765C0 15.4973 3.58172 19 8 19Z" fill="#EBF479" />
                      </svg>
                    </StyledSvg>
                    <StyledFont color="#FFF" fontSize="16px" fontWeight="500">Liquidity Added</StyledFont>
                  </StyledPortfolioButton>
                  <StyledPortfolioButton>
                    <StyledSvg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.1515 13.1434C20.6962 11.9635 21 10.6496 21 9.26471C21 4.14795 16.8521 0 11.7353 0C6.61857 0 2.47062 4.14795 2.47062 9.26471C2.47062 10.4396 2.68933 11.5635 3.08827 12.5978C3.1362 12.7221 3.18674 12.845 3.23981 12.9667L0.371321 14.3149C0.293373 14.3513 0.223637 14.4022 0.166113 14.4647C0.10859 14.5271 0.0644118 14.5999 0.0361141 14.6789C0.0078164 14.7579 -0.00404402 14.8415 0.00121359 14.9249C0.0064712 15.0083 0.0287434 15.0899 0.0667519 15.165C0.10445 15.2403 0.15717 15.3076 0.221885 15.3631C0.2866 15.4186 0.362038 15.4613 0.443868 15.4886C0.525699 15.5159 0.612312 15.5273 0.698738 15.5223C0.785163 15.5172 0.8697 15.4957 0.947497 15.459L6.05397 13.0588C6.12385 13.0258 6.20296 13.0079 6.28207 13.0079H11.941C12.2877 13.0079 12.5778 13.2485 12.6306 13.5806C12.656 13.7396 12.6214 13.9021 12.533 14.0385C12.4447 14.175 12.3085 14.2762 12.1493 14.3238L9.62837 15.0874C9.35413 15.1714 9.16822 15.417 9.1669 15.6944C9.16558 15.9719 9.35281 16.2175 9.62705 16.3015L12.4737 17.1694C12.7572 17.2562 13.0572 17.2812 13.3519 17.2427C13.6467 17.2042 13.929 17.1031 14.1784 16.9467L18.6152 14.1722L18.8136 14.0842C19.0926 14.0098 19.4023 14.1135 19.5697 14.3595C19.6588 14.4913 19.6964 14.6495 19.6759 14.8057C19.6553 14.9618 19.578 15.1059 19.4576 15.2121L14.4474 19.1522C13.7275 19.7172 12.7387 19.8801 11.8658 19.5747L6.62883 17.7446C6.45611 17.6836 6.26361 17.6963 6.10012 17.779L2.88962 19.3965C2.81281 19.4352 2.74464 19.4881 2.68902 19.5522C2.63339 19.6163 2.5914 19.6903 2.56544 19.7701C2.53948 19.8499 2.53007 19.9338 2.53773 20.0171C2.54539 20.1004 2.56998 20.1814 2.6101 20.2555C2.77887 20.5673 3.17837 20.6882 3.50007 20.5253L6.45347 19.0376L11.4175 20.7735C11.854 20.9262 12.3102 21 12.7637 21C13.6682 21 14.5634 20.7048 15.282 20.1423L20.3041 16.1933C20.3107 16.187 20.3173 16.1819 20.3239 16.1768C21.0675 15.5443 21.2178 14.4638 20.6746 13.6646C20.5318 13.4544 20.3532 13.2798 20.1515 13.1434Z" fill="#EBF479" />
                      </svg>
                    </StyledSvg>
                    <StyledFont color="#FFF" fontSize="16px" fontWeight="500">Lent & Borrowed</StyledFont>
                  </StyledPortfolioButton>
                </StyledFlex>
              </StyledContainer>
            </StyledMiniCard>
          </StyledContainer>
        </StyledFlex>
      </StyledFlex>
      <StyledFlex gap="14px">
        <StyledMiniCard
          style={{ display: "flex", flex: 2, backgroundColor: "#EBF479", padding: 20 }}
          onClick={() => {
            router.push("/odyssey")
          }}
        >
          <StyledOdysseyVideoContainer>
            <StyledOdysseyVideo src="/videos/introOdyssey.webm" controls={false} muted autoPlay loop />
            <StyledChainList>
              {
                CHAINS.map((chain, index) => (
                  <StyledChainImage key={index} src={chain?.icon} />
                ))
              }
            </StyledChainList>
          </StyledOdysseyVideoContainer>
          <StyledContainer style={{ flex: 1, paddingLeft: 5, paddingRight: 35, paddingTop: 19 }}>
            <StyledOdysseyFontImage src="/images/intro/odyssey-title.png" />
            <StyledFlex flexDirection="column" style={{ marginLeft: 7, marginTop: 53 }}>
              <StyledFont fontSize="18px" fontWeight="500" lineHeight="150%" style={{ opacity: 0.8 }}>
                Embark on your Web3 Odyssey – where every action brings a chance to earn new rewards!
              </StyledFont>
              <StyledFont fontSize="18px" fontWeight="500" lineHeight="150%" style={{ opacity: 0.8 }}>
                Discover exciting missions across multiple networks, while exploring new dApps along the way.
              </StyledFont>
            </StyledFlex>
          </StyledContainer>
        </StyledMiniCard>
        <StyledMiniCard style={{ backgroundColor: "#5B56F3" }}>
          <StyledMiniCardImage src="/images/intro/rewards-bg.png" style={{ position: 'absolute', width: 405, right: 0, top: 0 }} />
          <StyledContainer style={{ paddingTop: 94, paddingLeft: 35 }}>
            <StyledFont color="#FFF" fontSize="36px" fontWeight="700" lineHeight="150%">Earnig Rewards</StyledFont>
            <StyledFont color="#FFF" fontSize="26px" fontWeight="700" lineHeight="150%">While Exploring</StyledFont>
          </StyledContainer>
        </StyledMiniCard>
      </StyledFlex>
      <StyledRockerRunningAudio ref={rockerRunningAudioRef} src="/images/intro/allinone/click-rocker.mp3" />
    </StyledMiniCardContainer>
  )
})