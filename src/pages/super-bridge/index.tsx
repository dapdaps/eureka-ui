import { useSetChain } from '@web3-onboard/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Suspense } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

import chainCofig from '@/config/chains'
import { useDefaultLayout } from '@/hooks/useLayout';
import type { Chain } from '@/types';
import type { NextPageWithLayout } from '@/utils/types';
// import BridgeAction from '@/views/SuperBridge/BridgeAction';
// import Transaction from '@/views/SuperBridge/Transaction';
import Medal from '@/views/SuperBridge/Medal';



const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 80px;
`;

const RightContainer = styled.div`
  width: 414px;
`

const Sep = styled.div`
  margin-top: 20px;
`

const chainListSort = [1, 42161, 10, 8453, 81457, 5000, 324, 59144, 169, 34443, 1088, 534352, 1101, 137, 56, 43114, 100]

const chainList = Object.values(chainCofig)

chainList.sort((a, b) => chainListSort.indexOf(a.chainId) - chainListSort.indexOf(b.chainId))

const TestChains: Chain[] = [
  {
    chainId: 11155111,
    chainName: 'Sepolia',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com'],
    blockExplorers: 'https://sepolia.etherscan.io',
    icon: 'https://assets.dapdap.net/images/bafkreicjsbkvvcxahxjejkctwopcnmzbeskxhfrkg7lyawhkhzrxcmvgfy.svg',
  },
  {
    chainId: 421614,
    chainName: 'Arbitrum Sepolia',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://endpoints.omniatech.io/v1/arbitrum/sepolia/public'],
    blockExplorers: 'https://basescan.org',
    icon: 'https://assets.dapdap.net/images/bafkreiajyg2iof2wygtgromy6a2yfl2fqavfy235k7afc4frr7xnljvu2a.svg',
  },
]

// chainList.unshift(TestChains[1])
// chainList.unshift(TestChains[0])

const BridgeAction = dynamic(() => import('@/views/SuperBridge/BridgeAction'), {
  ssr: false,
  loading: () => <div style={{ width: 800 }}>
    <Skeleton width="550px" height="72px" borderRadius="16px" containerClassName="skeleton" />
    <Skeleton style={{ marginTop: 20 }} width="800px" height="150px" borderRadius="6px" containerClassName="skeleton" />
    <Skeleton style={{ marginTop: 20 }} width="800px" height="150px" borderRadius="6px" containerClassName="skeleton" />
    <Skeleton style={{ marginTop: 20 }} width="800px" height="50px" borderRadius="6px" containerClassName="skeleton" />
  </div>
});

const Transaction = dynamic(() => import('@/views/SuperBridge/Transaction'), {
  ssr: false,
  loading: () => <div style={{ width: 414 }}>
    <Skeleton width="250px" height="72px" borderRadius="16px" containerClassName="skeleton" />
    <Skeleton style={{ marginTop: 20 }} width="414px" height="50px" borderRadius="6px" containerClassName="skeleton" />
    <Skeleton style={{ marginTop: 20 }} width="414px" height="50px" borderRadius="6px" containerClassName="skeleton" />
  </div>
});

const Bridge: NextPageWithLayout = () => {
  const router = useRouter();
  const [updater, setUpdater] = useState(1)

  return (
    <Container>
      <BridgeAction
        chainList={chainList}
        onTransactionUpdate={() => {
          setUpdater(updater + 1)
        }}
      />

      <RightContainer>
        <Transaction updater={updater} />
        <Sep />
        <Medal />
      </RightContainer>

    </Container>
  )
};

Bridge.getInitialProps = async () => ({});

Bridge.getLayout = useDefaultLayout;

export default Bridge;
