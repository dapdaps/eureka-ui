import styled from 'styled-components';

export const StyledContainer = styled.div`
  --portfolio-width: 1100px;
  --portfolio-gutter: 50px;
  --switch-color: #ebf479;
  font-family: Montserrat;
  padding: 60px 0 60px;
  min-height: 100vh;
  position: relative;

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

  a {
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration-line: underline;
    color: #000000;
  }
`;

export const StyledContent = styled.div`
  max-width: ${() => `var(--portfolio-width)`};
  padding: 0  ${() => `var(--portfolio-gutter)`};
  margin: 0 auto;
`;

export const StyledFeedbackContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

export const StyledLink = styled.div`
  a {
    color: #ffffff;
    text-decoration: none;
  }
`;

export const StyledFeedbackText = styled.div`
`;
