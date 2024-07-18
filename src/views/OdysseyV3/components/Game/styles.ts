import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 1136px;
  margin: 0 auto;
  padding-bottom: 100px;

  & .react-loading-skeleton {
    --base-color: transparent !important;
    --highlight-color: #ffeeda !important;
  }
`;

export const StyledCards = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
`;
