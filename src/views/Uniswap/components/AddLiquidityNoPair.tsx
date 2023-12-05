import styled from 'styled-components';

const StyledTips = styled.div`
  border-radius: 16px;
  background: rgba(255, 104, 75, 0.2);
  padding: 15px;
  color: #ff684b;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  margin-top: 20px;
`;
const StyledInput = styled.input`
  border-radius: 16px;
  background: #fff0dd;
  border: none;
  padding: 9px 15px 10px;
  color: #101010;
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
  color: rgba(16, 16, 16, 0.6);
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px;
`;

export default function AddLiquidityNoPair({ token0, token1, price, setPrice, setCurrentTickFromPrice }: any) {
  return (
    <>
      <StyledTips>
        This pool must be initialized before you can add liquidity. To initialize, select a starting price for the pool.
        Then, enter your liquidity price range and deposit amount. Gas fees will be higher than usual due to the
        initialization transaction.
      </StyledTips>
      <StyledInput
        type="number"
        value={price}
        onChange={(ev) => {
          setPrice(ev.target.value ? (Number(ev.target.value) < 0 ? '' : ev.target.value) : '');
        }}
        onBlur={(ev) => {
          setCurrentTickFromPrice(price);
        }}
      />
      <StyledDesc>
        <span>Starting {token0?.symbol} Price:</span>
        <span>
          {price ? price : '-'} {token1?.symbol} per {token0?.symbol}
        </span>
      </StyledDesc>
    </>
  );
}
