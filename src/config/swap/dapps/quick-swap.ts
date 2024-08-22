import { manta } from '@/config/tokens/manta';
import { polygon } from '@/config/tokens/polygon';
import { polygonZkevm } from '@/config/tokens/polygonZkevm';

const basic = {
  name: 'QuickSwap',
  logo: '/images/apps/quick-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  137: {
    defaultCurrencies: {
      input: polygon['eth'],
      output: polygon['usdc'],
    },
    tokens: [polygon['eth'], polygon['usdc'], polygon['wbtc'], polygon['wmatic'], polygon['dai'], polygon['usdt']],
  },
  1101: {
    defaultCurrencies: {
      input: polygonZkevm['eth'],
      output: polygonZkevm['usdc'],
    },
    tokens: [
      polygonZkevm['eth'],
      polygonZkevm['usdc'],
      polygonZkevm['weth'],
      polygonZkevm['wbtc'],
      polygonZkevm['matic'],
      polygonZkevm['usdt'],
      polygonZkevm['dai'],
    ],
  },
  169: {
    defaultCurrencies: {
      input: manta['weth'],
      output: manta['usdc'],
    },
    tokens: [
      manta['weth'],
      manta['usdc'],
      manta['usdt'],
      manta['wbtc'],
      manta['dai'],
      manta['matic'],
      manta['quick'],
      manta['wsteth'],
      manta['wusdm'],
    ],
  },
};

export { basic, networks };
