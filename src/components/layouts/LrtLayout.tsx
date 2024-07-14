import { useSetChain } from '@web3-onboard/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import CopyButton from '@/components/CopyButton';
import { chains } from '@/config/bridge';
import useAccount from '@/hooks/useAccount';
import useConnectWallet from '@/hooks/useConnectWallet';
import { useUserStore } from '@/stores/user';
import { ellipsAccount } from '@/utils/account';
import { copyText } from '@/utils/copy';
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
  .user {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 6px;
    gap: 8px;
    width: 177px;
    height: 38px;
    border-radius: 8px;
    border: 1px solid #323232;
    background: rgba(59, 59, 59, 0.5);
    color: white;
    transition: all 0.3s;
    &:hover {
      background-color: #2f2f2f;
    }
  }
  .sub-menu {
    position: absolute;
    top: 36px;
    padding-top: 10px;
    right: 0;
    width: 219px;
    height: 188px;
    background: transparent;
    .bg-menu {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      border: 1px solid #3f3f3f;
      background: #2f2f2f;
      padding: 22px;
    }
    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      cursor: pointer;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .account {
      color: #fff;
      font-family: Orbitron;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    .disconnect {
      color: #ff3d83;
      font-family: Orbitron;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;

const StyledAccount = styled.div`
  color: white;
`;
// const LogoImage = styled.img<{ size: number }>`
//   width: ${({ size }) => size}px;
//   height: ${({ size }) => size}px;
//   border-radius: 50%;
// `;
// const Logo = styled.div<{ size: number }>`
//   width: ${({ size }) => size}px;
//   height: ${({ size }) => size}px;
//   border-radius: 50%;
//   background-image: conic-gradient(from 180deg at 50% 50%, #00d1ff 0deg, #ff008a 360deg);
// `;
const ChainLogo = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 8px;
`;
const StyledUser = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  gap: 8px;
  width: 177px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid #323232;
  background: rgba(59, 59, 59, 0.5);
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #2f2f2f;
  }
`;

export function LrtLayout({ children }: Props) {
  const { account } = useAccount();
  const { onConnect, onDisconnect } = useConnectWallet();

  // const userInfo = useUserStore((store: any) => store.user);
  // console.log('userInfo', userInfo);

  const [{ connectedChain, settingChain }, setChain] = useSetChain();
  const currentChain: any = connectedChain?.id ? chains[Number(connectedChain?.id)] : null;

  const dropdownAnimations = {
    active: {
      opacity: [0, 1],
      y: [10, 0],
      display: 'block',
    },
    default: {
      opacity: [1, 0],
      y: [0, 10],
      display: 'none',
    },
  };

  return (
    <StyledWrap>
      <StyledHead>
        {/* <StyledLogo src="/images/marketing/dap-logo.svg" alt="" /> */}
        <LrtMenu />
        {account ? (
          <motion.div className="user" whileHover="active" animate="default" initial="default">
            {/* {userInfo?.avatar ? <LogoImage src={userInfo.avatar} size={28} /> : <Logo size={28} />} */}
            {currentChain && !settingChain && <ChainLogo src={currentChain.icon} />}

            <StyledAccount>{ellipsAccount(account)}</StyledAccount>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
              <path
                d="M5.78087 6.52391C5.38055 7.02432 4.61946 7.02432 4.21913 6.52391L0.299758 1.6247C-0.224053 0.969932 0.242119 -9.40484e-07 1.08063 -8.67179e-07L8.91938 -1.81894e-07C9.75788 -1.08589e-07 10.2241 0.969932 9.70024 1.62469L5.78087 6.52391Z"
                fill="white"
              />
            </svg>

            <motion.div
              className="sub-menu"
              variants={dropdownAnimations}
              transition={{
                duration: 0.3,
              }}
            >
              <div className="bg-menu">
                <div className="menu-item">
                  <span className="account">{ellipsAccount(account)}</span>
                  <CopyButton
                    size={16}
                    text={account}
                    tooltipMessage="Copied"
                    tooltipTop={-31}
                    tooltipRight={-12}
                    tooltipFontSize={12}
                  />
                </div>
                <div className="menu-item" onClick={onDisconnect}>
                  <span className="disconnnect">Disconnect</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6.13019 0C6.16853 -1.75877e-09 6.20649 0.00739019 6.24191 0.0217487C6.27732 0.0361072 6.3095 0.0571528 6.33661 0.0836838C6.36372 0.110215 6.38522 0.141712 6.39989 0.176376C6.41456 0.211041 6.42211 0.248194 6.42211 0.285714V0.857143C6.42211 0.894663 6.41456 0.931817 6.39989 0.966481C6.38522 1.00115 6.36372 1.03264 6.33661 1.05917C6.3095 1.0857 6.27732 1.10675 6.24191 1.12111C6.20649 1.13547 6.16853 1.14286 6.13019 1.14286H1.16766V10.8571H6.13019C6.16853 10.8571 6.20649 10.8645 6.24191 10.8789C6.27732 10.8933 6.3095 10.9143 6.33661 10.9408C6.36372 10.9674 6.38522 10.9989 6.39989 11.0335C6.41456 11.0682 6.42211 11.1053 6.42211 11.1429V11.7143C6.42211 11.7518 6.41456 11.789 6.39989 11.8236C6.38522 11.8583 6.36372 11.8898 6.33661 11.9163C6.3095 11.9428 6.27732 11.9639 6.24191 11.9783C6.20649 11.9926 6.16853 12 6.13019 12H1.16766C0.868082 12 0.579967 11.8873 0.362904 11.6852C0.145842 11.4831 0.0164383 11.2071 0.00145957 10.9143L0 10.8571V1.14286C-2.33049e-07 0.849645 0.115141 0.567649 0.321609 0.355197C0.528076 0.142744 0.810073 0.0160892 1.10927 0.00142857L1.16766 0H6.13019ZM8.79274 2.94086L11.2991 5.394C11.4563 5.54784 11.5478 5.75439 11.5551 5.97181C11.5624 6.18923 11.485 6.40123 11.3385 6.56486L11.2991 6.606L8.79274 9.05914C8.738 9.11271 8.66376 9.1428 8.58636 9.1428C8.50895 9.1428 8.43472 9.11271 8.37998 9.05914L7.96721 8.65514C7.91248 8.60156 7.88174 8.5289 7.88174 8.45314C7.88174 8.37738 7.91248 8.30472 7.96721 8.25114L9.68279 6.57143H3.79488C3.75655 6.57143 3.71859 6.56404 3.68317 6.54968C3.64775 6.53532 3.61557 6.51428 3.58847 6.48774C3.56136 6.46121 3.53986 6.42972 3.52519 6.39505C3.51052 6.36039 3.50297 6.32323 3.50297 6.28571V5.71429C3.50297 5.67676 3.51052 5.63961 3.52519 5.60495C3.53986 5.57028 3.56136 5.53879 3.58847 5.51226C3.61557 5.48572 3.64775 5.46468 3.68317 5.45032C3.71859 5.43596 3.75655 5.42857 3.79488 5.42857H9.68279L7.96721 3.74886C7.91248 3.69528 7.88174 3.62262 7.88174 3.54686C7.88174 3.4711 7.91248 3.39844 7.96721 3.34486L8.37998 2.94086C8.43472 2.88729 8.50895 2.8572 8.58636 2.8572C8.66376 2.8572 8.738 2.88729 8.79274 2.94086Z"
                      fill="#FF3D83"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <StyledUser onClick={onConnect}>Connect Wallet</StyledUser>
        )}
      </StyledHead>
      {children}
    </StyledWrap>
  );
}
