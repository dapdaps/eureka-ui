import styled from "styled-components";
import {
  StyledFont
} from "@/styled/styles";
interface CircleImageProps {
  size?: string;
}
export const StyledGantariFont = styled(StyledFont)`
  font-family: Gantari;
`
export const StyledCircleImage = styled.img<CircleImageProps>`
  width: ${props => props.width || "32px"};
  border-radius: 50%;
`
export const StyledSwitchButton = styled.div`
  cursor: pointer;
  padding: 7px 18px;
  border-radius: 8px;
  border: 1px solid transparent;
  /* background: #2E3142; */

  color: #979ABE;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &.active {
    color: #FFF;
    border-color: #373A53;
    background: #2E3142;
  }
`
export const StyldePercentageButton = styled.div`
  /* padding: 12px 6px; */
  width: 42px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid #404560;

  /* &.active {
    border-color: #979ABE;
    background: #404560;
  } */
`
export const StyldePercentageInput = styled.input`
  background: transparent;
  outline: none;
  width: 50px;
`
export const StyledOperationButton = styled.div<{
  theme?: string
}>`
  cursor: pointer;
  flex: 1;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid transparent;

  color: ${props => props.theme || "#81ED70"};
  text-align: center;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &.active {
    border-color: ${props => props.theme || "#81ED70"};
  }
`
export const StyledNumberInput = styled.input`
  flex: 1;
  background: transparent;
  outline: none;
  color: #FFF;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  &::placeholder {
    color: #979ABE;
  }
`
export const StyledRange = styled.input`
  width: 100%;
  background-color: transparent;
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #ffffff;

    border: 3px solid #16181D;
    border-radius: 50%;
    cursor: pointer;
  }
`
export const StyledLongOrShortButton = styled.div`
  cursor: pointer;
  margin-top: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: #E1E1E1;
`
export const StyledMarket = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  height: 40px;
  padding-right: 14px;
  padding-left: 16px;
  cursor: pointer;
  &:hover {
    background-color: rgba(151, 154, 190, 0.1);
  }
`