import styled from "styled-components";

export const StyledReward = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 84px;
  padding: 12px 28px 12px 12px;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
  cursor: pointer;
  &:hover {
    background-color: #18191E;
    backdrop-filter: blur(10px);
  }
`
export const StyledSource = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
export const StyledSourceImage = styled.img`
  width: 60px;
  height: 60px;
`
export const StyledSourceMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

`
export const StyledFilterOptionsWrap = styled.div`
  padding-top: 8px;
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
`
export const StyledFilterOptions = styled.div`
  width: 169px;
  border-radius: 10px;
  border: 1px solid #333648;
  background: #1F2229;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 50;
`

export const StyledFilterOption = styled.div`
  padding: 16px 14px 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 16px */
  cursor: pointer;
  &:after {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
  &.active:after {
    background-color: #EBF479;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }


`
export const StyledFilter = styled.div`
  position: relative;
  &:hover {
    ${StyledFilterOptionsWrap} {
      display: block;
    }
  }
`
export const StyledFilterCurrent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

`
export const StyledRewardHeader = styled.div`
  padding: 32px 28px 18px 12px;
  display: flex;
  align-items: center;
`