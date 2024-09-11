import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  gap: 30px;
`;
export const StyledWrapper = styled.div``;

export const StyledSvg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledImage = styled.img``;

export const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0;
`;

export const StyledFont = styled.div`
  color: #000;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: normal;
`;
export const StyledDashed = styled.div`
  flex: 1;
  border-bottom: 1px dashed #979abe;
`;
export const StyledOperationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: #5b6079;
  cursor: pointer;
  &:not(:disabled):hover {
    opacity: 0.8;
    background: #393c51;
  }
  &:disabled {
    background: #393c51;
    cursor: not-allowed;
  }
`;
export const StyledRange = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background-color: transparent;
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 5px;
    border-radius: 8px;
    background-color: #33364b;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 35px;
    height: 20px;
    border-radius: 36px;
    background-color: #16181d;
    margin-top: -7px;
    &:after {
      content: "12%";
      color: #fff;
    }
  }
`;
export const StyledTips = styled.div`
  display: none;
  position: absolute;
  left: 37px;
  top: -33px;
  border-radius: 6px;
  border: 1px solid #373a53;
  background: #262836;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 13px 16px;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const StyledButton = styled.button`
  position: relative;
  flex: 1;
  height: 48px;
  border-radius: 8px;
  background-color: #00ad79;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  &:not(:disabled):hover {
    opacity: 0.8;
    ${StyledTips} {
      display: block;
    }
  }
  &.borrow {
    background-color: #5d36c3;
  }
  &[disabled] {
    cursor: not-allowed;
  }
  &[disabled].supply {
    background-color: rgba(151, 154, 190, 0.2);
  }
  &[disabled].borrow {
    background-color: rgba(151, 154, 190, 0.2);
  }
  &[disabled].pending {
    background-color: rgba(0, 173, 121, 0.3);
  }
`;
export const StyledWithraw = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 102px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #00ad79;
  color: #00ad79;
  background-color: transparent;
  text-align: center;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;