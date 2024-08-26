import { manta } from '@/config/tokens/manta';

const basic = {
  name: 'ApertureSwap',
  logo: '/images/apps/aperture.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};

const networks = {
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
      manta['stone'],
      manta['wusdm'],
      manta['tia'],
      manta['wsteth'],
      manta['lab'],
    ],
  },
};

export { basic, networks };
