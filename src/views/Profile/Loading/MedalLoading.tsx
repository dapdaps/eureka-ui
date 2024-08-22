import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

import { StyledContainer, StyledFlex } from "@/styled/styles";
const StyledMedal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 404px;
  height: 150px;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
  padding: 20px;
  font-size: 0;
`
const StyledMedalLoading = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
`
const Medal = function () {
  return (
    <StyledMedal>
      <StyledFlex gap="15px">
        <Skeleton width={78} height={78} borderRadius={0} />
        <StyledFlex
          flexDirection="column"
          alignItems="flex-start"
          gap="9px"
          style={{ flex: 1, paddingTop: 5 }}
        >
          <Skeleton width={270} height={24} borderRadius={0} />
          <Skeleton width={270} height={34} borderRadius={0} />
        </StyledFlex>
      </StyledFlex>
      <Skeleton width={362} height={10} borderRadius={5} />
    </StyledMedal>
  )
}
export default memo(function MedalLoading() {
  return (
    <StyledMedalLoading>
      {
        new Array(3).fill(0).map((_, index) => <Medal key={index} />)
      }
    </StyledMedalLoading>
  )
})