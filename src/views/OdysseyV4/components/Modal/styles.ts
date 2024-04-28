import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  /* overflow-y: auto; */
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`;

export const StyledContent = styled.div`
  width: 834px;
  position: relative;
  background-color: #191b1f;
  padding: 35px 55px;
  border: 1px solid #3c3d00;
  .shape {
    position: absolute;
    left: -60px;
    top: -80px;
  }
  .shape2 {
    left: -80px;
    top: -96px;
  }
  .shape3 {
    left: -143px;
    top: -68px;
  }
  .shape4 {
    left: -82px;
    top: -75px;
  }
  .shape5 {
    top: -60px;
  }
  .close {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
  }
  .corner-left {
    position: absolute;
    left: -6px;
    bottom: -6px;
  }
  .corner-right {
    position: absolute;
    right: -6px;
    top: -6px;
  }
`;
