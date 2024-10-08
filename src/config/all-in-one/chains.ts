import arbitrum from './chains/arbitrum';
import avalanche from './chains/avalanche';
import base from './chains/base';
import beraBArtio from './chains/bera-bArtio';
import blast from './chains/blast';
import bnb from './chains/bsc';
import gnosis from './chains/gnosis';
import linea from './chains/linea';
import manta from './chains/manta';
import mantle from './chains/mantle';
import metis from './chains/metis';
import mode from './chains/mode';
import optimism from './chains/optimism';
import polygon from './chains/polygon';
import polygonZkevm from './chains/polygon-zkevm';
import scroll from './chains/scroll';
import zksync from './chains/zksync';

const popupsData: { [key: string]: AllInOneChain } = {
  arbitrum,
  avalanche,
  base,
  blast,
  bnb,
  gnosis,
  linea,
  manta,
  mantle,
  metis,
  mode,
  optimism,
  polygon,
  'polygon-zkevm': polygonZkevm,
  scroll,
  zksync,
  'bera-b': beraBArtio
};

export const PathToId: { [key: string]: number } = {
  optimism: 13,
  bnb: 12,
  gnosis: 11,
  polygon: 10,
  zksync: 9,
  metis: 8,
  'polygon-zkevm': 3,
  mantle: 7,
  base: 6,
  arbitrum: 2,
  avalanche: 5,
  linea: 4,
  manta: 15,
  scroll: 17,
  blast: 18,
  mode: 19,
  'bera-b': 21
};

export const IdToPath: { [key: string]: string } = {
  13: 'optimism',
  12: 'bnb',
  11: 'gnosis',
  10: 'polygon',
  9: 'zksync',
  8: 'metis',
  3: 'polygon-zkevm',
  7: 'mantle',
  6: 'base',
  2: 'arbitrum',
  5: 'avalanche',
  4: 'linea',
  15: 'manta',
  17: 'scroll',
  18: 'blast',
  19: 'mode',
  21: 'bera-b'
};

export default popupsData;

export interface AllInOneChain {
  title: string;
  path: string;
  icon: string;
  bgColor: string;
  bgIcon?: string;
  selectBgColor: string;
  chainId: number;
  rpcUrls: string[];
  defaultTab?: string;
  isHideAllInOne?: boolean;
  theme: {
    button: {
      bg: string;
      text: string;
    };
  };
  menuConfig: { [tab: string]: { tab: string; path?: string; id?: number } };
}

// Polygon zkEVM, zkSync, Linea, Scroll, Blast
export const SupportedChains = [
  {
    name: popupsData['polygon-zkevm'].title,
    chainId: popupsData['polygon-zkevm'].chainId
  },
  {
    name: popupsData.zksync.title,
    chainId: popupsData.zksync.chainId
  },
  {
    name: popupsData.linea.title,
    chainId: popupsData.linea.chainId
  },
  {
    name: popupsData.scroll.title,
    chainId: popupsData.scroll.chainId
  },
  {
    name: popupsData.blast.title,
    chainId: popupsData.blast.chainId
  }
];
