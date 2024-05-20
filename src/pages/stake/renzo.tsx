import { useDefaultLayout } from '@/hooks/useLayout';
import styled from 'styled-components';
import Link from 'next/link';

import type { NextPageWithLayout } from '@/utils/types';
import Renzo from '@/components/Stake/Renzo'
import renzoImg from '@/views/StakeModal/renzo.svg'

const Container = styled.div`
  margin: 0 8%;
  color: #ffffff;
  padding-top: 50px;
`

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
`

const Bg = styled.div`
    width: 478px;
   border: 1px solid rgba(55, 58, 83, 1);
   border-radius: 16px;
   margin: 20px auto;
   padding: 20px 0 0px;
   position: relative;
`

const arrow = (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4L1 7" stroke="#979ABE" strokeLinecap="round" />
  </svg>
);

export const Page: NextPageWithLayout = () => {
  return <Container>
      <BreadCrumbs>
        <Link href="/">Home</Link>
        {arrow}
        <Link href="/alldapps">dApps</Link>
        {arrow}
        <span>renzo</span>
      </BreadCrumbs>
      <TitleWapper>
        <img className="icon" src={renzoImg.src} />
      </TitleWapper>
      <Bg>
        <Renzo />
      </Bg>
    </Container>
};

Page.getLayout = useDefaultLayout;

export default Page;
