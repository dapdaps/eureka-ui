import { memo, useEffect, useMemo, useState } from 'react';
import Big from 'big.js';
import { balanceFormated, valueFormated } from '@/utils/balance';
import Loading from '@/components/Icons/Loading';
import useTokenBalance from '@/hooks/useTokenBalance';
import {
  StyledInput,
  StyledInputTokenBox,
  StyledInputInner,
  StyledToken,
  StyledIcon,
  StyledSymbol,
  StyledDesc,
  StyledBalance,
  StyledEmptyToken,
} from './styles';

const Input = ({ value, token, setValue, prices, disabled, onLoad }: any) => {
  const { tokenBalance: balance, isLoading } = useTokenBalance(token?.address, token?.decimals);
  const [focus, setFocus] = useState(false);

  const isError = useMemo(() => {
    if (!value || !token || value === 'NaN') return false;

    if (!balance) return false;

    return new Big(value || 0).gt(balance);
  }, [value, balance]);

  useEffect(() => {
    onLoad(balance);
  }, [balance]);

  return (
    <StyledInput $error={isError} $focus={focus}>
      <StyledInputTokenBox>
        <StyledInputInner
          placeholder="0"
          value={value}
          onChange={(ev) => {
            if (isNaN(Number(ev.target.value))) return;
            setValue(ev.target.value);
          }}
          disabled={disabled}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
        />
        {token ? (
          <StyledToken>
            <StyledIcon src={token?.icon || '/img/default_icon.png'} />
            <StyledSymbol>{token.symbol}</StyledSymbol>
          </StyledToken>
        ) : (
          <StyledEmptyToken>Select token</StyledEmptyToken>
        )}
      </StyledInputTokenBox>
      <StyledDesc>
        <div>${!isNaN(Number(value)) ? valueFormated(value, prices[token?.symbol]) : '-'}</div>
        <div>
          Balance:{' '}
          {isLoading ? (
            <Loading size={16} />
          ) : (
            <StyledBalance
              onClick={() => {
                if (isNaN(Number(balance))) return;
                setValue(balanceFormated(new Big(balance).toFixed(18), 18));
              }}
            >
              {!balance ? '-' : balanceFormated(balance, 4)}
            </StyledBalance>
          )}
        </div>
      </StyledDesc>
    </StyledInput>
  );
};

export default memo(Input);