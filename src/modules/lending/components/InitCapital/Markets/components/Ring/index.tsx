import styled from 'styled-components';

import { StyledSvg } from '@/styled/styles';

const StyledRing = styled.div`
  position: relative;
`;
const StyledRingFont = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export default function Ring(props: any) {
  const getStrokeDasharray = function (percent: string) {
    const diameter = Math.floor(2 * Math.PI * 25);
    let val: any = parseFloat(percent).toFixed(0);
    val = Math.max(0, val);
    val = Math.min(100, val);
    return (diameter * val) / 100 + ',1000';
  };
  return (
    <StyledRing>
      <StyledSvg>
        <svg xmlns="http://www.w3.org/200/svg" height="60" width="60">
          <circle cx="30" cy="30" r="25" fill="none" stroke="#373A53" stroke-width="5" stroke-linecap="round"></circle>
          <circle
            style={{ transformOrigin: '30px 30px', transform: 'rotate(-90deg)' }}
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke-width="5"
            stroke-linecap="round"
            stroke="#FFF"
            stroke-dasharray={getStrokeDasharray(props?.percent ?? 0)}
          ></circle>
        </svg>
      </StyledSvg>
      <StyledRingFont>{props?.percent ?? 0}%</StyledRingFont>
    </StyledRing>
  );
}
