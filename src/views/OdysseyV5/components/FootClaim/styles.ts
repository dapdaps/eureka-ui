import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 7;
  width: 100%;
  max-width: ${() => `var(--odyssey-container-width)`};
  margin: 0 auto;
  padding-left: ${() => `var(--odyssey-container-gutter)`};
  padding-right: ${() => `var(--odyssey-container-gutter)`};
`;

export const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${() => `var(--odyssey-primary-color)`};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 20px 20px 22px 30px;

  .txt {
    color: #000;
    font-family: Chakra Petch;
    font-size: 20px;
    font-weight: 400;
  }
  .count {
    color: #000;
    font-style: italic;
    font-family: Chakra Petch;
    font-weight: 700;
  }
`;
