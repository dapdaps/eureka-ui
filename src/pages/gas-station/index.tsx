import { useSetChain } from '@web3-onboard/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import chainCofig from '@/config/chains';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { Chain } from '@/types';
import type { NextPageWithLayout } from '@/utils/types';
import GasStation from '@/views/GasStation';

const Container = styled.div`
  padding-top: 80px;
`;

const RightContainer = styled.div`
  width: 414px;
`;

const Sep = styled.div`
  margin-top: 20px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  line-height: 23.66px;
  gap: 10px;
`;

const chainListSort = [
  1, 42161, 10, 8453, 81457, 5000, 324, 59144, 169, 34443, 1088, 534352, 1101, 137, 56, 43114, 100
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
//     icon: 'https://assets.dapdap.net/images/bafkreicjsbkvvcxahxjejkctwopcnmzbeskxhfrkg7lyawhkhzrxcmvgfy.svg',
//   },
//   {
//     chainId: 421614,
//     chainName: 'Arbitrum Sepolia',
//     nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
//     rpcUrls: ['https://endpoints.omniatech.io/v1/arbitrum/sepolia/public'],
//     blockExplorers: 'https://basescan.org',
//     icon: 'https://s3.amazonaws.com/dapdap.main/images/arbitrum.png',
//   },
// ]

// chainList.unshift(TestChains[1])
// chainList.unshift(TestChains[0])

const Bridge: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Container>
      <Title>
        ⛽<span>Gas Station</span>
      </Title>
      <GasStation chainList={chainList} />
    </Container>
  );
};

Bridge.getInitialProps = async () => ({});

Bridge.getLayout = useDefaultLayout;

export default Bridge;
