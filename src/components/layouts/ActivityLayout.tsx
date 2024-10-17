import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import AccountSider from '../AccountSider';
import Footer from '../Footer';
import { DesktopNavigationTop } from '../navigation/desktop/DesktopNavigation';
import { DesktopNavigationLeft } from '../navigation/desktop/DesktopNavigationLeft';
import { LoginBox } from '../navigation/desktop/LoginBox';

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

export function ActivityLayout({ children }: Props) {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <Layout
      style={{
        background: router.pathname === '/campaigns/[version]' ? '#000' : '#16181d'
      }}
    >
      {pathName !== '/uniswap' && <DesktopNavigationTop isHideAccount={true} />}

      <div className="content">{children}</div>
      {pathName !== '/uniswap' && <Footer />}
      <AccountSider />
    </Layout>
  );
}
