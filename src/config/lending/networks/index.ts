import arbitrum from './arbitrum';
import avalanche from './avalanche';
import base from './base';
import blast from './blast';
import bsc from './bsc';
import gnosis from './gnosis';
import linea from './linea';
import manta from './manta';
import mantle from './mantle';
import metis from './metis';
import mode from './mode';
import optimism from './optimism';
import polygon from './polygon';
import polygonZkevm from './polygon-zkevm';
import scroll from './scroll';
import zkSync from './zkSync';

export default {
  42161: arbitrum,
  43114: avalanche,
  8453: base,
  81457: blast,
  56: bsc,
  100: gnosis,
  59144: linea,
  5000: mantle,
  1088: metis,
  10: optimism,
  137: polygon,
  324: zkSync,
  1101: polygonZkevm,
  169: manta,
  534352: scroll,
  34443: mode
} as { [key: number]: any };
