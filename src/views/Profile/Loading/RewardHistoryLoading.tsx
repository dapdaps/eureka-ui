import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

import { StyledContainer, StyledFlex } from "@/styled/styles";
const StyledRecord = styled.div`
  display: flex;
  align-items: center;
  width: 1244px;
  height: 84px;
  padding: 12px 28px 12px 12px;

  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
`
const StyledRecordLoading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const Reward = function () {
  return (
    <StyledRecord>
      <StyledFlex style={{ flex: 3 }} gap="20px">
        <Skeleton width={60} height={60} borderRadius={6} />
        <StyledFlex flexDirection="column" alignItems="flex-start" gap="10px">
          <Skeleton width={470} height={20} borderRadius={0} />
          <Skeleton width={60} height={18} borderRadius={0} />
        </StyledFlex>
      </StyledFlex>
      <StyledFlex style={{ flex: 1 }}>
        <Skeleton width={120} height={26} borderRadius={0} />
      </StyledFlex>
      <StyledFlex style={{ flex: 1 }}>
        <Skeleton width={140} height={20} borderRadius={0} />
      </StyledFlex>
    </StyledRecord>
  )
}
export default memo(function OdysseyLoading() {
  return (
    <StyledRecordLoading>
      {
        new Array(5).fill(0).map((_, index) => <Reward key={index} />)
      }
    </StyledRecordLoading>
  )
})