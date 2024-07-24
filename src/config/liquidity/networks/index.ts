import avalanche from './avalanche';
import base from './base';
import bsc from './bsc';
import linea from './linea';
import manta from './manta';
import optimism from './optimism';
import polygon from './polygon';
import polygonZkevm from './polygon-zkevm';
import blast from './blast';

export default {
  43114: avalanche,
  8453: base,
  56: bsc,
  59144: linea,
  10: optimism,
  137: polygon,
  1101: polygonZkevm,
  169: manta,
  81457: blast
} as { [key: number]: any };
