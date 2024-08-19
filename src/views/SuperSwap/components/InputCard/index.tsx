import Big from 'big.js';
import { useEffect, useState } from 'react';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import CurrencyInput from '../Input';
import { balanceFormated, valueFormated } from '@/utils/balance';
import Loading from '@/components/Icons/Loading';
import Refresh from '@/components/Icons/Refresh';
import Slippage from './Slippage';
import useTokenBalance from '@/hooks/useTokenBalance';
import { usePriceStore } from '@/stores/price';
import {
  CurrencyIcon,
  CurrencyTitle,
  StyledSelectToken,
  StyledTradeBalance,
  StyledTradeBlock,
  StyledTradeInputContainer,
  StyledHeader,
  StyledActions,
  StyledActionButton,
  StyledTradeContent,
} from './styles';
import type { Token } from '@/types';
import { useUpdateBalanceStore } from '../../hooks/useUpdateBalanceStore';

type Props = {
  title: string;
  disabled?: boolean;
  isFrom?: boolean;
  amount: string;
  currency?: Token;
  style?: any;
  loading?: boolean;
  onTokenSelect: VoidFunction;
  onAmountChange?: (amount: number | string) => void;
  onLoad?: (balance: string) => void;
  onRefresh?: VoidFunction;
};
const Currency = ({
  onAmountChange = () => {},
  onTokenSelect,
  onLoad,
  onRefresh,
  amount,
  currency,
  title,
  disabled,
  isFrom,
  loading,
  style = {},
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const prices = usePriceStore((store) => store.price);

  const { tokenBalance: balance, isLoading } = useTokenBalance(currency?.address || '', currency?.decimals || 0);

  useEffect(() => {
    if (!isFrom) return;
    onLoad?.(balance);
  }, [balance]);

  return (
    <StyledTradeBlock style={style}>
      <StyledHeader>
        <div>{title}</div>
        {isFrom && (
          <StyledActions>
            <StyledActionButton onClick={onRefresh}>
              <Refresh refreshing={loading} size={16} />
            </StyledActionButton>
            <Slippage />
          </StyledActions>
        )}
      </StyledHeader>
      <StyledTradeContent
        style={{
          backgroundColor: isFocus ? '#20212D' : 'transparent',
        }}
      >
        <StyledTradeInputContainer>
          <CurrencyInput
            amount={amount}
            onAmountChange={onAmountChange}
            disabled={disabled}
            readOnly={!isFrom}
            onFocus={() => {
              if (!isFrom) return;
              setIsFocus(true);
            }}
            onBlur={() => {
              setIsFocus(false);
            }}
          />
          <StyledSelectToken onClick={onTokenSelect}>
            {currency && <CurrencyIcon src={currency.icon} alt={currency.symbol} />}
            <CurrencyTitle>{currency ? currency.symbol : 'Select a Token'}</CurrencyTitle>
            <div className={'arrow-icon'}>
              <ArrowIcon size={11.5} />
            </div>
          </StyledSelectToken>
        </StyledTradeInputContainer>
        <StyledTradeBalance underline={isFrom}>
          <div>$ {!isNaN(Number(amount)) && currency ? valueFormated(amount, prices[currency?.symbol]) : '-'}</div>
          <div>
            balance:{' '}
            {isLoading ? (
              <Loading size={16} />
            ) : (
              <span
                className="trade-balance"
                onClick={() => {
                  if (isNaN(Number(balance))) return;
                  onAmountChange(balanceFormated(new Big(balance).toFixed(18), 18));
                }}
              >
                {!balance ? '-' : balanceFormated(balance, 4)}
              </span>
            )}
          </div>
        </StyledTradeBalance>
      </StyledTradeContent>
    </StyledTradeBlock>
  );
};

export default Currency;
