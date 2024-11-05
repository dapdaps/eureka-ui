import Big from 'big.js';
import { useEffect } from 'react';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import Loading from '@/components/Icons/Loading';
import useTokenBalance from '@/hooks/useTokenBalance';
import UnavailablePrice from '@/modules/swap/components/UnavailablePrice';
import { usePriceStore } from '@/stores/price';
import type { Token } from '@/types';
import { balanceFormated, valueFormated } from '@/utils/balance';
import CurrencyInput from '@/views/AllInOne/components/Trade/CurrencyInput';

import {
  CurrencyIcon,
  CurrencyTitle,
  StyledSelectToken,
  StyledTradeBalance,
  StyledTradeBlock,
  StyledTradeInputContainer,
  StyledTradeTitle
} from './styles';

type Props = {
  title: string;
  disabled?: boolean;
  isFrom?: boolean;
  amount: string;
  currency?: Token;
  onTokenSelect: VoidFunction;
  onAmountChange?: (amount: number | string) => void;
  onLoad?: (balance: string) => void;
};
const Currency = ({
  onAmountChange = () => {},
  onTokenSelect,
  onLoad,
  amount,
  currency,
  title,
  disabled,
  isFrom
}: Props) => {
  const prices = usePriceStore((store) => store.price);

  const { tokenBalance: balance, isLoading } = useTokenBalance(
    currency?.address || '',
    currency?.decimals || 0,
    currency?.chainId
  );

  useEffect(() => {
    if (!isFrom) return;
    onLoad?.(balance);
  }, [balance]);

  return (
    <>
      <StyledTradeBlock>
        <StyledTradeTitle>{title}</StyledTradeTitle>
        <StyledTradeInputContainer>
          <CurrencyInput amount={amount} onAmountChange={onAmountChange} disabled={disabled} />
          <StyledSelectToken onClick={onTokenSelect}>
            {currency && <CurrencyIcon src={currency.icon} alt={currency.symbol} />}
            <CurrencyTitle>{currency ? currency.symbol : 'Select a Token'}</CurrencyTitle>
            <div className={'arrow-icon'}>
              <ArrowIcon size={11.5} />
            </div>
          </StyledSelectToken>
        </StyledTradeInputContainer>
        <StyledTradeBalance underline={isFrom}>
          <div>
            {!isNaN(Number(amount)) && currency ? (
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
      </StyledTradeBlock>
    </>
  );
};

export default Currency;
