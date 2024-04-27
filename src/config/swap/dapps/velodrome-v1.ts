import { optimism } from '@/config/tokens/optimism';
const basic = {
  name: 'Velodrome V1',
  logo: '/images/apps/velodrome.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  10: {
    defaultCurrencies: {
      input: optimism['weth'],
      output: optimism['usdc.e'],
    },
    tokens: [
      optimism['weth'],
      optimism['usdc.e'],
      optimism['op'],
      optimism['mseth'],
      optimism['stg'],
      optimism['mai'],
      optimism['susd'],
      optimism['snx'],
      optimism['wbtc'],
    ],
  },
};

export { basic, networks };
