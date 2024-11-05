import Big from 'big.js';
import { useEffect, useState } from 'react';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import Loading from '@/components/Icons/Loading';
import useTokenBalance from '@/hooks/useTokenBalance';
import UnavailablePrice from '@/modules/swap/components/UnavailablePrice';
import { usePriceStore } from '@/stores/price';
import type { Token } from '@/types';
import { balanceFormated, valueFormated } from '@/utils/balance';

import CurrencyInput from '../Input';
import {
  CurrencyIcon,
  CurrencyTitle,
  StyledHeader,
  StyledSelectToken,
  StyledTradeBalance,
  StyledTradeBlock,
  StyledTradeContent,
  StyledTradeInputContainer
} from './styles';

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
  amount,
  currency,
  title,
  disabled,
  isFrom,
  style = {}
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const prices = usePriceStore((store) => store.price);

  const { tokenBalance: balance, isLoading } = useTokenBalance(currency?.address || '', currency?.decimals || 0);

  useEffect(() => {
    if (!isFrom) return;
    onLoad?.(balance);
  }, [balance]);

  return (
    <StyledTradeBlock style={{ ...style, backgroundColor: isFocus ? '#20212D' : 'transparent' }}>
      <StyledHeader>
        <div>{title}</div>
      </StyledHeader>
      <StyledTradeContent>
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
            {currency && (
              <CurrencyIcon src={currency.icon || '/assets/tokens/default_icon.png'} alt={currency.symbol} />
            )}
            <CurrencyTitle>{currency ? currency.symbol : 'Select a Token'}</CurrencyTitle>
            <div className={'arrow-icon'}>
              <ArrowIcon size={11.5} />
            </div>
          </StyledSelectToken>
        </StyledTradeInputContainer>
        <StyledTradeBalance underline={isFrom}>
          <div className={currency && !prices[currency?.symbol] && amount ? 'price-impact-1' : ''}>
            {amount && !isNaN(Number(amount)) && currency ? (
              prices[currency?.symbol] ? (
                `$ ${valueFormated(amount, prices[currency?.symbol])}`
              ) : (
                <UnavailablePrice />
              )
            ) : (
              '$ -'
            )}
          </div>
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
                {!balance || !currency ? '-' : balanceFormated(balance, 4)}
              </span>
            )}
          </div>
        </StyledTradeBalance>
      </StyledTradeContent>
    </StyledTradeBlock>
  );
};

export default Currency;
