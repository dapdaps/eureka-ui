import { memo, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Big from 'big.js';
import Loading from '@/components/Icons/Loading';
import { balanceFormated, valueFormated } from '@/utils/balance';
import { usePriceStore } from '@/stores/price';
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
`;

const DepositAmount = ({
  token0,
  token1,
  value0,
  value1,
  poolTokens,
  reverse,
  currentTick,
  setValue0,
  setValue1,
  balances,
  balanceLoading,
}: any) => {
  const price = useMemo(() => {
    if (!currentTick || !token0 || !token1) return 0;
    return tickToPrice({
      tick: currentTick,
      decimals0: poolTokens.token0?.decimals,
      decimals1: poolTokens.token1?.decimals,
      isReverse: !reverse,
      isNumber: true,
    });
  }, [poolTokens, currentTick, reverse]);

  useEffect(() => {
    if (value0) setValue1(new Big(value0).mul(price).toFixed(12));
  }, [reverse]);

  return (
    <StyledContainer>
      <span className="title">Deposit amounts</span>
      <div className="I">
        <InputBox
          token={token0}
          value={value0}
          setValue={(value: string) => {
            setValue0(value);
            if (value) setValue1(new Big(value).mul(price).toFixed(12));
          }}
          balance={token0 ? balances[token0?.address] : ''}
          loading={balanceLoading}
        />
        <InputBox
          token={token1}
          value={value1}
          setValue={(value: string) => {
            setValue1(value);
            if (value) setValue0(new Big(1).div(price).mul(value).toFixed(12));
          }}
          balance={token1 ? balances[token1?.address] : ''}
          loading={balanceLoading}
        />
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
        <div className="balance">
          <span className="b">balance:</span>
          <span className="b_v">{loading ? <Loading /> : balanceFormated(balance, 4)}</span>
        </div>
      </StyledBottom>
    </StyledInputBox>
  );
};

export default memo(DepositAmount);
