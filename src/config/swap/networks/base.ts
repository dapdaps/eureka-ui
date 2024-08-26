import { base } from '@/config/tokens/base';

import { basic as aerodromeBasic, networks as aerodromeNetworks } from '../dapps/aerodrome';
import { basic as balancerBasic, networks as balancerNetworks } from '../dapps/balancer';
import { basic as baseSwapBasic, networks as baseSwapNetworks } from '../dapps/base-swap';
import { basic as horizonDexBasic, networks as horizonDexNetworks } from '../dapps/horizon-dex';
import { basic as rocketSwapBasic, networks as rocketSwapNetworks } from '../dapps/rocket-swap';
import { basic as sharkBasic, networks as sharkNetworks } from '../dapps/shark-swap';
import { basic as sushiBasic, networks as sushiNetworks } from '../dapps/sushi-swap';
import { basic as swapBasedBasic, networks as swapBasedNetworks } from '../dapps/swap-based';
import { basic as synthSwapBasic, networks as synthSwapNetworks } from '../dapps/synth-swap';
import { basic as velocimeterV2Basic, networks as velocimeterV2Networks } from '../dapps/velocimeter-v2';
const CHAIN_ID = 8453;

export default {
  chainId: CHAIN_ID,
  defalutInputCurrency: base['eth'],
  dexs: {
    Aerodrome: {
      ...aerodromeBasic,
      ...aerodromeNetworks[CHAIN_ID],
    },
    SushiSwap: {
      ...sushiBasic,
      ...sushiNetworks[CHAIN_ID],
    },
    BaseSwap: {
      ...baseSwapBasic,
      ...baseSwapNetworks[CHAIN_ID],
    },
    Balancer: {
      ...balancerBasic,
      ...balancerNetworks[CHAIN_ID],
    },
    SwapBased: {
      ...swapBasedBasic,
      ...swapBasedNetworks[CHAIN_ID],
    },
    'Velocimeter V2': {
      ...velocimeterV2Basic,
      ...velocimeterV2Networks[CHAIN_ID],
    },
    RocketSwap: {
      ...rocketSwapBasic,
      ...rocketSwapNetworks[CHAIN_ID],
    },
    Synthswap: {
      ...synthSwapBasic,
      ...synthSwapNetworks[CHAIN_ID],
    },
    SharkSwap: {
      ...sharkBasic,
      ...sharkNetworks[CHAIN_ID],
    },
    HorizonDEX: {
      ...horizonDexBasic,
      ...horizonDexNetworks[CHAIN_ID],
    },
  },
};
