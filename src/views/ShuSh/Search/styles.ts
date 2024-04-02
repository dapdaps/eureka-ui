import styled from 'styled-components';
export { LoadingWrapper } from '@/views/QuestProfile/styles';
export { StyledBack, StyledEmpty } from '../styles';

export const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 46px;
  color: #fcc42c;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
  position: relative;
  z-index: 10;
  margin-bottom: 20px;
`;

export const StyledInputBox = styled.div`
  flex-grow: 1;
  height: 43px;
  border-radius: 12px;
  border: 1px solid #373a53;
  padding: 8px 14px 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.3s;
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

export const StyledInputIcon = styled.div`
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;
