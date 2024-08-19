import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import useAccount from '@/hooks/useAccount';
import { activityReg } from '@/utils/activity-reg';
import { goHomeWithFresh } from '@/utils/activity-utils';
import IconSearch from '@public/images/header/search.svg'
import { NavMainV2 } from './NavMainV2';
import CheckIn from './components/CheckIn';
import AccountLogo from './components/AccountLogo';
import dynamic from 'next/dynamic';

const ConnectWallet = dynamic(() => import('@/components/ConnectWallet'));
const DropdownMenuPanel = dynamic(() => import('@/components/DropdownMenuPanel'));
const DropdownSearchResultPanel = dynamic(() => import('@/components/DropdownSearchResultPanel'));
const Chain = dynamic(() => import('@/components/AccountSider/components/Chain'));
const Notification = dynamic(() => import('./Notification'));

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
  padding: 14px 36px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 90;
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
  margin-left: 36px;
`

const StyledSearch = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
      border-radius: 12px;
      background-color: #1F2229;
      box-sizing: border-box;
  }
`


const logoUrl = 'https://assets.dapdap.net/images/logo.png';

export const DesktopNavigationTop = ({ isHideAccount }: { isHideAccount?: boolean }) => {
  const router = useRouter();
  // const setLayoutStore = useLayoutStore((store) => store.set);
  const { account } = useAccount();

  // const [searchContent, setSearchContent] = useState<string>();

  const [showMenuContent, setShowMenuContent] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  const isFromActivity = router.pathname.match(activityReg);

  // Listen for ESC key press to close search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSearch(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Container $expand={showMenuContent}>
      <div className="container-nav">
        <Flex>
          {isFromActivity ? (
            <LogoContainer onClick={goHomeWithFresh}>
              <img src={logoUrl} alt="" />
            </LogoContainer>
          ) : (
              <LogoContainer>
                <Link href="/">
                    <img src={logoUrl} alt="" />
                </Link>
              </LogoContainer>
          )}
          <StyledNav />
          <StyledSearch data-bp="1001-004" onClick={() => setShowSearch(true)}><IconSearch /></StyledSearch>
        </Flex>
        <ChainAndAccountWrapper>
          {isHideAccount ? (
            <div />
          ) : account ? (
            <LoginContainer>
              <CheckIn />
              <Notification />
              <Chain showName={false} bp="3001-003" />
              <AccountLogo logoSize={28} />
            </LoginContainer>
          ) : (
            <ConnectWallet />
          )}
        </ChainAndAccountWrapper>
      </div>
      <DropdownMenuPanel show={showMenuContent} setShow={setShowMenuContent} />
      { showSearch && (<DropdownSearchResultPanel setShowSearch={setShowSearch} />)}
    </Container>
  );
};
