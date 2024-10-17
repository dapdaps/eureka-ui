import { memo } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import networks from '@/config/swap/networks';
import useAccount from '@/hooks/useAccount';
import useChain from '@/hooks/useChain';
import useConnectWallet from '@/hooks/useConnectWallet';
import useSwitchChain from '@/hooks/useSwitchChain';

const StyledButtonList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 48px;
  border-radius: 8px;
  background: #ebf479;
  color: #02051e;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  &[disabled] {
    opacity: 0.5 !important;
    cursor: not-allowed;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const Button = ({
  token0,
  token1,
  amount0,
  amount1,
  isLoading,
  isInSufficient,
  isToken0Approved,
  isToken1Approved,
  isToken0Approving,
  isToken1Approving,
  children,
  handleDeposit,
  handleApprove
}: any) => {
  const currentChain = useChain();
  const { switching, switchChain } = useSwitchChain();
  const { onConnect } = useConnectWallet();
  const { account, chainId } = useAccount();

  return (
    <StyledButtonList>
      {!account || !chainId ? (
        <StyledButton
          onClick={() => {
            onConnect();
          }}
        >
          Connect wallet
        </StyledButton>
      ) : !networks[chainId] || currentChain?.chainId !== 59144 ? (
        <StyledButton
          onClick={() => {
            switchChain({
              chainId: 59144
            });
          }}
        >
          Switch Network
        </StyledButton>
      ) : (
        <>
          {isInSufficient && <StyledButton disabled>InSufficient Balance</StyledButton>}
          {!isInSufficient &&
            (isToken0Approved && isToken1Approved && !isToken0Approving && !isToken1Approving ? (
              <StyledButton disabled={isLoading || !amount0 || !amount1} onClick={handleDeposit}>
                {isLoading ? <Loading /> : children}
              </StyledButton>
            ) : (
              <>
                <StyledButton disabled={isToken0Approved || isToken0Approving} onClick={() => handleApprove(true)}>
                  {isToken0Approving ? (
                    <Loading />
                  ) : (
                    <>
                      {isToken0Approved ? 'Approved' : 'Approve'} {token0}
                    </>
                  )}
                </StyledButton>
                <StyledButton disabled={isToken1Approved || isToken1Approving} onClick={() => handleApprove(false)}>
                  {isToken1Approving ? (
                    <Loading />
                  ) : (
                    <>
                      {isToken1Approved ? 'Approved' : 'Approve'} {token1}
                    </>
                  )}
                </StyledButton>
              </>
            ))}
        </>
      )}
    </StyledButtonList>
  );
};

export default memo(Button);
