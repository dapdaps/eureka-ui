import { StyledContainer, StyledFlex } from "@/styled/styles";
import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
const StyledAirdrap = styled.div`
  width: 405px;
  height: 174px;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
  padding: 20px;
`
const StyledAirdrapLoading = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
`
const Airdrap = function () {
  return (
    <StyledAirdrap>
      <StyledFlex gap="20px">
        <Skeleton width={72} height={72} borderRadius={16} />
        <StyledFlex flexDirection="column" alignItems="flex-start" justifyContent="space-between">
          <StyledFlex justifyContent="space-between">
            <Skeleton width={163} height={24} />
            <Skeleton width={64} height={24} />
          </StyledFlex>

        </StyledFlex>
      </StyledFlex>
    </StyledAirdrap>
  )
}
export default memo(function AirdrapLoading() {
  return (
    <StyledAirdrapLoading>
      {
        new Array(3).fill(0).map(() => <Airdrap />)
      }
    </StyledAirdrapLoading>
  )
})