import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`;

export const StyledContent = styled.div<{ $bgColor: string; ref: any }>`
  width: 834px;
  position: relative;
  /* background-color: #191b1f; */
  background-color: ${(props) => props.$bgColor || '#191b1f'};
  padding: 35px 55px;
  border: 1px solid #3c3d00;
  z-index: 2;
  .shape {
    position: absolute;
    left: -60px;
    top: -80px;
    z-index: 1;
  }
  .shape2 {
    left: -80px;
    top: -96px;
  }
  .shape3 {
    left: -169px;
    top: -83px;
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
    z-index: 1;
    cursor: pointer;
  }
  .corner-left {
    position: absolute;
    left: -6px;
    bottom: -6px;
    width: 37px;
    height: 37px;
    border-left: 1px solid #ebf479;
    border-bottom: 1px solid #ebf479;
  }
  .corner-right {
    position: absolute;
    width: 37px;
    height: 37px;
    border-top: 1px solid #ebf479;
    border-right: 1px solid #ebf479;
    right: -6px;
    top: -6px;
  }
`;
