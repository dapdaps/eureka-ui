import { memo } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-top: 20px;
  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    color: rgba(255, 255, 255, 0.6);
    height: 120px;
  }
`;
const SetPriceRange = () => {
  return (
    <StyledContainer>
      <div className="empty">
        <EmptyIcon />
        <span>Your position will appear here.</span>
      </div>
    </StyledContainer>
  );
};

export default memo(SetPriceRange);
const EmptyIcon = () => {
  return (
    <svg width="42" height="34" viewBox="0 0 42 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 17L8.08994 3.65422C8.95763 2.02092 10.656 1 12.5055 1H29.4945C31.344 1 33.0424 2.02093 33.9101 3.65422L41 17M1 17V29C1 31.2091 2.79086 33 5 33H37C39.2091 33 41 31.2091 41 29V17M1 17H13L17 23H25L28.5 17H41"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="round"
      />
    </svg>
  );
};
