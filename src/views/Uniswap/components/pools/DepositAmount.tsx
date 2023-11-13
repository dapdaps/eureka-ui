import { memo, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Big from 'big.js';
import Loading from '@/components/Icons/Loading';
import { balanceFormated, valueFormated } from '@/utils/balance';
import { usePriceStore } from '@/stores/price';
import { getToken0Amounts } from '../../utils/tickMath';
import TokenIcon from '../TokenIcon';
import { tickToPrice } from '../../utils/tickMath';

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
  currentTick,
  lowerTick,
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
    if (
      (!currentTick && currentTick !== 0) ||
      !token0 ||
      !token1 ||
      (!lowerTick && lowerTick !== 0) ||
      (!highTick && highTick !== 0)
    )
      return 0;
    let _price = getToken0Amounts({
      token1Amount: 1000000,
      currentTick,
      tickLow: _lowerTick,
      tickHigh: _tickHigh,
      decimals0: reverse ? token1.decimals : token0.decimals,
      decimals1: reverse ? token0.decimals : token1.decimals,
      reverse: reverse,
    });
    _price = new Big(_price || 0).gt(0) ? _price : 1;
    return 1 / (_price / 10 ** (reverse ? token0.decimals : token1.decimals));
  }, [token0, token1, currentTick, lowerTick, highTick, reverse]);

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
    <StyledContainer>
      <span className={`title ${lowerTick >= highTick && 'disabled'}`}>Deposit amounts</span>
      <div className="I">
        {noPair || (currentTick < _tickHigh && currentTick > _lowerTick) ? (
          <InputBoxs>
            <InputBox
              token={token0}
              value={value0}
              setValue={(value: string) => {
                setValue0(value);
                if (value) setValue1(new Big(value).mul(price).toNumber());
              }}
              balance={token0 ? balances[token0?.address] : ''}
              loading={balanceLoading}
            />
            <InputBox
              token={token1}
              value={value1}
              setValue={(value: string) => {
                setValue1(value);
                if (value) setValue0(new Big(price).eq(0) ? 0 : new Big(1).div(price).mul(value).toNumber());
              }}
              balance={token1 ? balances[token1?.address] : ''}
              loading={balanceLoading}
            />
          </InputBoxs>
        ) : currentTick >= _tickHigh ? (
          !reverse ? (
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
              }}
              balance={token1 ? balances[token1?.address] : ''}
              loading={balanceLoading}
            />
          )
        ) : !reverse ? (
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
            }}
            balance={token1 ? balances[token1?.address] : ''}
            loading={balanceLoading}
          />
        )}
      </div>
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
          onChange={(ev) => {
            setValue(ev.target.value ? (Number(ev.target.value) < 0 ? '' : ev.target.value) : '');
          }}
        />
        <div className="token">
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
