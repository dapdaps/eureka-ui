import { memo } from 'react';

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import useConnectWallet from '@/hooks/useConnectWallet';
import useSwitchChain from '@/hooks/useSwitchChain';

import { StyledButton } from './styles';

const Button = ({ text, errorTips, loading, onClick }: any) => {
  const { account, chainId } = useAccount();
  const { switching, switchChain } = useSwitchChain();
  const { onConnect } = useConnectWallet();

  if (!account || !chainId) {
    return (
      <StyledButton
        onClick={() => {
          onConnect();
        }}
      >
        Connect wallet
      </StyledButton>
    );
  }

  if (chainId !== 81457) {
    return (
      <StyledButton
        onClick={() => {
          switchChain({
            chainId: 81457,
          });
        }}
      >
        {switching ? 'Switch Network...' : `Switch Network to Blast`}
      </StyledButton>
    );
  }

  if (errorTips) {
    return <StyledButton disabled>{errorTips}</StyledButton>;
  }

  if (loading) {
    return (
      <StyledButton disabled>
        <Loading size={20} />
      </StyledButton>
    );
  }

  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default memo(Button);
