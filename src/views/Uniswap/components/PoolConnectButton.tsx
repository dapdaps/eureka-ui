import styled from 'styled-components';
import Loading from '@/components/Icons/Loading';

import { useConnectWallet } from '@web3-onboard/react';
import useSwitchChain from '@/hooks/useSwitchChain';

import chains from '@/config/chains';
import config from '@/config/uniswap';

const StyledButton = styled.button`
  border-radius: 16px;
  background: #62ddff;
  width: 446px;
  height: 62px;
  color: #1b1b1b;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;
  border: none;
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default function PoolConnectButton() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const { switching, switchNetwork } = useSwitchChain();

  if (!wallet?.accounts[0].address) {
    return (
      <StyledButton
        onClick={() => {
          connect();
        }}
      >
        {connecting && <Loading />}
        Connect wallet
      </StyledButton>
    );
  }
  if (Number(wallet.chains[0].id) !== config.chainId) {
    return (
      <StyledButton
        onClick={() => {
          switchNetwork(chains[config.chainId]);
        }}
      >
        {switching && <Loading />}
        Switch Linea Chain
      </StyledButton>
    );
  }
  return <div />;
}
