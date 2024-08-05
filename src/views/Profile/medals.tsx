import { StyledContainer, StyledFlex, StyledFont } from "@/styled/styles";
import { memo } from "react";
import styled from "styled-components";

const StyledLineGradientFont = styled(StyledFont)`
  text-align: center;
  font-size: 46px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 46px */
  text-transform: uppercase;
  background: linear-gradient(90deg, #FFF 0%, #979ABE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const StyledInnerContainer = styled.div`
  width: 1244px;
  max-width: 100%;
  margin: 0 auto;
  z-index: 5;
`
export default memo(function MedalsView() {
  return (
    <StyledContainer style={{ paddingTop: 85 }}>
      <StyledInnerContainer>
        <StyledLineGradientFont>achievements</StyledLineGradientFont>
        <StyledFlex gap='6px' style={{ paddingLeft: 16, marginBottom: 20 }}>
          <StyledFont color='#FFF' fontSize='20px' fontWeight='600'>DapDap Explorer</StyledFont>
        </StyledFlex>
        
      </StyledInnerContainer>
    </StyledContainer>
  )
})