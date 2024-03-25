import styled from 'styled-components';
export { LoadingWrapper } from '@/views/QuestProfile/styles';

export const StyledContainer = styled.div``;

export const StyledHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTitle = styled.div`
  color: #fcc42c;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
`;

export const StyledSubtitle = styled.div`
  color: #979abe;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  padding-top: 4px;
  gap: 2px;
`;

export const StyledInputBox = styled.div`
  width: 182px;
  height: 43px;
  border-radius: 12px;
  border: 1px solid #373a53;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledInputWrapper = styled.div`
  flex-grow: 1;
`;

export const StyledInput = styled.input`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  width: 100%;

  &::placeholder {
    color: #979abe;
    opacity: 0.5;
  }
`;

export const StyledSearchIcon = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

export const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledEmpty = styled.div`
  color: #979abe;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  padding-top: 40px;
  opacity: 0.5;
`;
