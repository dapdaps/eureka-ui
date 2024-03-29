import styled from 'styled-components';
export { LoadingWrapper } from '@/views/QuestProfile/styles';
export { StyledEmpty } from '../../styles';

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

export const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledSearchBtn = styled.button`
  width: 120px;
  height: 43px;
  border-radius: 12px;
  background: #2e3142;
  color: #979abe;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;
