// @ts-nocheck
import { memo } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: var(--switch-color);
  color: var(--button-text-color);

  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  height: 56px;
  color: white;
  background-color: #075a5a;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s;
  margin-top: 20px;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
  }
  /* &.borrow {
      background-color: var(--repay-border-color);
      border: 1px solid var(--repay-border-color);
    } */
`;
export default memo(function SwitchBtn(props) {
  const {
    tab,
    account,
    actionText,
    amount,
    data,
    chainId,
    onSuccess,
    toast,
    addAction,
    loading: estimating,
    gas,
    dexConfig,
    stakeToken,
    onSwitchChain,
    DepositPool,
    ExchangeToken,
    WithdrawalContract
  } = props;

  const ethChainId = 1;
  const switchChain = () => {
    onSwitchChain?.({ chainId: `0x${ethChainId.toString(16)}` });
  };

  if (chainId !== 1) {
    return (
      <Button className={actionText.toLowerCase()} onClick={switchChain}>
        {`Switch to Ethereum to ${actionText}`}
      </Button>
    );
  }
});
