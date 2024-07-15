import chains from '@/config/chains';
import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import ConnectButton from '../../connect-wallet';
import SwitchNetwork from '../../switch-network-button';
import UIButton from '../../polygon-btn';

const BaseButton = ({ children, onClick }: any) => {
  return (
    <UIButton onClick={onClick} block>
      {children}
    </UIButton>
  );
};

export default function Button({ errorTips, loading, chainId, onClick }: any) {
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
  if (loading) {
    return (
      <BaseButton>
        <Loading />
      </BaseButton>
    );
  }
  if (errorTips) {
    return <BaseButton>{errorTips}</BaseButton>;
  }
  return <BaseButton onClick={onClick}>Swap</BaseButton>;
}
