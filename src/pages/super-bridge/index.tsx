import { useSetChain } from '@web3-onboard/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { init, getQuote, execute, getIcon, getBridgeMsg, getAllToken, getChainScan, getStatus } from 'super-bridge-sdk';

import chainCofig from '@/config/chains'
import useAccount from '@/hooks/useAccount';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import useAddAction from '@/hooks/useAddAction';
import { useDefaultLayout } from '@/hooks/useLayout';
import { usePriceStore } from '@/stores/price';
import { useDebounceFn } from 'ahooks';

import type { NextPageWithLayout } from '@/utils/types';
import type { Chain } from '@/types';

const arrow = (
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L4 4L1 7" stroke="#979ABE" strokeLinecap="round" />
    </svg>
);

const Container = styled.div`
  margin: 0 8%;
  color: #ffffff;
  position: relative;
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

const chainList = Object.values(chainCofig)

const Bridge: NextPageWithLayout = () => {
    const handlerList = useRef<any[]>([])
    const [toChainId, setToChain] = useState<number>(chainList[1].chainId)
    const router = useRouter();
    // const tool = router.query.tool as string;
    const { account, chainId } = useAccount();
    const prices = usePriceStore((store) => store.price);
    const { addAction } = useAddAction('all-in-one');

    const [{ settingChain, connectedChain }, setChain] = useSetChain();

    // const { icon, name, color } = getBridgeMsg(tool)

  

    return (
        <Container>
            <BreadCrumbs>
                <Link href="/">Home</Link>
                {arrow}
                <span>Super Bridge</span>
            </BreadCrumbs>
            
        </Container>
    )
};

Bridge.getInitialProps = async () => ({});

Bridge.getLayout = useDefaultLayout;

export default Bridge;
