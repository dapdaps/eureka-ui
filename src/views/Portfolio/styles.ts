import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding-bottom: 60px;
  --switch-color: #ebf479;
  .frcs-gm {
    display: flex;
    gap: 5px;
  }
  .frcs {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  .asset-function-button {
    border: 1px solid #373a53;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
  }
  .dot {
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background: #c7cdff;
  }
`;

export const StyledContent = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
`;
