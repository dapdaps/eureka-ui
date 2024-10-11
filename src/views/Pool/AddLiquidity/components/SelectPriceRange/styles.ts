import styled from 'styled-components';

export const StyledSubtitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledContainer = styled.div`
  margin-top: 20px;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export const StyledHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledFullRange = styled.div`
  color: #8d8d8d;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  cursor: pointer;
`;

export const StyledInput = styled.div`
  margin-top: 10px;
  height: 100px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  padding: 14px;
  box-sizing: border-box;
  display: flex;
`;

export const StyledInputLeft = styled.div`
  flex-grow: 1;
`;

export const StyledInputRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledInputButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #373a53;
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
`;

export const StyledInputInner = styled.input`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  height: 26px;
  margin-top: 8px;
  width: 100%;
  box-sizing: border-box;
  padding-right: 10px;
`;

export const StyledInputDesc = styled.div`
  color: #8e8e8e;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 3px;
`;

export const StyledHeaderAction = styled.button`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  width: 110px;
  height: 32px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
`;
