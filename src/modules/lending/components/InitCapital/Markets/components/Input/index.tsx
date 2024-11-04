import Big from 'big.js';
import { useState } from 'react';

import LendingTotal from '@/modules/lending/components/Total';
import { StyledFlex, StyledFont, StyledSvg } from '@/styled/styles';

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
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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

      <StyledRight>
        {symbol ? (
          <LendingMarketAsset isMulti={isMulti} icon={icon} symbol={symbol} onClick={handleTokenVisible} />
        ) : (
          <StyledFlex
            gap="8px"
            style={{ cursor: 'pointer', border: '1px solid #373a53', padding: '5px 12px', borderRadius: 8 }}
            onClick={handleTokenVisible}
          >
            <StyledFont color="#FFF" fontSize="16px" fontWeight="500" lineHeight="26px">
              Select Asset
            </StyledFont>
            <StyledSvg style={{ color: '#FFF' }}>
              <svg
                width="11.5"
                height="6.095000000000001"
                viewBox="0 0 17 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L8.5 7.5L16 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
              </svg>
            </StyledSvg>
          </StyledFlex>
        )}
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
