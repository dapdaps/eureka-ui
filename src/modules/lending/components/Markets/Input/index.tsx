import Big from 'big.js';

import LendingMarketAsset from '@/modules/lending/components/Markets/Asset';
import LendingTotal from '@/modules/lending/components/Total';

import { StyledBalance, StyledBalanceAmount, StyledBox, StyledInput, StyledRight, StyledValue } from './styles';

const LendingMarketInput = (props: Props) => {
  const { icon, symbol, balance, price, amount, decimals, onChange } = props;

  return (
    <StyledBox>
      <div style={{ flexGrow: 1 }}>
        <StyledInput
          placeholder="0.0"
          value={amount || ''}
          onChange={(ev) => {
            if (isNaN(Number(ev.target.value))) return;
            onChange(ev.target.value.replace(/\s+/g, ''));
          }}
        />

        <StyledValue>
          <LendingTotal
            total={Big(amount || 0)
              .mul(price || 0)
              .toString()}
            digit={2}
            unit="$"
          />
        </StyledValue>
      </div>
      <StyledRight>
        <LendingMarketAsset icon={icon} symbol={symbol} />

        <StyledBalance>
          Balance:
          <StyledBalanceAmount
            onClick={() => {
              const _bal = Big(balance)
                .toFixed(decimals, 0)
                .replace(/[.]?0*$/, '');
              onChange(_bal);
            }}
          >
            <LendingTotal total={balance} digit={2} unit="" />
          </StyledBalanceAmount>{' '}
          {symbol}
        </StyledBalance>
      </StyledRight>
    </StyledBox>
  );
};

export default LendingMarketInput;

export interface Props {
  icon: string;
  symbol: string;
  balance: string;
  price: string;
  amount: string;
  decimals: number;

  onChange(value: string): void;
}
