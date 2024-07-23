import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

import AccountItem from '@/components/AccountSider/components/AccountItem';
import Chain from '@/components/AccountSider/components/Chain';
import ConnectWallet from '@/components/ConnectWallet';
import DropdownMenuPanel from '@/components/DropdownMenuPanel';
import DropdownSearchResultPanel from '@/components/DropdownSearchResultPanel';
import useAccount from '@/hooks/useAccount';
import { useLayoutStore } from '@/stores/layout';
import { activityReg } from '@/utils/activity-reg';
import { goHomeWithFresh } from '@/utils/activity-utils';
import IconSearch from '@public/images/header/search.svg'
import { NavMainV2 } from './NavMainV2';


const Flex = styled.div`
  display: flex;
  align-items: center;
`

const LoginContainer = styled.div`
  width: auto;
  align-items: center;
  display: flex;
  gap: 15px;
`;
const AccountWrapper = styled.div<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
const Container = styled.div<{ $expand: boolean }>`
  position: relative;
  color: #979abe;
  padding: 20px 36px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 50;
  background: ${({ $expand }) => ($expand ? 'rgba(38, 40, 54, 1)' : 'rgba(0, 0, 0, 1)')};
  backdrop-filter: ${({ $expand }) => ($expand ? 'none' : 'blur(5px)')};

  .container-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
  }
`;
const LogoContainer = styled.div`
  width: auto;
  align-items: center;
  cursor: pointer;
  img {
    height: 32px;
  }
`;
const ChainAndAccountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .bridge-icon {
    cursor: pointer;
  }
`;

const StyledNav = styled(NavMainV2)`
  margin-left: 60px;
`

const StyledSearch = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`


const logoUrl = 'https://assets.dapdap.net/images/logo.png';

export const DesktopNavigationTop = ({ isHideAccount }: { isHideAccount?: boolean }) => {
  const router = useRouter();
  const setLayoutStore = useLayoutStore((store) => store.set);
  const { account } = useAccount();

  const [searchContent, setSearchContent] = useState<string>();

  const [showMenuContent, setShowMenuContent] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  const isFromActivity = router.pathname.match(activityReg);

  return (
    <Container $expand={showMenuContent}>
      <div className="container-nav">
        <Flex>
          {isFromActivity ? (
              <LogoContainer onClick={goHomeWithFresh}>
                <img src={logoUrl} alt="" />
              </LogoContainer>
            ) : (
              <Link href="/">
                <LogoContainer>
                  <img src={logoUrl} alt="" />
                </LogoContainer>
              </Link>
            )}
          <StyledNav />
          <StyledSearch onClick={() => setShowSearch(true)}><IconSearch /></StyledSearch>
        </Flex>
        <ChainAndAccountWrapper>
          {isHideAccount ? (
            <div />
          ) : account ? (
            <LoginContainer>
              <Chain showName={false} bp="3001-003" />
              <AccountWrapper
                onClick={() => {
                  setLayoutStore({ showAccountSider: true });
                }}
              >
                <AccountItem showCopy={false} logoSize={28} bp="3001-004" />
              </AccountWrapper>
            </LoginContainer>
          ) : (
            <ConnectWallet />
          )}
        </ChainAndAccountWrapper>
      </div>
      <DropdownMenuPanel show={showMenuContent} setShow={setShowMenuContent} />
      { showSearch && (<DropdownSearchResultPanel searchText={searchContent} setSearchContent={setSearchContent} />)}
    </Container>
  );
};
