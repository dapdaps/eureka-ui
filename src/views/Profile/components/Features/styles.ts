import styled from "styled-components";

export const StyledContainer = styled.div`
  color: #ffffff;
`;

export const StyledCard = styled.div`
  width: calc(50% - 14px);
`;

export const StyledFeature = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
`
export const StyledMasker = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(16, 17, 21, 0.00) 0%, #101115 100%);
`
export const StyledEmpty = styled.div`
  margin: 0 auto;
`;