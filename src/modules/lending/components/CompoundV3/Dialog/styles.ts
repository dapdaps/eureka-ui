import styled from 'styled-components';

export const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0;
`;
export const StyledInput = styled.input`
  background-color: transparent;
  font-size: 16px;
  color: #fff;
  flex-grow: 1;
`;
export const StyledFont = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: normal;
`;
export const StyledDialog = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
export const StyledMasker = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;
export const StyledDialogMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 20px;
  width: 418px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #2e3142;
  z-index: 999;
  & > div {
    width: 100%;
  }
`;
export const StyledClose = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledBalanceWrapper = styled.div`
  height: 80px;
  background: #1b1e27;
  border: 1px solid #33364b;
  border-radius: 8px;
  padding: 16px 14px 13px 12px;
`;
export const StyledButton = styled.button`
  flex: 1;
  height: 48px;
  border-radius: 8px;
  text-align: center;
  line-height: 48px;
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  &:hover {
    opacity: 0.8;
  }
`;
