import { memo } from 'react';
import styled from 'styled-components';

import { useConnectWallet } from '@web3-onboard/react';
import useChain from '@/hooks/useChain';
import useAccount from '@/hooks/useAccount';
import { useLayoutStore } from '@/stores/layout';
import { ellipsAccount } from '@/utils/account';

const StyledButton = styled.button`
  width: 93px;
  height: 36px;
  border-radius: 12px;
  background-color: #fff;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #1b1b1b;
`;
const StyledAccountBox = styled.div`
  width: 158px;
  height: 36px;
  border-radius: 12px;
  background-color: #2d3247;
  display: flex;
  align-items: center;
  padding: 0px 5px;
  box-sizing: border-box;
  gap: 10px;
  cursor: pointer;
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
  bottom: -3px;
`;
const StyledAccount = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
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
        <StyledChain src={chain?.icon} />
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
