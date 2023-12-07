import { memo } from 'react';
import styled from 'styled-components';

import { useConnectWallet } from '@web3-onboard/react';
import useChain from '@/hooks/useChain';
import useAccount from '@/hooks/useAccount';
import { useLayoutStore } from '@/stores/layout';
import { ellipsAccount } from '@/utils/account';
import config from '@/config/uniswap';

const StyledButton = styled.button`
  width: 93px;
  height: 36px;
  border-radius: 12px;
  background-color: #ff684b;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;
const StyledAccountBox = styled.div`
  width: 158px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0px 5px;
  box-sizing: border-box;
  gap: 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    background-color: transparent;
    width: 36px;
  }
`;
const StyledLogo = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: conic-gradient(from 180deg at 50% 50%, #00d1ff 0deg, #ff008a 360deg);
  position: relative;
`;
const StyledChain = styled.img`
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  width: 14px;
  height: 14px;
  padding: 1px;
  right: -3px;
  bottom: 0px;
`;
const StyledScrollChain = styled.div`
  position: absolute;
  right: -3px;
  bottom: -3px;
`;
const StyledAccount = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #101010;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Header = () => {
  const { account, chainId } = useAccount();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const chain = useChain();
  const setLayoutStore = useLayoutStore((store) => store.set);
  return account && chain ? (
    <StyledAccountBox
      onClick={() => {
        setLayoutStore({
          showAccountSider: true,
        });
      }}
    >
      <StyledLogo>
        {chainId !== config.chainId ? (
          <StyledChain src={chain?.icon} />
        ) : (
          <StyledScrollChain>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect
                x="15"
                y="15"
                width="14"
                height="14"
                rx="4"
                transform="rotate(180 15 15)"
                fill="white"
                stroke="#101010"
              />
              <path
                d="M12.506 10.2592V4.80789C12.4987 4.35175 12.1439 3.98462 11.6987 3.98462H6.14554C4.9473 4.00316 3.98438 5.00814 3.98438 6.23934C3.98438 6.65468 4.09298 7.01069 4.2595 7.3222C4.40068 7.58179 4.6215 7.82654 4.8387 8.00827C4.90024 8.06016 4.87129 8.03793 5.05953 8.1566C5.32017 8.31975 5.61701 8.40134 5.61701 8.40134L5.61339 11.661C5.62063 11.8168 5.63511 11.9651 5.67493 12.1024C5.79802 12.5622 6.10934 12.9145 6.53289 13.0851C6.71027 13.1555 6.90937 13.2037 7.12295 13.2075L11.5575 13.2223C12.4408 13.2223 13.1575 12.488 13.1575 11.5794C13.1612 11.0417 12.9005 10.5597 12.506 10.2592Z"
                fill="#FFEEDA"
              />
              <path
                d="M12.6146 11.6203C12.5965 12.2025 12.1295 12.6697 11.5575 12.6697L8.50586 12.6586C8.74838 12.3694 8.8968 11.9948 8.8968 11.5869C8.8968 10.9453 8.52395 10.504 8.52395 10.504H11.5612C12.144 10.504 12.6182 10.9898 12.6182 11.5869L12.6146 11.6203Z"
                fill="#EBC28E"
              />
              <path
                d="M5.12831 7.54824C4.77716 7.20707 4.531 6.76576 4.531 6.24288V6.18725C4.55996 5.29352 5.27673 4.57409 6.14916 4.54813H11.7023C11.8471 4.55555 11.963 4.65938 11.963 4.81143V9.62495C12.0896 9.64722 12.1512 9.66576 12.2743 9.71027C12.372 9.74735 12.506 9.82521 12.506 9.82521V4.81143C12.4987 4.35529 12.1439 3.98816 11.6987 3.98816H6.14554C4.9473 4.0067 3.98438 5.01168 3.98438 6.24288C3.98438 6.9586 4.30294 7.57049 4.82422 8.00065C4.86042 8.03035 4.893 8.06744 4.98713 8.06744C5.15003 8.06744 5.26587 7.93391 5.25863 7.78929C5.25501 7.66691 5.20433 7.62241 5.12831 7.54824Z"
                fill="#101010"
              />
              <path
                d="M11.5576 9.94026H7.20268C6.90946 9.94395 6.67416 10.185 6.67416 10.4854V11.1269C6.6814 11.4236 6.92756 11.6758 7.22079 11.6758H7.54296V11.1269H7.22079V10.5002C7.22079 10.5002 7.30042 10.5002 7.39817 10.5002C7.94841 10.5002 8.35387 11.0231 8.35387 11.5831C8.35387 12.08 7.91221 12.7141 7.17372 12.6623C6.51849 12.6177 6.16373 12.0207 6.16373 11.5831V6.14655C6.16373 5.90179 5.96825 5.70154 5.72933 5.70154H5.29492V6.2578H5.61711V11.5868C5.59901 12.6697 6.37007 13.2148 7.17372 13.2148L11.5612 13.2296C12.4445 13.2296 13.1613 12.4954 13.1613 11.5868C13.1613 10.6782 12.4409 9.94026 11.5576 9.94026ZM12.6146 11.6202C12.5965 12.2024 12.1295 12.6697 11.5576 12.6697L8.5059 12.6585C8.74846 12.3693 8.89688 11.9947 8.89688 11.5868C8.89688 10.9453 8.52399 10.5039 8.52399 10.5039H11.5612C12.144 10.5039 12.6183 10.9898 12.6183 11.5868L12.6146 11.6202Z"
                fill="#101010"
              />
              <path
                d="M10.3844 6.35802H7.10107V5.80176H10.3844C10.5329 5.80176 10.656 5.92413 10.656 6.07989C10.656 6.23193 10.5365 6.35802 10.3844 6.35802Z"
                fill="#101010"
              />
              <path
                d="M10.3844 8.97609H7.10107V8.4198H10.3844C10.5329 8.4198 10.656 8.54221 10.656 8.69797C10.656 8.84999 10.5365 8.97609 10.3844 8.97609Z"
                fill="#101010"
              />
              <path
                d="M10.9637 7.66698H7.10107V7.11072H10.96C11.1085 7.11072 11.2315 7.23309 11.2315 7.38885C11.2352 7.54089 11.1121 7.66698 10.9637 7.66698Z"
                fill="#101010"
              />
            </svg>
          </StyledScrollChain>
        )}
      </StyledLogo>
      <StyledAccount>{ellipsAccount(account)}</StyledAccount>
    </StyledAccountBox>
  ) : (
    <StyledButton
      onClick={() => {
        connect();
      }}
    >
      Connect
    </StyledButton>
  );
};

export default memo(Header);
