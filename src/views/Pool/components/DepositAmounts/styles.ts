import styled from 'styled-components';

export const StyledContainer = styled.div`
  margin-top: 20px;
`;

export const StyledSubtitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-bottom: 10px;
`;

export const StyledInput = styled.div<{ $error?: boolean }>`
  margin-top: 10px;
  border-radius: 4px;
  background: ${({ $error }) => ($error ? 'rgba(255, 157, 151, 0.10)' : '#2E3142')};
  height: 78px;
  padding: 18px 16px 8px 14px;
  border: 1px solid ${({ $error }) => ($error ? '#FF9D97' : '#373A53')};
`;

export const StyledInputTokenBox = styled.div`
  display: flex;
`;

export const StyledInputInner = styled.input`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  height: 26px;
  flex-grow: 1;
`;

export const StyledToken = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StyledEmptyToken = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  background: var(--button-color);
  width: 128px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;

export const StyledSymbol = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledDesc = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 3px;
`;

export const StyledBalance = styled.span`
  color: #fff;
  text-decoration-line: underline;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
