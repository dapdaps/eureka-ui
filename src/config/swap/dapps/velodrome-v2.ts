import { optimism } from '@/config/tokens/optimism';
const basic = {
  name: 'Velodrome V2',
  logo: '/assets/dapps/velodrome.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  10: {
    defaultCurrencies: {
      input: optimism['eth'],
      output: optimism['usdt']
    },
    tokens: [
      optimism['eth'],
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
      optimism['wstETH'],
      optimism['ezeth'],
      optimism['op'],
      optimism['msusd'],
      optimism['usdc.e'],
      optimism['fbomb']
    ]
  }
};

export { basic, networks };
