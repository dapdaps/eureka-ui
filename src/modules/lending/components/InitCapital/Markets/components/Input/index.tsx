import Big from 'big.js';
import { useState } from 'react';

import LendingTotal from '@/modules/lending/components/Total';
import { StyledFont } from '@/styled/styles';

import LendingMarketAsset from '../Asset';
import LendingTokenSelector from '../Asset/Selector';
import { StyledBalance, StyledBalanceAmount, StyledBox, StyledInput, StyledRight, StyledValue } from './styles';

const LendingMarketInput = (props: any) => {
  const { icon, symbol, balance, price, amount, decimals, tokenList, onChange, onTokenChange } = props ?? {};

  const isMulti = tokenList && !!tokenList.length;

  const [tokenVisible, setTokenVisible] = useState(false);

  const handleTokenVisible = () => {
    if (isMulti) {
      setTokenVisible(true);
    }
  };

  return (
    <StyledBox $isMulti={isMulti}>
      <div style={{ flexGrow: 1 }}>
        <StyledInput
          placeholder="0.0"
          value={amount || ''}
          disabled={!symbol}
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

      {symbol ? (
        <StyledRight>
          <LendingMarketAsset isMulti={isMulti} icon={icon} symbol={symbol} onClick={handleTokenVisible} />
          <StyledBalance>
            Balance:
            <StyledBalanceAmount
              onClick={() => {
                const _bal = Big(balance || 0)
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
      ) : (
        <StyledFont
          color="#FFF"
          fontSize="14px"
          fontWeight="500"
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={handleTokenVisible}
        >
          Select Asset
        </StyledFont>
      )}

      <LendingTokenSelector
        visible={tokenVisible}
        list={tokenList}
        onClose={() => setTokenVisible(false)}
        onSelect={(token: any) => {
          onTokenChange && onTokenChange(token);
          setTokenVisible(false);
        }}
      />
    </StyledBox>
  );
};

export default LendingMarketInput;
