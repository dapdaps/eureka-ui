// @ts-nocheck
import Big from 'big.js';
import { memo } from 'react';
import styled from 'styled-components';
const Wrap = styled.span`
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
`;

export default memo(function Balance(props) {
  const { value, symbol, digit, onClick } = props;

  return (
    <Wrap onClick={(e) => onClick(value)}>
      {isNaN(Number(value)) ? '-' : Big(value).toFixed(digit || 2, 0)}
      {symbol}
    </Wrap>
  );
});
