import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 1000px;
  margin: 0 auto 150px;
`;
export const StyledTitle = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 36px;
  font-style: italic;
  font-weight: 700;
  line-height: 100%;
  text-transform: capitalize;
`;
export const StyledContent = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  
  .campaign-medal-progress-bar-bar {
    background: #121219;
  }
  .campaign-medal-reward-badge {
    background: #323440;
  }
`;
