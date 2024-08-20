import styled from "styled-components";
export const StyledMedalCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 401px;
  height: 150px;
  padding: 20px 12px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
`
export const StyledMedalImage = styled.img`
  width: 78px;
  &.disabled {
    /* transform: translateX(-100vw); */
    filter: sepia(1) hue-rotate(210deg) saturate(1)
  }
`
export const StyledMark = styled.div`
  position: absolute;
  right: 20px;
  top: 0;
  width: 52px;
  height: 26px;
  flex-shrink: 0;
  background-color: #222430;
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`