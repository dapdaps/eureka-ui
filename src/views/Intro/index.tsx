import { StyledContainer, StyledFlex, StyledFont } from "@/styled/styles";
import BridgeSvg from "@public/images/intro/bridge.svg";
import SwapSvg from "@public/images/intro/swap.svg";
import ArrowSvg from "@public/images/intro/arrow.svg";
import ArrowRightSvg from "@public/images/intro/arrow-right.svg";
import PoundSignSvg from "@public/images/intro/pound-sign.svg";
import DavinciSvg from "@public/images/intro/davinci.svg";
import { memo } from "react";

import {
  StyledHeader,
  StyledLogo,
  StyledMenuList,
  StyledMenu,
  StyledBanner,
  StyledSuperButton,
  StyledExporeButton,
  StyledMainHeading,
  StyledMainTips
} from './styles'
import { MenuType } from "./types";
import RotateNetworks from "./components/RotateNetworks";
import Into from "./components/Into";
import MiniCard from "./components/MiniCard";
const MENU_LIST: MenuType[] = [{
  path: "",
  label: "Product",
}, {
  path: "",
  label: "Community",
}, {
  path: "https://dapdap.mirror.xyz/",
  label: "Blog",
}, {
  path: "https://docs.dapdap.net/",
  label: "Documentation",
}]

const logoUrl = 'https://assets.dapdap.net/images/logo.png';
export default memo(function HomePage() {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledLogo src={logoUrl} />
        <StyledMenuList>
          {
            MENU_LIST.map((menu: MenuType) => {
              return (
                <StyledMenu key={menu.label}>{menu.label}</StyledMenu>
              )
            })
          }
        </StyledMenuList>
      </StyledHeader>
      <StyledBanner>
        <StyledFlex justifyContent="center" gap="10px">
          <StyledFont color="#FFF" fontSize="18px" lineHeight="150%">Quick start DeFi  journey from</StyledFont>
          <StyledSuperButton style={{ width: 152 }}>
            <BridgeSvg />
            <StyledFont color="#FFF" fontWeight="600" lineHeight="100%">Super Bridge</StyledFont>
          </StyledSuperButton>
          <StyledSuperButton style={{ width: 145 }}>
            <SwapSvg />
            <StyledFont color="#FFF" fontWeight="600" lineHeight="100%">SuperSwap</StyledFont>
          </StyledSuperButton>
        </StyledFlex>
        <StyledMainHeading>
          <StyledFont color="#FFF" fontSize="90px" fontWeight="800" lineHeight="100%" textAlign="center">The Next-gen DeFi Consumer App</StyledFont>
          <ArrowSvg style={{ position: "absolute", left: 432, bottom: -43 }} />
          <PoundSignSvg style={{ position: "absolute", left: 178, top: -14 }} />
          <DavinciSvg style={{ position: "absolute", right: -142, bottom: -136 }} />
        </StyledMainHeading>
        <StyledMainTips>
          <StyledFont color="#FFF" fontSize="20px" lineHeight="150%" textAlign="center">DapDap offers the first one-of-a-kind Web3 experience.For network and infrastructure over-saturation, we are providing a simple, unified entry point into Ethereum L2s and their apps.</StyledFont>
        </StyledMainTips>
        <StyledExporeButton>
          <StyledFont color="#000" fontSize="18px" fontWeight="600">Explore now</StyledFont>
          <ArrowRightSvg />
        </StyledExporeButton>
      </StyledBanner>
      <RotateNetworks />
      <Into />
      <MiniCard />
    </StyledContainer>
  )
})