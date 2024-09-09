import styled from 'styled-components';
export const StyledMedalCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 401px;
  height: 150px;
  padding: 26px 12px 20px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
`;
export const StyledMedalImage = styled.img`
  width: 78px;
  &.disabled {
    /* transform: translateX(-100vw); */
    filter: sepia(1) hue-rotate(210deg) saturate(0.5);
    opacity: 0.5;
  }
`;
export const StyledMark = styled.div`
  position: absolute;
  right: 20px;
  top: 0;
  /* width: 52px; */
  padding: 0 8.2px 0 11px;
  height: 26px;
  flex-shrink: 0;
  background-color: #222430;
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
export const StyledSpecifiedContainer = styled.div`
  border-radius: 16px;
  border: 3px solid rgba(87, 219, 100, 0.2);
`;
export const StyledSpecified = styled.div`
  width: 92px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: 1px solid #6c00f6;
  background: rgba(32, 34, 47, 0.8);

  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
