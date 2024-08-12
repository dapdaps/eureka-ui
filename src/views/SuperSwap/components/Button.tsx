import { memo } from 'react';
import styled from 'styled-components';
import useAccount from '@/hooks/useAccount';
import useApprove from '@/hooks/useApprove';
import useConnectWallet from '@/hooks/useConnectWallet';
import useSwitchChain from '@/hooks/useSwitchChain';
import networks from '@/config/swap/networks';
import Loading from '@/components/Icons/Loading';

const StyledButton = styled.button`
  border-radius: 10px;
  background: #ebf479;
  width: 100%;
  height: 60px;
  color: #000;
  text-align: center;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 20px;
`;

const BaseButton = ({ disabled, onClick, children }: any) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const TradeButton = ({ spender, token, amount, loading, errorTips, disabled, onClick }: any) => {
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
        onClick={() => {
          onConnect();
        }}
      >
        Connect wallet
      </BaseButton>
    );
  }

  if (!networks[chainId]) {
    return (
      <BaseButton
        onClick={() => {
          switchChain({
            chainId: 42161,
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
    return (
      <BaseButton disabled>
        <Loading />
      </BaseButton>
    );
  }
  if (!approved) {
    return <BaseButton onClick={approve}>Approve {token?.symbol}</BaseButton>;
  }

  return (
    <BaseButton onClick={onClick} disabled={disabled}>
      Swap
    </BaseButton>
  );
};

export default memo(TradeButton);
