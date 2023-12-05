import { memo } from 'react';
import styled from 'styled-components';
import useAccount from '@/hooks/useAccount';
import config from '@/config/uniswap';
import useApprove from '@/hooks/useApprove';
import { useConnectWallet } from '@web3-onboard/react';
import useSwitchChain from '@/hooks/useSwitchChain';
import Loading from '@/components/Icons/Loading';
import chains from '@/config/chains';

const StyledWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 62px;
  border-radius: 16px;
  background-color: #62ddff;
  font-size: 18px;
  color: #1b1b1b;
  font-weight: 600;
  margin-top: 15px;
  ${({ disabled }) => (disabled ? 'opacity: 0.3; cursor: not-allowed;' : 'cursor: pointer;')}
  flex-grow: 1;
`;
const StyledBox = styled.div`
  display: flex;
  gap: 20px;
`;

const SubmitButton = ({ token0, value0, token1, value1, errorTips, onPreview }: any) => {
  const { account, chainId } = useAccount();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const { switching, switchNetwork } = useSwitchChain();
  const {
    approved: token0Approved,
    approve: token0Approve,
    approving: token0Approving,
  } = useApprove({
    token: token0,
    amount: value0,
    chain: chains[config.chainId],
    spender: config.contracts.positionAddress,
  });
  const {
    approved: token1Approved,
    approve: token1Approve,
    approving: token1Approving,
  } = useApprove({
    token: token1,
    amount: value1,
    chain: chains[config.chainId],
    spender: config.contracts.positionAddress,
  });

  if (!token0 && !token1) {
    return <StyledWrapper disabled>Invalid pair</StyledWrapper>;
  }

  if (!account) {
    return (
      <StyledWrapper
        onClick={() => {
          connect();
        }}
        disabled={connecting}
      >
        {connecting && <Loading />} Connect Wallet
      </StyledWrapper>
    );
  }

  if (chainId !== config.chainId) {
    return (
      <StyledWrapper
        onClick={() => {
          switchNetwork(chains[config.chainId]);
        }}
        disabled={switching}
      >
        {switching && <Loading />} Switch Network
      </StyledWrapper>
    );
  }

  if (errorTips) {
    return <StyledWrapper disabled>{errorTips}</StyledWrapper>;
  }
  if (!token0Approved || !token1Approved) {
    return (
      <StyledBox>
        {!token0Approved && (
          <StyledWrapper
            onClick={token0Approve}
            disabled={token0Approving}
            style={{ width: !token0Approved && !token1Approved ? '50%' : '100%' }}
          >
            {token0Approving && <Loading />}
            Approve {token0?.symbol}
          </StyledWrapper>
        )}
        {!token1Approved && (
          <StyledWrapper
            onClick={token1Approve}
            disabled={token1Approving}
            style={{ width: !token0Approved && !token1Approved ? '50%' : '100%' }}
          >
            {token1Approving && <Loading />}
            Approve {token1?.symbol}
          </StyledWrapper>
        )}
      </StyledBox>
    );
  }

  return (
    <StyledWrapper
      disabled={!token0 && !token1}
      onClick={() => {
        onPreview();
      }}
    >
      Preview
    </StyledWrapper>
  );
};

export default memo(SubmitButton);
