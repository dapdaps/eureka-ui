import { memo, useMemo, useState } from 'react';

import Address from './Address';
import Button from './Button';
import Exchange from './Exchange';
import Header from './Header';
import Input from './Input';
import { StyledContainer, StyledDesc,StyledInputsWrapper, StyledTips } from './styles';

const SwapPanel = ({
  from,
  to,
  fromAmount,
  toAmount,
  tokens,
  prices,
  anonymous,
  setAnonymous,
  address,
  qutoing,
  creating,
  isAddressCorrect,
  handleAddressChange,
  handleAmountChange,
  handleTokenSelect,
  handleRefresh,
  handleSwap,
  handleExchange,
}: any) => {
  const errorTips = useMemo(() => {
    if (!fromAmount && !toAmount) return 'Enter an amount';
    if (!address) return 'Enter an address';
    if (!isAddressCorrect) return 'Invalid address';
    return '';
  }, [fromAmount, toAmount, isAddressCorrect, address]);
  return (
    <StyledContainer>
      <Header
        anonymous={anonymous}
        setAnonymous={() => {
          setAnonymous(!anonymous);
        }}
        onRefresh={handleRefresh}
        loading={qutoing}
      />
      <StyledInputsWrapper>
        <Input
          token={tokens[from] || {}}
          prices={prices}
          amount={fromAmount}
          onAmountChange={(val: string) => {
            handleAmountChange('from', val);
          }}
          onSelectToken={() => {
            handleTokenSelect('from');
          }}
        />
        <Exchange onClick={handleExchange} />
        <Input
          token={tokens[to] || {}}
          prices={prices}
          amount={toAmount}
          onAmountChange={(val: string) => {
            handleAmountChange('to', val);
          }}
          onSelectToken={() => {
            handleTokenSelect('to');
          }}
        />
      </StyledInputsWrapper>
      <Address
        to={tokens[to] || {}}
        address={address}
        onAddressChange={handleAddressChange}
        isAddressCorrect={isAddressCorrect}
      />
      <StyledTips>
        ONLY SEND TO / FROM WALLETS. TRANSACTIONS SENT TO / FROM SMART CONTRACTS ARE NOT ACCEPTED.
      </StyledTips>
      <StyledDesc>
        Fees vary depending on the slippage, gas and time of swap. Transactions are limited to $40K USD{' '}
        <a className="link" href="https://docs.shush.fi/notices/compliance-policy" target="_blank">
          (Compliance Guidlines)
        </a>
      </StyledDesc>
      <Button errorTips={errorTips} loading={qutoing || creating} onSwap={handleSwap} />
    </StyledContainer>
  );
};

export default memo(SwapPanel);
