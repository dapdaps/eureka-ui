import { useSetChain, useWallets } from '@web3-onboard/react';
import { useMemo } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import useConnectWallet from '@/hooks/useConnectWallet';
import useSwitchChain from '@/hooks/useSwitchChain';
import type { Chain, Token } from '@/types';

const Container = styled.div<{ disabled?: boolean }>`
  height: 60px;
  line-height: 60px;
  background-color: rgba(235, 244, 121, 1);
  border-radius: 10px;
  text-align: center;
  color: rgba(55, 58, 83, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
  &.disbaled {
    opacity: 0.3;
    cursor: default;
  }
`;

interface Props {
  isLoading: boolean;
  disabled: boolean;
  text: string;
  fromChain: Chain | null;
  onClick: () => void;
  defaultText?: string;
  theme?: any;
}

export default function SubmitBtn({
  isLoading,
  disabled,
  onClick,
  text,
  fromChain,
  defaultText = 'Bridge',
  theme
}: Props) {
  const { onConnect } = useConnectWallet();
  const wallets = useWallets();
  const { account, chainId, provider } = useAccount();
  const [{ settingChain, connectedChain }, setChain] = useSetChain();
  const { switchChain } = useSwitchChain();

  // console.log('wallets:', wallets);

  const style = useMemo(() => {
    if (theme) {
      return {
        backgroundColor: theme.selectBgColor,
        color: theme.textColor
      };
    }

    return {};
  }, [theme]);

  if (!account) {
    return (
      <Container
        style={style}
        onClick={() => {
          onConnect();
        }}
      >
        Connect Wallet
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container style={style}>
        <Loading size={16} /> {defaultText}
      </Container>
    );
  }

  if (disabled) {
    return (
      <Container style={style} className="disbaled">
        {text}
      </Container>
    );
  }

  if (chainId !== fromChain?.chainId) {
    return (
      <Container
        style={style}
        onClick={() => {
          setChain({ chainId: `0x${fromChain?.chainId?.toString(16)}` });
        }}
      >
        Switch Chain
      </Container>
    );
  }

  return (
    <Container style={style} onClick={onClick}>
      {defaultText}
    </Container>
  );
}
