import styled from 'styled-components';

export const StyledContainer = styled.div<{ $disabled: boolean }>`
  width: 355px;
  height: 157px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid #373535;
  background: #1c1b1b;
  background-image: url(/images/odyssey/v2/card_bg.png);
  background-repeat: no-repeat;
  background-position: left bottom;
  transition: 0.3s;

  position: relative;
  overflow: hidden;

  ${({ $disabled }) =>
    !$disabled
      ? `
    &:hover {
      border-color: #876F50;
    }
    &:hover .card_active_bg {
      opacity: 0.5;
    }
    cursor: pointer;
    `
      : `
    cursor: default; 
    `}
`;

export const StyledBg = styled.div`
  border-radius: 268.784px;
  opacity: 0.5;
  filter: blur(50px);
  background: radial-gradient(50% 50% at 50% 50%, #fcfb68 0%, rgba(253, 248, 69, 0) 100%);

  width: 268.784px;
  height: 268.784px;
  flex-shrink: 0;
  position: absolute;
  z-index: 1;
  top: -80%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: 0.3s;
`;

export const StyledContent = styled.div`
  position: relative;
  z-index: 5;
  padding: 18px 16px 16px 18px;
`;
