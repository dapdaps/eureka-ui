import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useInititalDataWithAuth from '@/hooks/useInititalDataWithAuth';
import { useDebounceFn } from 'ahooks';
import useAccount from '@/hooks/useAccount';
import AccountSider from '../AccountSider';
import Footer from '../Footer';
import { DesktopNavigationTop } from '../navigation/desktop/DesktopNavigationTop';

interface Props {
  children: ReactNode;
}

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  .content {
    padding: 0px 0px 80px;
    flex-grow: 1;
    position: relative;
    overflow-x: hidden;
    box-sizing: border-box;
  }
`;

const BLACK_PATH = [
  '/odyssey/[version]',
  '/',
  '/odyssey',
  '/dapp/[dappRoute]',
  '/alldapps',
  '/networks',
  '/networks/[path]',
  '/bridge-x/[tool]',
  '/notification',
  '/all-in-one/[chain]',
  '/all-in-one/[chain]/[menu]',
  '/bridge-chain/[chain]',
];

const HideFooterRoutes = [
  '/uniswap',
  '/coin68'
]

export function DefaultLayout({ children }: Props) {
  const router = useRouter();
  const pathName = router.pathname;
  const { account } = useAccount();
  const { getInitialDataWithAuth } = useInititalDataWithAuth();

  const { run: updateAccount } = useDebounceFn(
    () => {
      getInitialDataWithAuth(account);
    },
    { wait: 500 },
  );

  useEffect(() => {
    updateAccount();
  }, [account]);

  return (
    <Layout
      style={{
        background: BLACK_PATH.includes(router.pathname) ? '#000' : '#101115',
      }}
    >
      {pathName !== '/uniswap' && <DesktopNavigationTop />}

      <div className="content">
        {/* <div style={{ display: 'none' }}>
          <LoginBox />
        </div> */}
        {children}
      </div>
      {!HideFooterRoutes.includes(router.pathname) && (
        <Footer
          isHideLeft={pathName !== '/'}
          isHideRight={['/all-in-one/[chain]/[menu]'].includes(pathName)}
          isSuperSwapScrollFooter={pathName === '/super-swap'}
        />
      )}
      <AccountSider />
    </Layout>
  );
}
