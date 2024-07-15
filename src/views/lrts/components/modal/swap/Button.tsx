import styled from 'styled-components';
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

export default function Button({ errorTips, loading, onClick }: any) {
  const { account, chainId } = useAccount();

  if (!account || !chainId) {
    return <ConnectButton block />;
  }
  if (chainId !== 1) {
    return (
      <SwitchNetwork
        chain={{
          chain_id: 1,
          name: 'Ethereum',
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
