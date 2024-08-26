import { AnimatePresence, motion, useInView } from 'framer-motion';
import { memo } from "react";
import styled from "styled-components";

import { StyledSvg } from "@/styled/styles";
const StyledFistContainer = styled.div`
  margin: 80px auto 0;
  width: 292px;
  height: 210px;

`
const StyledFistDynamicImage = styled.img`
  width: 100%;
`
const StyledFistStaticImage = styled.img`
  width: 50%;
`
export default memo(function Fist() {
  return (
    <StyledFistContainer>
      <StyledFistDynamicImage src="/images/intro/twoFist.GIF" />
      {/* <StyledFistStaticImage src="/images/intro/twoFist.png" /> */}
    </StyledFistContainer>
  )
})