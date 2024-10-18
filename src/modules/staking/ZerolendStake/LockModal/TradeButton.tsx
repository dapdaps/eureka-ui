import Big from 'big.js';
import { memo } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import networks from '@/config/swap/networks';
import useAccount from '@/hooks/useAccount';
import useApprove from '@/hooks/useApprove';
import useChain from '@/hooks/useChain';
import useConnectWallet from '@/hooks/useConnectWallet';
import useSwitchChain from '@/hooks/useSwitchChain';

const LockButton = styled.button`
  background-color: #ebf479;
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.5px;
  text-align: center;
  color: #02051e;
  cursor: pointer;
  transition: all 0.3s ease;
  &:disabled {
    background-color: #373a53;
    color: #979abe;
    cursor: not-allowed;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const BaseButton = ({ disabled, onClick, children }: any) => {
  return (
    <LockButton disabled={disabled} onClick={onClick}>
      {children}
    </LockButton>
  );
};

const TradeButton = ({
  token,
  amount,
  loading,
  disabled,
  onClick,
  onRefresh,
  children,
  spender,
  tokenBalance
}: any) => {
  const { approve, approved, approving, checking } = useApprove({
    amount,
    token,
    spender,
    onSuccess: onRefresh
  });
  const currentChain = useChain();
  const { switching, switchChain } = useSwitchChain();
  const { onConnect } = useConnectWallet();
  const { account, chainId } = useAccount();

  if (!account || !chainId || !currentChain) {
    return (
      <BaseButton
        onClick={() => {
          onConnect();
        }}
      >
        Connect wallet
      </BaseButton>
    );
  }

  if (!networks[chainId] || currentChain.chainId !== 59144) {
    return (
      <BaseButton
        onClick={() => {
          switchChain({
            chainId: 59144
          });
        }}
        loading={switching}
      >
        Switch Network
      </BaseButton>
    );
  }

  if (checking || approving || loading) {
    return (
      <BaseButton disabled>
        <Loading />
      </BaseButton>
    );
  }

  if (!amount || Big(amount).lte(0)) {
    return <BaseButton disabled>Enter a amount</BaseButton>;
  }

  if (tokenBalance !== '' && Big(amount).gt(tokenBalance)) {
    return <BaseButton disabled>Insufficient balance</BaseButton>;
  }

  if (!approved) {
    return <BaseButton onClick={approve}>Approve {token?.name}</BaseButton>;
  }

  return (
    <BaseButton onClick={onClick} disabled={disabled}>
      {children}
    </BaseButton>
  );
};

export default memo(TradeButton);
