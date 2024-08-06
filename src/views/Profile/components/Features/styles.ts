import styled from "styled-components";

export const StyledFeature = styled.div`
  position: relative;
  width: 612px;
  height: 308px;
  flex-shrink: 0;

  border-radius: 20px;
  border: 1px solid #202329;
  background: #101115;
  cursor: pointer;
`
export const StyledMasker = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(16, 17, 21, 0.00) 0%, #101115 100%);
`
export const StyledIntroImageContainer = styled.div`
  position: absolute;
  top: 110px;
  left: 0;
  width: 100%;
  height: 198px;
  border-radius: 16px;
  overflow: hidden;
`
export const StyledIntroImage = styled.img`
  margin: 0 auto;
  width: 599px;
`