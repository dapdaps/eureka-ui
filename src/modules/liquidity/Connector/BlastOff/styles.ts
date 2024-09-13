import styled from "styled-components"
export const StyledBlastoff = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
export const StyledCapsuleButtonList = styled.div`
  margin-top: 33px;
  display: flex;
  align-items: center;
  padding: 4px;
  /* gap: 20px; */

  border-radius: 8px;
  border: 1px solid #373A53;
  background: rgba(33, 35, 48, 0.5);
`
export const StyledCapsuleButton = styled.div`
  padding: 8px 33px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;

  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
export const StyledVaultContainer = styled.div`
  margin-top: 20px;
  width: 478px;
  height: 655px;
  padding: 20px 18px;
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836;
`
export const StyledVaultTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const StyledVaultTitle = styled.div`
  color: #FFF;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

export const StyledVaultImage = styled.img`
  width: 37px;
`
export const StyledTokenButtonList = styled.div`
  margin: 28px 0 20px;
  display: flex;
  align-items: center;
  gap: 9px;
`
export const StyledTokenButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 218px;
  height: 37px;
  border-radius: 8px;
  border: 1px solid var(--button-color);
  cursor: pointer;

  color: var(--button-color);
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &.active {
    color: var(--button-text-color);
    background: var(--button-color);
  }
  
`
export const StyledVaultTipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const StyledVaultTips = styled.div`
  width: 100%;
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
export const StyledStackedRectangle = styled.div`
  margin: 20px 0;
  height: 213px;
  border-radius: 12px;
  border: 1px solid #373A53;
  padding: 13px 12px 15px;

`
export const StyledStackedRectangleTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const StackedRectangleBalance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const StackedRectangleBalanceTitle = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
export const StackedRectangleBalanceSubTitle = styled.div`
  color: #F49102;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
export const StyledStackedRectangleMiddle = styled.div`
  margin: 14px 0;
  padding: 10px 14px;
  height: 71px;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: #2E3142;
`
export const StyledStackedRectangleMiddleTop = styled.div`
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const StyledStackedRectangleMiddleTitle = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
export const StyledStackedRectangleMiddleMax = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  cursor: pointer;
`
export const StyledStackedRectangleMiddleInput = styled.input`
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  color: #FFF;
  font-family: Gantari;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }

`
export const StyledStackedRectangleBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const StyledStakeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-radius: 8px;
  background: var(--button-color);
  cursor: pointer;

  color: var(--button-text-color);
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &[disabled] {
    opacity: 0.3;
  }
`
export const StyledStakeLoadingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-radius: 8px;
  background: var(--button-color);
  opacity: 0.3;
`
export const StyledPositionsContainer = styled.div`

`
export const StyledPositionsTips = styled.div`
  margin-top: 73px;
  text-align: center;
  color: #979ABE;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
export const StyledPostions = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`
export const StyledPostion = styled.div`
  display: flex;
  align-items: center;

  padding: 0 22px;
  width: 1200px;
  height: 97px;
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836;
`
export const StyledPostionColumn = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`
export const StyledPostionRow = styled.div`
  display: flex;
  gap: 10px;
`

export const StyledPostionLabel = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
export const StyledPostionValue = styled.div`
  color: #F49102;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
export const StyledClaimButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 182px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 8px;
  cursor: pointer;

  color: #000;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  background: #FFF;
  &[disabled] {
     opacity: 0.3;
  }
  
`
export const StyledUnstakeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 182px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 8px;
  cursor: pointer;

  color: #FFF;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: 1px solid #FFF;
  &[disabled] {
    background: #FFF;
    opacity: 0.3;
  }
`