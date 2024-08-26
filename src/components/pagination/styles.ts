import { styled } from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  column-gap: 10px;
  justify-content: center;
  align-items: center;
  font-family: Montserrat;
`;
export const StyledBtnPrevious = styled.div`
  width: 6px;
  height: 12px;
  margin-right: 21px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledBtnNext = styled.div`
  width: 6px;
  height: 12px;
  margin-left: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledBtnPage = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #333648;
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #979ABE;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  transition: all ease-in-out 0.3s;
  
  &.active {
    background: #18191E;
    color: #FFF;
  }
`;
