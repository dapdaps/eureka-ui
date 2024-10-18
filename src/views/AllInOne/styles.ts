import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
  color: #ffffff;
  height: 100%;

  .all-in-one-wrapper {
    position: relative;
    z-index: 1;
    height: 100%;
    //overflow: hidden;
  }
`;

export const StyledContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const StyledBg = styled.div<{ $color: string }>`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 0;
  top: 160px;
  width: 948px;
  height: 137px;
  flex-shrink: 0;
  border-radius: 948px;
  opacity: 0.5;
  background: ${({ $color }) => `radial-gradient(50% 50% at 50% 50%, ${$color} 0%, #16181D 100%)`};
  filter: blur(40px);
`;

export const StyledNavList = styled.div`
  display: flex;
  overflow: hidden;
  position: fixed;
  bottom: 0;
`;
