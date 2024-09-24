import styled from 'styled-components';

const StyledExchangeIcon = styled.div`
  cursor: pointer;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 4px solid var(--agg-border-color, #262836);
  background: var(--agg-bg-color, #2e3142);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ExchangeIcon() {
  return (
    <StyledExchangeIcon>
      <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.49992 1.5V12M6.49992 12L1 6.5M6.49992 12L12 6.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </StyledExchangeIcon>
  );
}
