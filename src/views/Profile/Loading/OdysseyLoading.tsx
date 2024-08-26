import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

import { StyledContainer, StyledFlex } from "@/styled/styles";
const StyledOdyssy = styled.div`
  font-size: 0;
  width: 612px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
  display: flex;
  gap: 20px;
  overflow: hidden;
`
const StyledOdyssyLoading = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
`
const Odyssey = function () {
  return (
    <StyledOdyssy>
      <Skeleton width={400} height={220} borderRadius={0} />
      <StyledFlex
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="space-between"
        style={{
          paddingTop: 20,
          paddingBottom: 18
        }}
      >
        <Skeleton width={53} height={26} borderRadius={16} />
        <StyledFlex flexDirection="column" gap="16px" alignItems="flex-start">
          <Skeleton width={142} height={38} borderRadius={10} />
          <Skeleton width={160} height={38} borderRadius={10} />
        </StyledFlex>
      </StyledFlex>
    </StyledOdyssy>
  )
}
export default memo(function OdysseyLoading() {
  return (
    <StyledOdyssyLoading>
      {
        new Array(2).fill(0).map((_, index) => <Odyssey key={index} />)
      }
    </StyledOdyssyLoading>
  )
})