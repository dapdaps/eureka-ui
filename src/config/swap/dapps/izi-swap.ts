import { linea } from '@/config/tokens/linea';
import { mantle } from '@/config/tokens/mantle';
import { manta } from '@/config/tokens/manta';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'iZiSwap',
  logo: '/images/apps/izi-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc'],
    },
    tokens: [linea['eth'], linea['usdc'], linea['weth'], linea['izi'], linea['wbtc'], linea['busd']],
  },
  5000: {
    defaultCurrencies: {
      input: mantle['weth'],
      output: mantle['usdc'],
    },
    tokens: [mantle['weth'], mantle['usdc'], mantle['mnt'], mantle['usdt'], mantle['wbtc'], mantle['wmnt']],
  },
  169: {
    defaultCurrencies: {
      input: manta['weth'],
      output: manta['usdc'],
    },
    tokens: [
      manta['weth'],
      manta['usdc'],
      manta['iusd'],
      manta['izi'],
      manta['usdt'],
      manta['wbtc'],
      manta['dai'],
      manta['wsteth'],
      manta['tia'],
    ],
  },
  534352: {
    factoryAddress: '0x8c7d3063579BdB0b90997e18A770eaE32E1eBb08',
    routerAddress: '0x2db0AFD0045F3518c77eC6591a542e326Befd3D7',
    quoterAddress: '0x3EF68D3f7664b2805D4E88381b64868a56f88bC4',
    fees: [3000, 10000],
    defaultCurrencies: {
      input: scroll['weth'],
      output: scroll['usdc'],
    },
    tokens: [scroll['weth'], scroll['usdc'], scroll['dai'], scroll['wbtc'], scroll['izi'], scroll['wsteth']],
  },
};

export { basic, networks };
