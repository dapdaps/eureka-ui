import { memo } from "react";
import styled from "styled-components";
import chainCofig from "@/config/chains";

const StyledRotateNetworks = styled.div`
  position: relative;
  margin: 139px auto 0;
  width: 1277px;
  height: 340px;
  overflow: hidden;
`
const StyledRotateNetwork = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -36px;
  width: 72px;
  height: 780px;
  transform-origin: center bottom;
  transform: rotate(0deg);
`
const StyledRotateNetworkImage = styled.img`
  width: 72px;
  height: 72px;

`
const chains = Object.values(chainCofig);
export default memo(function RotateNetworks() {
  return (
    <StyledRotateNetworks>
      {
        chains.map((chain, index) => (
          <StyledRotateNetwork key={chain?.chainId} style={{transform: `rotate(${-45 + index * 8}deg)`}}>
            <StyledRotateNetworkImage src={chain?.icon} />
          </StyledRotateNetwork>
        ))
      }
    </StyledRotateNetworks>
  )
})