import styled from 'styled-components';

const Wrapper = styled.div`
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
`;

export default function Spins({ style }: any) {
  return <Wrapper style={style}>10 SPIN</Wrapper>;
}
