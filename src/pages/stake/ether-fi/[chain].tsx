import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import EtherFi from '@/components/Stake/EtherFi';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const Container = styled.div`
  margin: 0 8%;
  color: #ffffff;
  padding-top: 50px;
`;

const BreadCrumbs = styled.div`
  color: #979abe;
  font-size: 14px;
  margin-bottom: 32px;
  a {
    text-decoration: none;
    color: #979abe;
    display: inline-block;
    cursor: pointer;
  }
  svg {
    margin: 0 8px;
  }
  span {
    color: #ffffff;
  }
`;

const TitleWapper = styled.div`
  text-align: center;
  .icon {
    height: 48px;
  }
`;

const arrow = (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4L1 7" stroke="#979ABE" strokeLinecap="round" />
  </svg>
);

const chainIndexs: any = {
  linea: 6,
  blast: 4,
  base: 3,
  mode: 5
};

export const Page: NextPageWithLayout = () => {
  const [chainIndex, setChainIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log('router:', router);
    if (router.query?.chain) {
      setChainIndex(chainIndexs[router.query.chain as any]);
    }
  }, [router]);

  console.log('chainIndex:', chainIndex);

  return (
    <Container>
      <BreadCrumbs>
        <Link href="/">Home</Link>
        {arrow}
        <Link href="/alldapps">dApps</Link>
        {arrow}
        <span>ether.fi</span>
      </BreadCrumbs>
      <TitleWapper>
        <img className="icon" src="/assets/dapps/etherfi.png" />
      </TitleWapper>
      {!!chainIndex && <EtherFi chainIndex={chainIndex} />}
    </Container>
  );
};

Page.getLayout = useDefaultLayout;

export default Page;
