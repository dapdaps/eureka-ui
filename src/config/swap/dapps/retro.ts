import { polygon } from '@/config/tokens/polygon';

const basic = {
  name: 'Retro',
  logo: '/images/apps/retro.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  137: {
    defaultCurrencies: {
      input: polygon['eth'],
      output: polygon['usdc'],
    },
    tokens: [
      polygon['eth'],
      polygon['usdc'],
      polygon['mai'],
      polygon['wmatic'],
      polygon['cash'],
      polygon['usdt'],
      polygon['retro'],
      polygon['wbtc'],
      polygon['weth'],
      polygon['maticx'],
      polygon['usdc.e'],
      polygon['ichi'],
      polygon['cash']
    ],
  },
};

export { basic, networks };
