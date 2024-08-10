import styled from "styled-components";

export const StyledEmptyContainer = styled.div`
  position: relative;
  margin-top: 76px;
`
export const StyledEmpty = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  min-height: 523px;
`
export const StyledRangeContainer = styled.div`
  /* padding-top: 76px; */
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%);
  }
`
export const StyledRange = styled.div`
  flex: 1;
  height: 220px;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
`
export const StyledSecondRange = styled.div`
  flex: 1;
  height: 84px;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
`
export const StyledButton = styled.div`
  cursor: pointer;
  width: 232px;
  height: 50px;
  border-radius: 8px;
  background: #EBF479;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #02051E;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 16px */
`
export const StyledLineGradientFont = styled.div`
  text-align: center;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  background: linear-gradient(90deg, #FFF 0%, #979ABE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
export const StyledTips = styled.div`
  margin: 20px 0 43px;
  width: 461px;
  color: #979ABE;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  text-align: center;
`