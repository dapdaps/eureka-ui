import { memo } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 4px solid #262836;
  background: #2e3142;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -8px;
  margin-right: -8px;
  position: relative;
  z-index: 10;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

const Exchange = ({ onClick }: any) => {
  return (
    <StyledContainer onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path
          d="M1 6.50008L11.5 6.50008M11.5 6.50008L6 12M11.5 6.50008L6 1"
          stroke="#FCC42C"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </StyledContainer>
  );
};

export default memo(Exchange);
