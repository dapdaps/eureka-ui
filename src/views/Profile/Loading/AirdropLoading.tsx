import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

import { StyledContainer, StyledFlex } from "@/styled/styles";
const StyledAirdrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 404px;
  height: 174px;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
  padding: 20px;
  font-size: 0;
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
        <StyledFlex
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="space-between"
          style={{ flex: 1 }}
        >
          <StyledFlex
            justifyContent="space-between"
            style={{ width: '100%', marginBottom: 10 }}
          >
            <Skeleton width={163} height={24} borderRadius={0} />
            <Skeleton width={64} height={24} borderRadius={0} />
          </StyledFlex>
          <Skeleton width={270} height={44} borderRadius={0} />
        </StyledFlex>
      </StyledFlex>
      <StyledFlex flexDirection="column" alignItems="flex-start" gap="12px">
        <Skeleton width={362} height={24} borderRadius={0} />
        <Skeleton width={362} height={10} borderRadius={5} />
      </StyledFlex>
    </StyledAirdrap>
  )
}
export default memo(function AirdrapLoading() {
  return (
    <StyledAirdrapLoading>
      {
        new Array(3).fill(0).map((_, index) => <Airdrap key={index} />)
      }
    </StyledAirdrapLoading>
  )
})