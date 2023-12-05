import styled from 'styled-components';
import Loading from '@/components/Icons/Loading';

import { useConnectWallet } from '@web3-onboard/react';
import useSwitchChain from '@/hooks/useSwitchChain';

import chains from '@/config/chains';
import config from '@/config/uniswap';

const StyledButton = styled.button`
  border-radius: 16px;
  width: 446px;
  height: 62px;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;
  border: none;
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  margin-top: 39px;
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
        style={{
          backgroundColor: '#FF684B',
          color: '#fff',
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
        style={{
          backgroundColor: '#101010',
          color: '#fff',
        }}
      >
        {switching && <Loading />}
        Switch Scroll Chain
      </StyledButton>
    );
  }
  return <div />;
}
