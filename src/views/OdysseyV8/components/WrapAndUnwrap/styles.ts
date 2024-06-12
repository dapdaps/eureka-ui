import styled from 'styled-components';

export const StyledHeader = styled.div`
  height: 54px;
  display: flex;
  position: relative;
  border-bottom: 1px solid #373a53;
`;

export const StyledTab = styled.div<{ $active: boolean }>`
  color: #979abe;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-bottom: 3px solid transparent;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.5s;

  ${({ $active }) => ($active ? `color: #fff; border-color: #fff;` : '')}

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

export const StyledCloseIcon = styled.div`
  color: #979abe;
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const StyledContent = styled.div`
  padding: 20px;
`;

export const StyledButton = styled.button`
  width: 380px;
  height: 48px;
  border-radius: 8px;
  background: linear-gradient(to bottom, #eef3bf, #e9f456);
  color: #02051e;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 24px;
  transition: 0.5s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }

  &:not(:disabled):hover {
    opacity: 0.8;
  }

  &:not(:disabled):active {
    opacity: 0.6;
  }
`;
