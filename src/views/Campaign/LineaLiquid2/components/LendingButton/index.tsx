import Loading from '@/components/Icons/Loading';
import useConnectWallet from '@/hooks/useConnectWallet';
import useSwitchChain from '@/hooks/useSwitchChain';
import type { Props } from '@/modules/lending/components/Button';
import LendingDialogButton from '@/modules/lending/components/Button';
import { StyledButton } from '@/views/Campaign/LineaLiquid/components/LendingButton/styles';

const LendingButton = (props: LendingButtonProps) => {
  const { account, CHAIN_ID, chainId } = props;

  const { onConnect } = useConnectWallet();
  const { switching, switchChain } = useSwitchChain();

  if (!account) {
    return (
      <StyledButton
        onClick={() => {
          onConnect();
        }}
      >
        Connect Wallet
      </StyledButton>
    );
  }

  if (CHAIN_ID !== chainId) {
    return (
      <StyledButton
        disabled={switching}
        onClick={() => {
          switchChain({ chainId: `0x${CHAIN_ID.toString(16)}` });
        }}
      >
        {switching && <Loading size={16} />}
        <span>Switch Network</span>
      </StyledButton>
    );
  }

  return <LendingDialogButton {...props} />;
};

export default LendingButton;

interface LendingButtonProps extends Props {
  CHAIN_ID: number;
}
