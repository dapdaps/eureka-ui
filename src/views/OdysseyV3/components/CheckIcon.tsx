import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 0px 10px;
`;

export default function CheckIcon() {
  return (
    <StyledContainer>
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path
          d="M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1"
          stroke="#00FFD1"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M4.99609 7.5L7.99609 10.5L15.4961 3" stroke="#00FFD1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </StyledContainer>
  );
}
