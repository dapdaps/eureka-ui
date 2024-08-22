import { memo } from 'react';

import useAccount from '@/hooks/useAccount';
import useApprove from '@/hooks/useApprove';
import useConnectWallet from '@/hooks/useConnectWallet';
import useSwitchChain from '@/hooks/useSwitchChain';
import AllInOneButton from '@/views/AllInOne/components/Button';

const BaseButton = ({ chain, disabled, loading, onClick, children }: any) => {
  return (
    <AllInOneButton
      $background={chain?.selectBgColor}
      $borderColor={chain?.selectBgColor}
      color={chain?.textColor}
      styles={{ marginTop: 20, marginBottom: 20 }}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
    >
      {children}
    </AllInOneButton>
  );
};

const TradeButton = ({ chain, spender, token, amount, loading, errorTips, disabled, onClick }: any) => {
  const { approve, approved, approving, checking } = useApprove({
    amount,
    token,
    spender,
  });
  const { switching, switchChain } = useSwitchChain();
  const { onConnect } = useConnectWallet();
  const { account, chainId } = useAccount();

  if (!account || !chainId) {
    return (
      <BaseButton
        chain={chain}
        onClick={() => {
          onConnect();
        }}
      >
        Connect wallet
      </BaseButton>
    );
  }

  if (chainId !== chain.chainId) {
    return (
      <BaseButton
        chain={chain}
        onClick={() => {
          switchChain({
            chainId: chain.chainId,
          });
        }}
        loading={switching}
      >
        Switch Network
      </BaseButton>
    );
  }

  if (errorTips) {
    return <BaseButton disabled>{errorTips}</BaseButton>;
  }

  if (checking || approving || loading) {
    return <BaseButton chain={chain} loading={true} disabled />;
  }
  if (!approved) {
    return (
      <BaseButton chain={chain} onClick={approve}>
        Approve {token?.symbol}
      </BaseButton>
    );
  }

  return (
    <BaseButton chain={chain} onClick={onClick} disabled={disabled}>
      Swap
    </BaseButton>
  );
};

export default memo(TradeButton);
