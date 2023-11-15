import { memo, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Big from 'big.js';
import Loading from '@/components/Icons/Loading';
import { balanceFormated, valueFormated } from '@/utils/balance';
import { usePriceStore } from '@/stores/price';
import TokenIcon from '../TokenIcon';
import { tickToPrice, getPriceFromTicks } from '../../utils/tickMath';
import { sortTokens } from '../../utils/sortTokens';

const StyledContainer = styled.div`
  margin-top: 20px;
  .title {
    font-size: 16px;
    color: #fff;
  }
  .I {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &.disabled {
    opacity: 0.5;
  }
`;
const InputBoxs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DepositAmount = ({
  token0,
  token1,
  value0,
  value1,
  reverse,
  currentPrice,
  lowerTick,
  currentTick,
  highTick,
  setValue0,
  setValue1,
  noPair,
  balances,
  balanceLoading,
}: any) => {
  const _lowerTick = lowerTick > highTick ? highTick : lowerTick;
  const _tickHigh = lowerTick > highTick ? lowerTick : highTick;

  const price = useMemo(() => {
    if ((!currentPrice && !currentTick) || (!lowerTick && lowerTick !== 0) || (!highTick && highTick !== 0)) return 0;
    const [_token0, _token1] = sortTokens(token0, token1);
    const _decimals0 = _token0?.decimals;
    const _decimals1 = _token1?.decimals;
    const lowPrice =
      _lowerTick === -887272
        ? 0
        : tickToPrice({
            tick: _lowerTick,
            decimals0: _decimals0,
            decimals1: _decimals1,
            isReverse: !reverse,
            isNumber: true,
          });
    const highPrice =
      _tickHigh === 887272
        ? 2 ** 96
        : tickToPrice({
            tick: _tickHigh,
            decimals0: _decimals0,
            decimals1: _decimals1,
            isReverse: !reverse,
            isNumber: true,
          });
    let _currentPrice = currentPrice;
    if (!_currentPrice) {
      _currentPrice = tickToPrice({
        tick: currentTick,
        decimals0: _decimals0,
        decimals1: _decimals1,
        isReverse: !reverse,
        isNumber: true,
      });
    }
    const _priceAmount = new Big(_currentPrice).mul(10 ** _token1.decimals).toFixed(0);
    const _amount0 = 10 ** _token0.decimals;
    const _amount1 = _priceAmount;
    let _price = getPriceFromTicks({
      amount0: _amount0,
      amount1: _amount1,
      currentPrice: _currentPrice,
      lowPrice: lowPrice > highPrice ? highPrice : lowPrice,
      highPrice: highPrice < lowPrice ? lowPrice : highPrice,
    });
    return _price;
  }, [token0, token1, currentPrice, currentTick, lowerTick, highTick, reverse]);

  useEffect(() => {
    setValue1('');
    setValue0('');
  }, [reverse]);
  useEffect(() => {
    if (price && value1) {
      const _value1 = new Big(1).div(new Big(price).eq(0) ? 1 : price).mul(value1);
      setValue0(_value1.gt(0) ? _value1.toNumber() : '');
    }
  }, [price]);
  return (
    <StyledContainer className={`${lowerTick >= highTick && 'disabled'}`}>
      <span className={`title`}>Deposit amounts</span>
      {lowerTick < highTick ? (
        <div className="I">
          {currentTick < highTick && currentTick > lowerTick ? (
            <InputBoxs>
              <InputBox
                token={token0}
                value={value0}
                setValue={(value: string) => {
                  setValue0(value);
                  if (value) setValue1(new Big(value).mul(price || 1).toFixed(token0.decimals));
                }}
                balance={token0 ? balances[token0?.address] : ''}
                loading={balanceLoading}
              />
              <InputBox
                token={token1}
                value={value1}
                setValue={(value: string) => {
                  setValue1(value);
                  if (value)
                    setValue0(new Big(price).eq(0) ? 0 : new Big(1).div(price).mul(value).toFixed(token1.decimals));
                }}
                balance={token1 ? balances[token1?.address] : ''}
                loading={balanceLoading}
              />
            </InputBoxs>
          ) : currentTick > highTick ? (
            <InputBox
              token={token0}
              value={value0}
              setValue={(value: string) => {
                setValue0(value);
              }}
              balance={token0 ? balances[token0?.address] : ''}
              loading={balanceLoading}
            />
          ) : (
            <InputBox
              token={token1}
              value={value1}
              setValue={(value: string) => {
                setValue1(value);
                if (value)
                  setValue0(new Big(price).eq(0) ? 0 : new Big(1).div(price).mul(value).toFixed(token1.decimals));
              }}
              balance={token1 ? balances[token1?.address] : ''}
              loading={balanceLoading}
            />
          )}
        </div>
      ) : (
        <div />
      )}
    </StyledContainer>
  );
};

const StyledInputBox = styled.div`
  border: 1px solid #303030;
  border-radius: 16px;
  padding: 14px;
  background-color: #1b1b1b;
`;
const StyledTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  input[type='number'] {
    font-size: 20px;
    color: #fff;
    font-weight: 700;
    background: none;
    border: none;
    outline: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .token {
    background-color: #131313;
    border: 1px solid #242424;
    padding: 6px;
    padding-right: 12px;
    border-radius: 18px;
    img {
      width: 22px;
      height: 22px;
      border-radius: 100px;
      margin-right: 8px;
    }
    .symbol {
      font-size: 16px;
      color: #fff;
      font-weight: 600;
    }
  }
`;
const StyledBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  .price {
    font-size: 14px;
    color: #8e8e8e;
  }
  .balance {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    .b {
      font-size: 14px;
      color: #8e8e8e;
    }
    .b_v {
      font-size: 14px;
      color: #fff;
      text-decoration: underline;
    }
  }
`;
const InputBox = ({ token, value, setValue, balance, loading }: any) => {
  const prices = usePriceStore((store) => store.price);
  return (
    <StyledInputBox>
      <StyledTop>
        <input
          type="number"
          value={value}
          style={{ flexGrow: 1 }}
          onChange={(ev) => {
            setValue(ev.target.value ? (Number(ev.target.value) < 0 ? '' : ev.target.value) : '');
          }}
        />
        <div className="token" style={{ flexShrink: 0 }}>
          <TokenIcon token={token} />
          <span className="symbol">{token?.symbol}</span>
        </div>
      </StyledTop>
      <StyledBottom>
        <span className="price">${valueFormated(value, prices[token?.symbol])}</span>
        <div
          className="balance"
          onClick={() => {
            if (balance && !isNaN(Number(balance))) {
              setValue(balance);
            }
          }}
        >
          <span className="b">balance:</span>
          <span className="b_v">{loading ? <Loading /> : balanceFormated(balance, 4)}</span>
        </div>
      </StyledBottom>
    </StyledInputBox>
  );
};

export default memo(DepositAmount);
