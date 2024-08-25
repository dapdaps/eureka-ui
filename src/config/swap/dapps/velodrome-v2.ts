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
      optimism['frax'],
      optimism['usdt'],
      optimism['wbtc'],
      optimism['snx'],
      optimism['mai'],
      optimism['usdc'],
      optimism['dola'],
      optimism['chi'],
      optimism['dai'],
      optimism['susd'],
      optimism['mseth'],
      optimism['weth'],
      optimism['velo'],
      optimism['aleth'],
      optimism['stg'],
      optimism['wsteth'],
      optimism['ezeth'],
      optimism['op'],
      optimism['alusd'],
      optimism['msusd'],
      optimism['usdc.e'],
      optimism['fbomb']
    ],
  },
};

export { basic, networks };
