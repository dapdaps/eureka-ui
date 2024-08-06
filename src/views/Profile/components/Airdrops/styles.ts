import styled from "styled-components";

export const StyledContainer = styled.div`
`
export const StyledAirdropCard = styled.div`
  width: 405px;
  height: 174px;
  padding: 19px 20px 14px;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
`
export const StyledNetworkImage = styled.img`
  width: 72px;
`
export const StyledCategoryContainer = styled.div<{ color: string }>`
  padding: 1px;
  border-radius: 30px;
  background-color: ${({ color }) => color};
  color: ${({ color }) => color};
`
export const StyledCategory = styled.div`
  padding: 6px 10px;
  border-radius: 30px;
  /* border: 1px solid #C1BFFF;
  opacity: 0.5; */
  /* color: #C1BFFF; */
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 12px */
`