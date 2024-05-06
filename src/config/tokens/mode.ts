import type { Token } from '@/types';

const CHAIN_ID = 34443;
export const mode: { [key: string]: Token } = {
  eth: {
    chainId: CHAIN_ID,
    address: 'native',
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://ipfs.near.social/ipfs/bafkreibmo3leq3youcg4o2fxe6pjxajkz4rfee4u5qbcxrx4puebx46psy',
    decimals: 18,
    isNative: true,
  },
};
