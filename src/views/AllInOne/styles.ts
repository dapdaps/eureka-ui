import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
  margin: 0 8%;
  color: #ffffff;
  padding-top: 50px;
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
  /* position: relative; */
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 24px 100px;
  /* z-index: 0; */
`;

export const StyledBg = styled.div<{ $color: string; }>`
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
  justify-content: center;
  align-items: stretch;
  flex-wrap: nowrap;
  height: 144px;
  padding-top: 40px;
  gap: 16px;
  overflow: hidden;
  position: fixed;
  bottom: 0;
`;
