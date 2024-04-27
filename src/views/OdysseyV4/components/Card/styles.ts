import styled from 'styled-components';

export const StyledContainer = styled.div<{ $disabled: boolean }>`
  width: 380px;
  height: 168px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #1c1e2d;
  background: #000;
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
  padding: 20px 16px 16px 20px;
`;
