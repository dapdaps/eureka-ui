import styled from 'styled-components';

export const StyledContainer = styled.div`
  background: #ebf479;
  /* position: fixed;
  left: 0;
  right: 0;
  z-index: 7; */
  .close {
    position: absolute;
    top: 25px;
    right: 34px;
    cursor: pointer;
  }
`;

export const StyledContent = styled.div`
  display: flex;
  height: 58px;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
