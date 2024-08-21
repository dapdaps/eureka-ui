import popupsData from '@/config/all-in-one/chains';
import zksync from '@/config/all-in-one/chains/zksync';
import linea from '@/config/all-in-one/chains/linea';
import scroll from '@/config/all-in-one/chains/scroll';
import blast from '@/config/all-in-one/chains/blast';

export const DefaultIcon =
  'https://assets.dapdap.net/images/bafkreiddol6jzrlwliyh2vrjk3u2ajp3z5cubb5gzedifearly2bvdraay.svg';

export const CategoryList = {
  bridged: {
    key: 1,
    label: 'Bridged',
    icon: '/images/portfolio/bridged.svg',
    usd: '0.00',
    executions: 0,
    protocol: 'bridge',
  },
  swapped: {
    key: 1,
    label: 'Swapped',
    icon: '/images/portfolio/swapped.svg',
    usd: '0.00',
    executions: 0,
    protocol: 'swap',
  },
  liquidity: {
    key: 1,
    label: 'Added Liquidity',
    icon: '/images/portfolio/liquidity.svg',
    usd: '0.00',
    executions: 0,
    protocol: 'liquidity',
  },
  lending: {
    key: 1,
    label: 'Lent & Borrowed',
    icon: '/images/portfolio/lending.svg',
    usd: '0.00',
    executions: 0,
    protocol: 'lending',
  },
};

// Polygon zkEVM, zkSync, Linea, Scroll, Blast
export const SupportedChains = [
  {
    name: popupsData['polygon-zkevm'].title,
    chainId: popupsData['polygon-zkevm'].chainId,
  },
  {
    name: popupsData.zksync.title,
    chainId: popupsData.zksync.chainId,
  },
  {
    name: popupsData.linea.title,
    chainId: popupsData.linea.chainId,
  },
  {
    name: popupsData.scroll.title,
    chainId: popupsData.scroll.chainId,
  },
  {
    name: popupsData.blast.title,
    chainId: popupsData.blast.chainId,
  },
];
