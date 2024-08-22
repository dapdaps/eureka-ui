import { memo } from "react";
import styled from "styled-components";

import { StyledFlex, StyledFont, StyledSvg } from "@/styled/styles";

const StyledInto = styled.div`
  position: relative;
  margin-top: -148px;
  height: 590px;
  background: #EBF479 url("/images/intro/into-bg.svg") no-repeat center;
  background-size: cover;
  z-index: 10;
  overflow: hidden;
`
const StyledIntoTitle = styled.div`
  margin: 72px auto 80px;
  width: 729px;
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 80px;
  font-style: normal;
  font-weight: 800;
  line-height: 120%; /* 96px */
`
const StyledNetworksAndDapps = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 293px;
`
const StyledNetworks = styled.div`
  display: flex;
  gap: 17px;
`
const StyledDapps = styled.div`
  display: flex;
  gap: 17px;
`
export default memo(function Into() {
  return (
    <StyledInto>
      <StyledIntoTitle>
        Your Universal Gateway into Ethereum L2s
      </StyledIntoTitle>
      <StyledNetworksAndDapps>
        <StyledNetworks>
          <StyledFlex flexDirection="column" alignItems="flex-start">
            <StyledFont color="#000" fontSize="56px" fontWeight="800" lineHeight="100%">15+</StyledFont>
            <StyledFont color="#000" fontSize="26px" fontWeight="800" lineHeight="100%">L2 Networks</StyledFont>
          </StyledFlex>
          <StyledSvg>
            <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68" fill="none">
              <circle cx="34" cy="34" r="34" fill="black" />
              <path d="M24.9397 43.2473L43.4332 24.7538M43.4332 24.7538L24.9387 24.7536M43.4332 24.7538L43.4331 43.2474" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
          </StyledSvg>
        </StyledNetworks>
        <StyledDapps>
          <StyledFlex flexDirection="column" alignItems="flex-start">
            <StyledFont color="#000" fontSize="56px" fontWeight="800" lineHeight="100%">200+ </StyledFont>
            <StyledFont color="#000" fontSize="26px" fontWeight="800" lineHeight="100%">L2 Networks</StyledFont>
          </StyledFlex>
          <StyledSvg>
            <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68" fill="none">
              <circle cx="34" cy="34" r="34" fill="black" />
              <path d="M24.9397 43.2473L43.4332 24.7538M43.4332 24.7538L24.9387 24.7536M43.4332 24.7538L43.4331 43.2474" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
          </StyledSvg>
        </StyledDapps>
      </StyledNetworksAndDapps>
    </StyledInto>
  )
})