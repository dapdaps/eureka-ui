import styled from 'styled-components';
import Big from 'big.js';
import { sortTokens } from '../utils/sortTokens';

const StyledTips = styled.div`
  border-radius: 16px;
  background: rgba(255, 117, 191, 0.1);
  padding: 15px;
  color: #ff75bf;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  margin-top: 20px;
`;
const StyledInput = styled.input`
  border-radius: 16px;
  border: 1px solid #303030;
  background: #1b1b1b;
  padding: 8px 15px 11px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  margin-top: 20px;
  width: 100%;
  outline: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const StyledDesc = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px;
`;

export default function AddLiquidityNoPair({ token0, token1, price, setPrice }: any) {
  const [_token0, _token1] = sortTokens(token0, token1);
  const _price = price
    ? _token0?.address === token1?.address
      ? new Big(1).div(new Big(price).eq(0) ? 1 : price)
      : new Big(price)
    : '';
  return (
    <>
      <StyledTips>
        This pool must be initialized before you can add liquidity. To initialize, select a starting price for the pool.
        Then, enter your liquidity price range and deposit amount. Gas fees will be higher than usual due to the
        initialization transaction.
      </StyledTips>
      <StyledInput
        type="number"
        onChange={(ev) => {
          setPrice(ev.target.value ? (Number(ev.target.value) < 0 ? '' : ev.target.value) : '');
        }}
      />
      <StyledDesc>
        <span>Starting {token0?.symbol} Price:</span>
        <span>
          {_price ? _price.toFixed(6) : '-'} {token1?.symbol} per {token0?.symbol}
        </span>
      </StyledDesc>
    </>
  );
}
