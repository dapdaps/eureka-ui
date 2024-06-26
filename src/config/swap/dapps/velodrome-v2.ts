import { optimism } from '@/config/tokens/optimism';
const basic = {
  name: 'Velodrome V2',
  logo: '/images/apps/velodrome.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  10: {
    defaultCurrencies: {
      input: optimism['weth'],
      output: optimism['usdt'],
    },
    tokens: [
      optimism['op'],
      optimism['velo'],
      optimism['wbtc'],
      optimism['usdc.e'],
      optimism['usdt'],
      optimism['susd'],
      optimism['dai'],
      optimism['weth'],
      optimism['snx'],
      optimism['stg'],
      optimism['frax'],
    ],
  },
};

export { basic, networks };
