import dynamic from 'next/dynamic';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

import chainCofig from '@/config/chains';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const chainListSort = [
  11155111, 421614, 1, 42161, 10, 8453, 81457, 5000, 324, 59144, 169, 34443, 1088, 534352, 1101, 137, 56, 43114, 100
];

const chainList = Object.values(chainCofig);

chainList.sort((a, b) => chainListSort.indexOf(a.chainId) - chainListSort.indexOf(b.chainId));

// const TestChains: Chain[] = [
//   {
//     chainId: 11155111,
//     chainName: 'Sepolia',
//     nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
//     rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com'],
//     blockExplorers: 'https://sepolia.etherscan.io',
//     icon: '/assets/images/bafkreicjsbkvvcxahxjejkctwopcnmzbeskxhfrkg7lyawhkhzrxcmvgfy.svg',
//   },
//   {
//     chainId: 421614,
//     chainName: 'Arbitrum Sepolia',
//     nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
//     rpcUrls: ['https://endpoints.omniatech.io/v1/arbitrum/sepolia/public'],
//     blockExplorers: 'https://basescan.org',
//     icon: '/assets/images/arbitrum.png',
//   },
// ]

// chainList.unshift(TestChains[1])
// chainList.unshift(TestChains[0])

// @ts-ignore
const BridgeAction = dynamic(() => import('@/views/SuperBridge/BridgeAction'), {
  ssr: false,
  loading: () => (
    <div style={{ width: 1220, paddingTop: 80, display: 'flex', gap: 20 }}>
      <div>
        <Skeleton width="550px" height="72px" borderRadius="16px" containerClassName="skeleton" />
        <Skeleton
          style={{ marginTop: 20 }}
          width="800px"
          height="150px"
          borderRadius="6px"
          containerClassName="skeleton"
        />
        <Skeleton
          style={{ marginTop: 20 }}
          width="800px"
          height="150px"
          borderRadius="6px"
          containerClassName="skeleton"
        />
        <Skeleton
          style={{ marginTop: 20 }}
          width="800px"
          height="50px"
          borderRadius="6px"
          containerClassName="skeleton"
        />
      </div>
      <div>
        <Skeleton width="400px" height="250px" borderRadius="16px" containerClassName="skeleton" />
      </div>
    </div>
  )
});

const Bridge: NextPageWithLayout = () => {
  const [updater, setUpdater] = useState(1);

  return (
    <Container>
      <BridgeAction
        chainList={chainList}
        onTransactionUpdate={() => {
          setUpdater(updater + 1);
        }}
      />
    </Container>
  );
};

Bridge.getInitialProps = async () => ({});

Bridge.getLayout = useDefaultLayout;

export default Bridge;
