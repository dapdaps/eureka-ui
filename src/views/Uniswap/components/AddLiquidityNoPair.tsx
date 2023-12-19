import styled from 'styled-components';

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
        onWheel={(e) => (e.target as HTMLInputElement).blur()}
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
