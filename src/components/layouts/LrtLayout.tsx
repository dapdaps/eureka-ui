import { useSetChain } from '@web3-onboard/react';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import { chains } from '@/config/bridge';
import useAccount from '@/hooks/useAccount';
import { useUserStore } from '@/stores/user';
import { ellipsAccount } from '@/utils/account';
import { LrtMenu } from '@/views/lrts/components';

interface Props {
  children: ReactNode;
}

const StyledWrap = styled.div`
  margin: 0 auto;
  background-color: #000;
`;

const StyledHead = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 26px 20px;
`;
const StyledLogo = styled.img`
  width: 118px;
`;

const StyledAccount = styled.div`
  color: white;
`;
const LogoImage = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
`;
const Logo = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-image: conic-gradient(from 180deg at 50% 50%, #00d1ff 0deg, #ff008a 360deg);
`;
const ChainLogo = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 8px;
`;
const StyledUser = styled.div`
  display: flex;
  align-items: center;
  padding: 0 6px;
  gap: 8px;
  width: 177px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid #323232;
  background: rgba(59, 59, 59, 0.5);
`;
export function LrtLayout({ children }: Props) {
  const { account } = useAccount();
  const userInfo = useUserStore((store: any) => store.user);
  console.log('userInfo', userInfo);

  const [{ connectedChain, settingChain }, setChain] = useSetChain();
  const currentChain: any = connectedChain?.id ? chains[Number(connectedChain?.id)] : null;

  return (
    <StyledWrap>
      <StyledHead>
        {/* <StyledLogo src="/images/marketing/dap-logo.svg" alt="" /> */}
        <LrtMenu />
        {account ? (
          <StyledUser>
            {/* {userInfo?.avatar ? <LogoImage src={userInfo.avatar} size={28} /> : <Logo size={28} />} */}
            {currentChain && !settingChain && <ChainLogo src={currentChain.icon} />}

            <StyledAccount>{ellipsAccount(account)}</StyledAccount>
          </StyledUser>
        ) : null}
      </StyledHead>
      {children}
    </StyledWrap>
  );
}
