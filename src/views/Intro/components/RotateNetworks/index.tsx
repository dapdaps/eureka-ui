import { memo, useState } from "react";
import styled from "styled-components";

import chainCofig from "@/config/chains";

const StyledRotateNetworksContainer = styled.div`
  position: relative;
  margin: 139px auto 0;
  width: 1277px;
  height: 340px;
  overflow: hidden;
`
const StyledRotateNetworks = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -780px;
  width: 1560px;
  height: 1560px;
  transform-origin: center;
  transform: rotate(0deg);
  animation: RotateAnimation 50s linear infinite;
  /* &:hover {
    animation-play-state: paused;
  } */
  @keyframes RotateAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
const StyledRotateNetwork = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -36px;
  width: 72px;
  height: 780px;
  transform-origin: center bottom;
  
`
const StyledRotateNetworkImage = styled.img`
  cursor: pointer;
  width: 72px;
  height: 72px;
`
const chains = Object.values(chainCofig);

export default memo(function RotateNetworks() {
  const [isMouseEnter, setIsMouseEnter] = useState(false)
  const len = chains.length
  const fillChains = new Array(45).fill(true).map((_, index) => chains[index % len])
  return (
    <StyledRotateNetworksContainer>
      <StyledRotateNetworks style={{ animationPlayState: isMouseEnter ? 'paused' : 'running' }}>
        {
          fillChains.map((chain, index) => (
            <StyledRotateNetwork key={chain?.chainId} style={{ transform: `rotate(${index * 8}deg)` }}>
              <StyledRotateNetworkImage
                src={chain?.icon}
                onMouseEnter={() => {
                  setIsMouseEnter(true)
                }}
                onMouseLeave={() => {
                  setIsMouseEnter(false)
                }}
              />
            </StyledRotateNetwork>
          ))
        }
      </StyledRotateNetworks>
    </StyledRotateNetworksContainer>
  )
})