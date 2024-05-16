import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 7;
  background-color: ${() => `var(--odyssey-primary-color)`};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  max-width: 1244px;
  margin: 0 auto;
  padding: 21px 22px;
`;

export const StyledContent = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0;
  justify-content: space-between;
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
