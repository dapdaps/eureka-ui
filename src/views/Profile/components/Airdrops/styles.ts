import styled from "styled-components";

export const StyledContainer = styled.div`
`
export const StyledAirdropCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 405px;
  height: 174px;
  padding: 19px 20px 14px;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
  cursor: pointer;
`
export const StyledNetworkImage = styled.img`
  width: 72px;
`
export const StyledCategories = styled.div`
  display: flex;
  align-items: center;
`
export const StyledCategory = styled.div<{ colorRgb: string }>`
  padding: 6px 10px;
  border-radius: 30px;
  border: 1px solid rgba(${({ colorRgb }) => colorRgb}, 0.5);
  color: rgb(${({ colorRgb }) => colorRgb});
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 12px */
`
export const StyledChainImage = styled.img`
  width: 20px;
  height: 20px;
`