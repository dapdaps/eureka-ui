import styled from 'styled-components';

export const StyledContentClaim = styled.button`
  border-radius: 6px;
  border: 1px solid #000;
  height: 60px;
  background: #EBF479;
  padding: 17px 30px;
  position: relative;
  color: #000;
  text-align: center;
  font-family: Trans-America;
  font-size: 20px;
  font-weight: 400;
  top: -7px;
  left: -7px;
  z-index: 1;
  &.bottom {
    background: #AFB65F;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 0;
    pointer-events: none !important;
  }
  .claim {
    font-size: 36px;
  }
`;

export const StyledClaimContainer = styled.div`
  position: relative;
`;