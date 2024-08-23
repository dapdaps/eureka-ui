import { memo, useRef, useState } from "react";
import styled from "styled-components";
import GridChains from "./components/GridChains";
import { StyledSvg } from "@/styled/styles";

const StyledDavinciContainer = styled.div`
  position: relative;
  background: #000 url("/images/davinci/bg.png") no-repeat top center;
  background-size: 1655px 860px;
  height: 100dvh;

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`
const StyledLogo = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: 161px;
  display: flex;
  align-items: center;
  gap: 14px;
  z-index: 10;
`
const StyledLogoImage = styled.img`
  width: 272px;
`
const StyledChainsContainer = styled.div`
  position: relative;
  background-color: #000;
  height: 100dvh;
  ${StyledLogo} {
    left: 540px;
    top: 188px;
  }
  ${StyledLogoImage} {
    width: 299px;
  }
`


const StyledLogoFont = styled.div`
  width: 69px;
  height: 22px;
  border-radius: 6px;
  border: 1px solid #EBF479;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #EBF479;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`
const StyledPasswordInputContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 702px;
  /* transform: translate(-50%, 0); */
  margin-left: -202.5px;
  width: 405px;
  height: 68px;
  border-radius: 12px;
  border: 1px solid #45485E;
  background: #16171C;
  &.error {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    border-color: red;
  }
`
const StyledPasswordInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: #FFF;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
  &::placeholder {
    opacity: 0.2;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`
const StyledEnterButton = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
`
export default memo(function Davinci() {
  const [password, setPassword] = useState("")
  const [inStatus, setInStatus] = useState(0)
  const passwordInputContainerRef = useRef(null)
  const targetPassword = "socrates"
  const handleInput = function (_password: string) {
    setPassword(_password)
  }
  const handleEnter = function () {
    if (password === targetPassword) {
      setInStatus(1)
    } else {
      setInStatus(2)
      setTimeout(() => {
        setInStatus(0)
        setPassword("")
      }, 820)
    }
  }
  return inStatus === 1 ? (
    <StyledChainsContainer>
      <StyledLogo>
        <StyledLogoImage src="/images/davinci/oblique-logo.png" />
      </StyledLogo>
      <GridChains />
    </StyledChainsContainer>
  ) : (
    <StyledDavinciContainer>
      <StyledLogo>
        <StyledLogoImage src="/images/davinci/logo.png" />
        <StyledLogoFont>d’Avinci</StyledLogoFont>
      </StyledLogo>
      <StyledPasswordInputContainer ref={passwordInputContainerRef} className={inStatus === 2 ? "error" : ""}>
        <StyledPasswordInput type="password" value={password} placeholder="Password" maxLength={20} onChange={(event) => handleInput(event?.target?.value)} />
        <StyledEnterButton
          onClick={handleEnter}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="59" height="38" viewBox="0 0 59 38" fill="none">
            <g opacity={password ? "1" : "0.3"}>
              <rect x="0.5" y="0.5" width="58" height="37" rx="9.5" fill="#EBF479" stroke="black" />
              <path d="M32 13H36.5V22H23M23 22L27.5 17.5M23 22L27.5 26.5" stroke="black" stroke-width="2" stroke-linecap="round" />
            </g>
          </svg>
        </StyledEnterButton>
      </StyledPasswordInputContainer>
    </StyledDavinciContainer>
  )
})