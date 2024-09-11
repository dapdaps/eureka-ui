import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
export const StyledRing = styled.svg`
  width: 20px;
  height: 20px;
  transform: rotate(-90deg);
  circle {
    cx: 10px;
    cy: 10px;
    r: 8.5px;
    fill: none;
    stroke-width: 3px;
    stroke-linecap: round;
  }
`;
export const StyledAmount = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
