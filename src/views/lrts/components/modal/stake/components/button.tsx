import Big from 'big.js';

import Loading from '@/components/Icons/Loading';
import chains from '@/config/chains';
import useAccount from '@/hooks/useAccount';

import ConnectButton from '../../../connect-wallet';
import SwitchNetwork from '../../../switch-network-button';
import { StyledStakeButton } from '../styles';

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
  console.log('=isInSufficient', isInSufficient)
  if (!data || isLoading) {
    return (
      <StyledStakeButton>
        <Loading />
      </StyledStakeButton>
    );
  }
  if (!approved) {
    return <StyledStakeButton onClick={onApprove}>Approve</StyledStakeButton>;
  }

  if (Big(inAmount || 0).eq(0)) {
    return <StyledStakeButton disabled>Enter An Amount</StyledStakeButton>;
  }

  if (isInSufficient) return <StyledStakeButton disabled>InSufficient Balance</StyledStakeButton>;

  if (Big(inAmount ? inAmount : 0).lt(leastAmount)) {
    return <StyledStakeButton disabled>The minimum amount is {leastAmount}</StyledStakeButton>;
  }

  return <StyledStakeButton onClick={handleStake}>{actionType}</StyledStakeButton>;
}
