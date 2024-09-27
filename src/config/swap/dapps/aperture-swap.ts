import { manta } from '@/config/tokens/manta';

const basic = {
  name: 'ApertureSwap',
  logo: '/assets/dapps/aperture.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};

const networks = {
  169: {
    defaultCurrencies: {
      input: manta['eth'],
      output: manta['usdc']
    },
    tokens: [
      manta['eth'],
      manta['weth'],
      manta['manta'],
      manta['usdc'],
      manta['usdt'],
      manta['wbtc'],
      manta['dai'],
      manta['stone'],
      manta['wusdm'],
      manta['tia'],
      manta['wsteth'],
      manta['lab'],
      manta['reth']
    ]
  }
};

export { basic, networks };
