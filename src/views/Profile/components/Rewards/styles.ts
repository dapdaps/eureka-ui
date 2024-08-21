import styled from "styled-components";


export const StyledRewardTips = styled.div`
  display: none;
  position: absolute;
  left: 50%;
  padding: 15px 0;
  transform: translateX(-50%);
  width: 340px;
  padding: 8px 17px 11px;
  border-radius: 8px;
  border: 1px solid #333648;
  background: #1F2229;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  color: #979ABE;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`
export const StyledRewardContainer = styled.div`
  position: relative;
  z-index: 20;
  &:hover {
    ${StyledRewardTips} {
      display: block;
    }
  }
`
export const StyledReward = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 160px;
  height: 48px;
  cursor: pointer;
  
  border-radius: 24px;
  border: 1px solid #373A53;
  background: rgba(16, 17, 21, 0.80);
  backdrop-filter: blur(5px);
  
  
`

