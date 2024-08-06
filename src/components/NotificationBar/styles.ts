import { styled } from 'styled-components';

export const StyledContainer = styled.div`
  background: #ebf479;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 7;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Gantari;

  .close {
    position: absolute;
    top: 25px;
    right: 34px;
    cursor: pointer;
  }
`;
export const StyledContent = styled.div`
  max-width: 1200px;
  display: flex;
  height: 58px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  line-height: 19px;
`;
