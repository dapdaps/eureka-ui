import { memo } from "react"
import styled from "styled-components"

import { StyledFont, StyledSvg } from "@/styled/styles"

import type { NavigationType } from "../../types"
const StyledHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  padding: 0 45px 0 36px;
  background-color: #000;
  z-index: 50;
`
const StyledLogo = styled.img`
  height: 32px;
`
const StyledMenuList = styled.div`
  display: flex;
  gap: 68px;
`
const StyledMenuPopUp = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  left: 50%;
  padding-top: 7px;
  transform: translate(-50%, 100%);
`
const StyledMenuContainer = styled.div`
  position: relative;
  &:hover {
    ${StyledMenuPopUp} {
      display: block;
    }
  }
`
const StyledMenu = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 27px */
  cursor: pointer;
`

const StyledMenuPopUpBody = styled.div`
  padding: 6px 7px;
  width: 206px;
  height: 198px;
  border-radius: 20px;
  background: #F2F2F2;
  box-shadow: 12px 12px 0px 0px rgba(0, 0, 0, 0.25);
`
const StyledCommunity = styled.div`
  cursor: pointer;
  height: 57px;
  border-radius: 16px;
  /* background: #DADADA; */
  padding-left: 18px;
  display: flex;
  align-items: center;
  gap: 17px;
  &:hover {
    background: #DADADA;
  }
  ${StyledSvg} {
    width: 25px;
  }
`

const MENU_LIST: NavigationType[] = [{
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
const COMMUNITY_LIST: NavigationType[] = [{
  label: "X / Twitter",
  path: "https://twitter.com/DapDapMeUp",
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
      <path d="M10.7975 8.04613L17.5516 0H15.9516L10.0846 6.98491L5.40206 0H0L7.08242 10.5634L0 19H1.59994L7.79169 11.6221L12.7378 19H18.1399M2.17739 1.2365H4.63535L15.9504 17.8242H13.4919" fill="black" />
    </svg>
  )
}, {
  label: "Discord",
  path: "https://discord.gg/dapdapmeup",
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="16" viewBox="0 0 26 16" fill="none">
      <path d="M12.5971 0.785621C7.5818 0.785621 4.06358 2.70789 4.06358 2.70789C5.99112 1.17007 9.35963 0.284162 9.35963 0.284162L9.04149 0C5.87883 0.050146 3.0156 2.00584 3.0156 2.00584C-0.203207 8.00665 0.0026473 13.1884 0.0026473 13.1884C2.6226 16.2139 6.51511 15.9966 6.51511 15.9966L7.8438 14.4922C5.50456 14.0409 4.02615 12.1855 4.02615 12.1855C4.02615 12.1855 7.54438 14.325 12.5971 14.325C17.6499 14.325 21.1681 12.1855 21.1681 12.1855C21.1681 12.1855 19.6897 14.0409 17.3505 14.4922L18.6792 15.9966C18.6792 15.9966 22.5717 16.2139 25.1917 13.1884C25.1917 13.1884 25.3975 8.00665 22.1787 2.00584C22.1787 2.00584 19.3155 0.050146 16.1528 0L15.8347 0.284162C15.8347 0.284162 19.2032 1.17007 21.1307 2.70789C21.1307 2.70789 17.6125 0.785621 12.5971 0.785621ZM8.72336 7.12073C9.93976 7.12073 10.9316 8.07351 10.9129 9.24358C10.9129 10.3969 9.93976 11.3664 8.72336 11.3664C7.52566 11.3664 6.55254 10.3969 6.55254 9.24358C6.55254 8.07351 7.50695 7.12073 8.72336 7.12073ZM16.5271 7.12073C17.7435 7.12073 18.7166 8.07351 18.7166 9.24358C18.7166 10.3969 17.7435 11.3664 16.5271 11.3664C15.3294 11.3664 14.3563 10.3969 14.3563 9.24358C14.3563 8.07351 15.3107 7.12073 16.5271 7.12073Z" fill="black" />
    </svg>
  )
}, {
  label: "Telegram",
  path: "https://t.me/DapDapDiscussion",
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 24 19" fill="none">
      <path d="M8.71985 17.8505L9.07994 12.5365L18.9566 3.84302C19.3939 3.45357 18.8666 3.26513 18.2879 3.60433L6.09636 11.1294L0.823662 9.49627C-0.30804 9.1822 -0.3209 8.41587 1.08087 7.86311L21.6187 0.124434C22.5575 -0.290138 23.4577 0.350564 23.0976 1.7576L19.5996 17.8505C19.3553 18.9937 18.648 19.2701 17.6706 18.7425L12.3464 14.8983L9.78725 17.3229C9.49146 17.6118 9.24712 17.8505 8.71985 17.8505Z" fill="black" />
    </svg>
  )
},]
const logoUrl = 'https://assets.dapdap.net/images/logo.png';
export default memo(function Header() {
  return (
    <StyledHeader>
      <StyledLogo src={logoUrl} />
      <StyledMenuList>
        {
          MENU_LIST.map((menu: NavigationType) => {
            return menu?.label === "Community" ? (
              <StyledMenuContainer key={menu.label}>
                <StyledMenu key={menu.label}>{menu.label}</StyledMenu>
                <StyledMenuPopUp>
                  <StyledMenuPopUpBody>
                    {
                      COMMUNITY_LIST.map(community => (
                        <StyledCommunity
                          key={community.label}
                          onClick={() => {
                            community?.path && window.open(community?.path, '_blank')
                          }}
                        >
                          <StyledSvg>
                            {community?.icon}
                          </StyledSvg>
                          <StyledFont fontSize="18px" fontWeight="500" lineHeight="150%">{community?.label}</StyledFont>
                        </StyledCommunity>
                      ))
                    }
                  </StyledMenuPopUpBody>
                </StyledMenuPopUp>
              </StyledMenuContainer>
            ) : (
              <StyledMenu key={menu.label} onClick={() => {
                menu?.path && window.open(menu?.path, "_blank")
              }}>{menu.label}</StyledMenu>
            )
          })
        }
      </StyledMenuList>
    </StyledHeader>
  )
})
