import Big from 'big.js';
import React, { useEffect, useMemo, useState } from 'react';

import Loading from '@/components/Icons/Loading';
import useTokenBalance from '@/hooks/useTokenBalance';
import { balanceFormated } from '@/utils/balance';

import {
  Amount,
  CurrencyField,
  CurrencyIcon,
  CurrencySelect,
  CurrencySymbol,
  CurrencyWrapper,
  Input,
  InputBox,
  InputField,
  InputWarpper,
  Label,
  Value,
  Wrapper
} from './styles';

export default function CurrencyInput({
  type,
  amount,
  disabled,
  currency,
  prices,
  account,
  onCurrencySelectOpen,
  onAmountChange,
  onUpdateCurrencyBalance
}: any) {
  const [focus, setFocus] = useState(false);
  const tokenPrice = useMemo(() => (currency ? prices[currency.priceKey || currency.symbol] : 0), [prices, currency]);
  const { tokenBalance, isLoading } = useTokenBalance(currency?.address, currency?.decimals, currency?.chainId);
  useEffect(() => {
    if (tokenBalance && onUpdateCurrencyBalance) onUpdateCurrencyBalance(tokenBalance);
  }, [tokenBalance]);
  return (
    <Wrapper
      style={{
        background: focus ? 'var(--agg-bg-color,#2e3142)' : 'var(--agg-bg-color,#1B1E27)',
        borderColor: focus ? 'var(--agg-border-color,#373a53)' : 'var(--agg-border-active-color,#1B1E27)'
      }}
    >
      <Label>{type === 'in' ? 'You pay' : 'You receive'}</Label>
      <InputBox>
        <InputField>
          <InputWarpper>
            <Input
              value={amount}
              disabled={disabled}
              onChange={(ev) => {
                if (isNaN(Number(ev.target.value))) return;
                onAmountChange?.(ev.target.value.replace(/\s+/g, ''));
              }}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
              }}
              placeholder="0"
            />
          </InputWarpper>
          <Value>
            ≈{' '}
            {tokenPrice && amount
              ? `$${Big(amount || 0)
                  .mul(tokenPrice)
                  .toFixed(2)}`
              : '-'}
          </Value>
        </InputField>
        <CurrencyField>
          <CurrencySelect
            onClick={() => {
              onCurrencySelectOpen();
            }}
          >
            <CurrencyWrapper>
              {currency && <CurrencyIcon src={currency.icon || '/images/tokens/default_icon.png'} />}
              <CurrencySymbol>{currency?.symbol || <span className="fz-14">Select a token</span>}</CurrencySymbol>
            </CurrencyWrapper>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 1L6 5L11 1" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </CurrencySelect>
          {account && (
            <Amount
              onClick={() => {
                const formatedBalance = balanceFormated(tokenBalance);
                if (!['-', 'Loading', '0'].includes(formatedBalance)) onAmountChange?.(tokenBalance);
              }}
            >
              Balance:{' '}
              {isLoading ? (
                <Loading />
              ) : (
                <span
                  style={{
                    textDecoration: disabled ? 'none' : 'underline'
                  }}
                >
                  {currency ? balanceFormated(tokenBalance) : '-'}
                </span>
              )}
            </Amount>
          )}
        </CurrencyField>
      </InputBox>
    </Wrapper>
  );
}
