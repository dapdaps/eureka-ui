import { basic as HorizonDEXBasic, networks as HorizonDEXNetworks } from '../dapps/horizon-dex';
import { basic as IziSwapBasic, networks as IziSwapNetworks } from '../dapps/izi-swap';
import { basic as SyncSwapBasic, networks as SyncSwapNetworks } from '../dapps/sync-swap';
import { basic as VelocoreV2Basic, networks as VelocoreV2Networks } from '../dapps/velocore-v2';
import { basic as metavaultV3Basic, networks as metavaultV3Networks } from '../dapps/metavault-v3';
import { basic as pancakeSwapBasic, networks as pancakeSwapNetworks } from '../dapps/pancake-swap';
import { basic as xfaiBasic, networks as xfaiNetworks } from '../dapps/xfai';
import { basic as lynexBasic, networks as lynexNetworks } from '../dapps/lynex';
import { basic as sushiBasic, networks as sushiNetworks } from '../dapps/sushi-swap';
import { basic as xyBasic, networks as xyNetworks } from '../dapps/xy-finance';
import chains from '../../chains';

const CHAIN_ID = 59144;

export default {
  ...chains[CHAIN_ID],
  displayChainName: 'Linea',
  wethAddress: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
  connectProps: {
    noAccountTips: 'Linea Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Linea Chain.',
  },
  defalutDex: 'SyncSwap',
  dexs: {
    SyncSwap: {
      ...SyncSwapBasic,
      ...SyncSwapNetworks[CHAIN_ID],
      oneExecutionDisabled: true,
    },
    Lynex: {
      ...lynexBasic,
      ...lynexNetworks[CHAIN_ID],
    },
    iZiSwap: {
      ...IziSwapBasic,
      ...IziSwapNetworks[CHAIN_ID],
    },
    Xfai: {
      ...xfaiBasic,
      ...xfaiNetworks[CHAIN_ID],
    },
    'Pancake Swap': {
      ...pancakeSwapBasic,
      ...pancakeSwapNetworks[CHAIN_ID],
    },
    'Metavault V3': {
      ...metavaultV3Basic,
      ...metavaultV3Networks[CHAIN_ID],
    },
    'Velocore V2': {
      ...VelocoreV2Basic,
      ...VelocoreV2Networks[CHAIN_ID],
    },
    'XY Finance': {
      ...xyBasic,
      ...xyNetworks[CHAIN_ID],
    },
    HorizonDEX: {
      ...HorizonDEXBasic,
      ...HorizonDEXNetworks[CHAIN_ID],
    },
    SushiSwap: {
      ...sushiBasic,
      ...sushiNetworks[CHAIN_ID],
    },
  },
};
