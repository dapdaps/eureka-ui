import styled from 'styled-components';

const Wrapper = styled.div<{ $active: boolean }>`
  border: 1px solid #979abe;
  border-radius: 7.5px;
  padding: 13px 15px;
  color: #979abe;
  text-align: right;
  font-family: '5squared pixel';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 16px */
  text-transform: capitalize;
  position: absolute;
  top: -90px;
  left: 156px;
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

export default function Spins({ active, style }: any) {
  return (
    <Wrapper $active={active} style={style}>
      <span>10 SPIN</span>
      {active && (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
          <path
            d="M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1"
            stroke="#00FFD1"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M4.99609 7.5L7.99609 10.5L15.4961 3" stroke="#00FFD1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </Wrapper>
  );
}
