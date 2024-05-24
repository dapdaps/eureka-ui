import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 7;
  text-align: center;
  background-color: #33C5F4;
  width: 1344px;
  height: 103px;
  margin: 0 auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 35px;
  padding-right: 22px;
`;

export const StyledContentText = styled.div`
  font-size: 20px;
  color: #000;
  .count {
    font-style: italic;
    font-weight: bold;
  }
`;

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