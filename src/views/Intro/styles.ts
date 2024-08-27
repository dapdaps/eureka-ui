import styled from "styled-components";

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  padding: 0 45px 0 36px;
  background-color: #000;
`
export const StyledLogo = styled.img`
  height: 32px;
`
export const StyledMenuList = styled.div`
  display: flex;
  gap: 68px;
`
export const StyledMenu = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 27px */
`
export const StyledBanner = styled.div`
  margin: 0 auto;
  padding-top: 72px;
  max-width: 1452px;
  width: 100%;
  background: url('/images/intro/banner-bg.svg') no-repeat center;
  background-size: 100% 511px;
`
export const StyledSuperButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #202329;
  background: #18191E;
  backdrop-filter: blur(10px);
`
export const StyledExporeButton = styled.div`
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

export const StyledMainHeading = styled.div`
  position: relative;
  margin: 30px auto 62px;
  width: 917px;
`
export const StyledMainTips = styled.div`
  width: 731px;
  margin: 0 auto 30px;
`

export const StyledFist = styled.img`
  width: 272px;
  margin: 84px auto 20px;
  display: block;
`