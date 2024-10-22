import Big from 'big.js';
import { memo } from 'react';

import Loading from '@/components/Icons/Loading';
import networks from '@/config/swap/networks';
import useAccount from '@/hooks/useAccount';
import useApprove from '@/hooks/useApprove';
import useChain from '@/hooks/useChain';
import useConnectWallet from '@/hooks/useConnectWallet';
import useSwitchChain from '@/hooks/useSwitchChain';

const BaseButton = ({ disabled, onClick, children }: any) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full mt-4 bg-[#3A679B] text-white py-2 rounded-lg hover:opacity-80 transition-colors"
    >
      {children}
    </button>
  );
};

const Button = ({
  token,
  amount,
  loading,
  disabled,
  onClick,
  onRefresh,
  children,
  spender,
  tokenBalance,
  dappChainId
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

  if (!networks[chainId] || currentChain.chainId !== dappChainId) {
    return (
      <BaseButton
        onClick={() => {
          switchChain({
            chainId: dappChainId
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

export default memo(Button);
