import Big from "big.js";
import { useRouter } from "next/router";
import { memo } from "react";
import styled from "styled-components";

import { StyledFlex, StyledFont, StyledSvg } from "@/styled/styles";
import Counter from "@/views/AllDapps/components/Title/Counter";

import useStats from "../../hooks/useStats";
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
  const { stats } = useStats()
  const router = useRouter()
  console.log('====stats', stats)
  return (
    <StyledInto>
      <StyledIntoTitle>
        Your Universal Gateway into Ethereum L2s
      </StyledIntoTitle>
      <StyledNetworksAndDapps>
        <StyledNetworks>
          <StyledFlex flexDirection="column" alignItems="flex-start">
            <StyledFont color="#000" fontSize="56px" fontWeight="800" lineHeight="100%">
              <Counter
                from={1}
                to={15}
              />+
            </StyledFont>
            <StyledFont color="#000" fontSize="26px" fontWeight="800" lineHeight="100%">Networks</StyledFont>
          </StyledFlex>
          <StyledSvg
            style={{ cursor: 'pointer' }}
            onClick={() => {
              router.push("https://app.dapdap.net/networks")
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68" fill="none">
              <circle cx="34" cy="34" r="34" fill="black" />
              <path d="M24.9397 43.2473L43.4332 24.7538M43.4332 24.7538L24.9387 24.7536M43.4332 24.7538L43.4331 43.2474" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
          </StyledSvg>
        </StyledNetworks>
        <StyledDapps>
          <StyledFlex flexDirection="column" alignItems="flex-start">
            <StyledFont color="#000" fontSize="56px" fontWeight="800" lineHeight="100%">
              <Counter
                from={1}
                to={stats?.total_dapp || 0}
                formatter={(value) => {
                  return Big(value).gt(10) ? `${Big(value).div(10).toFixed(0, 0)}0+` : Big(value).toFixed(0, 0);
                }}
              />
            </StyledFont>
            <StyledFont color="#000" fontSize="26px" fontWeight="800" lineHeight="100%">Popular dApps</StyledFont>
          </StyledFlex>
          <StyledSvg
            style={{ cursor: 'pointer' }}
            onClick={() => {
              router.push("https://app.dapdap.net/alldapps")
            }}
          >
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