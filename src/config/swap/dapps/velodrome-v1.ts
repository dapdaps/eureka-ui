import { optimism } from '@/config/tokens/optimism';
const basic = {
  name: 'Velodrome V1',
  logo: '/assets/apps/velodrome.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  10: {
    defaultCurrencies: {
      input: optimism['weth'],
      output: optimism['usdc.e']
    },
    tokens: [
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
    ]
  }
};

export { basic, networks };
