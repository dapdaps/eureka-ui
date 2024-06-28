import styled from 'styled-components';

import RefreshButton from './RefreshButton';

const Wrapper = styled.div<{ $active: boolean }>`
  color: #979abe;
  font-family: '5squared pixel';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  text-transform: capitalize;
  border: 1px solid #3d405a;
  border-radius: 4px;
  padding: 8px 15px;
  color: #979abe;

  text-transform: capitalize;
  display: flex;
  align-items: center;
  gap: 16px;

  ${({ $active }) =>
    $active &&
    `border-color: #00FFD1; 
    background: linear-gradient(0deg, rgba(0, 255, 209, 0.11) 0%, rgba(0, 255, 209, 0.11) 100%), #000;
    color: #00FFD1;
  `}
`;

export default function Spins({ spin = 0, active, checking, onRefresh, style }: any) {
  return (
    <Wrapper $active={active} style={style} onClick={onRefresh}>
      <span>{spin} SPIN</span>
      {active ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
          <path
            d="M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1"
            stroke="#00FFD1"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M4.99609 7.5L7.99609 10.5L15.4961 3" stroke="#00FFD1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <RefreshButton loading={checking} />
      )}
    </Wrapper>
  );
}
