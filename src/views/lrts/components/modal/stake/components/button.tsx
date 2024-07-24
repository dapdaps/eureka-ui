import Big from 'big.js';

import Loading from '@/components/Icons/Loading';
import chains from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import ConnectButton from '../../../connect-wallet';
import SwitchNetwork from '../../../switch-network-button';
import UIButton from '../../../polygon-btn';

const BaseButton = ({ children, onClick }: any) => {
  return (
    <UIButton onClick={onClick} block>
      {children}
    </UIButton>
  );
};

export default function Button({
  data,
  isInSufficient,
  isLoading,
  chainId,
  approved,
  onApprove,
  handleStake,
  actionType,
  inAmount,
  leastAmount,
}: any) {
  const { account, chainId: currentChainId } = useAccount();

  if (!account || !chainId) {
    return <ConnectButton block />;
  }
  if (chainId !== currentChainId) {
    return (
      <SwitchNetwork
        chain={{
          chain_id: chainId,
          name: chains[chainId].chainName,
        }}
        block
      />
    );
  }

  if (!data || isLoading) {
    return (
      <BaseButton>
        <Loading />
      </BaseButton>
    );
  }

  if (Big(inAmount || 0).eq(0)) {
    return <BaseButton disabled>Enter An Amount</BaseButton>;
  }

  if (!approved) {
    return <BaseButton onClick={onApprove}>Approve</BaseButton>;
  }

  if (isInSufficient) return <BaseButton disabled>InSufficient Balance</BaseButton>;

  if (Big(inAmount ? inAmount : 0).lt(leastAmount)) {
    return <BaseButton disabled>The minimum amount is {leastAmount}</BaseButton>;
  }

  return <BaseButton onClick={handleStake}>{actionType}</BaseButton>;
}
