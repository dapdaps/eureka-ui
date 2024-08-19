import { memo } from 'react';
import styled from 'styled-components';
import useAccount from '@/hooks/useAccount';
import useApprove from '@/hooks/useApprove';
import useConnectWallet from '@/hooks/useConnectWallet';
import useSwitchChain from '@/hooks/useSwitchChain';
import networks from '@/config/swap/networks';
import Loading from '@/components/Icons/Loading';
import { PriceImpactTypeColorMap } from './Result';

const StyledButton = styled.button<{ color?: string }>`
  border-radius: 10px;
  background: ${({ color }) => color || '#ebf479'};
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

const BaseButton = ({ disabled, onClick, children, color }: any) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick} color={color} >
      {children}
    </StyledButton>
  );
};

const getButtonImpactProps = (trade: any) => {
  if (trade?.priceImpactType === 2) {
    return {
      color: PriceImpactTypeColorMap[trade.priceImpactType],
      text: 'I noticed the price impact, swap anyway',
    };
  }

  if (trade?.wrapType) {
    return {
      color: null,
      text: trade?.wrapType === 1 ? 'Wrap' : 'Unwrap',
    };
  }

  return {
    color: null,
    text: 'Swap',
  };
};


const TradeButton = ({ token, amount, loading, errorTips, disabled, onClick, trade }: any) => {
  const { approve, approved, approving, checking } = useApprove({
    amount,
    token,
    spender: trade?.routerAddress,
  });
  
  const { switching, switchChain } = useSwitchChain();
  const { onConnect } = useConnectWallet();
  const { account, chainId } = useAccount();
  const { color, text } = getButtonImpactProps(trade);

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
      <BaseButton color={color} disabled>
        <Loading />
      </BaseButton>
    );
  }
  if (!approved) {
    return <BaseButton onClick={approve}>Approve {token?.symbol}</BaseButton>;
  }

  return (
    <BaseButton onClick={onClick} disabled={disabled} color={color}>
      {text}
    </BaseButton>
  );
};

export default memo(TradeButton);
