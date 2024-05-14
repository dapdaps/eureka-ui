import styled from 'styled-components';

export const StyledContainer = styled.div<{ $disabled: boolean }>`
  width: 380px;
  min-height: 168px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #1c1e2d;
  background-color: #000;
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
      border-color: var(--odyssey-primary-color);
    }
    &:hover .card_active_bg {
      opacity: 0.5;
    }
     &:hover .card_active_arrow {
      color: var(--odyssey-primary-color);
    }
    cursor: pointer;
    `
      : `
    cursor: default; 
    `}
`;

export const StyledBg = styled.div`
  border-radius: 50%;
  filter: blur(50px);
  background: radial-gradient(50% 50% at 50% 50%, #DFFE00 0%, rgba(223, 254, 0, 0) 100%);
  width: 268px;
  height: 268px;
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
  padding: 20px 16px 16px 20px;
`;