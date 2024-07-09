import styled from 'styled-components';

export const StyledContainer = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const StyledInput = styled.div`
  height: 70px;
  width: 240px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  padding: 14px;
  box-sizing: border-box;
`;

export const StyledInputButton = styled.button`
  width: 30px;
  height: 30px;
  background: #2e3142;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  &:not(:disabled):hover {
    opacity: 0.8;
  }
  &:not(:disabled):active {
    opacity: 0.6;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const StyledInputLabel = styled.div`
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
`;

export const StyledInputInner = styled.input`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  height: 26px;
  width: 158px;
  text-align: center;
`;

export const StyledInputContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
