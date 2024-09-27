import { blast } from '@/config/tokens/blast';
const basic = {
  name: 'BladeSwap',
  logo: '/assets/dapps/blade-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  81457: {
    defaultCurrencies: {
      input: blast['eth'],
      output: blast['usdb']
    },
    tokens: [
      blast['eth'],
      blast['weth'],
      blast['usdb'],
      blast['blade'],
      blast['ezeth'],
      blast['up'],
      blast['wbtc'],
      blast['flap'],
      blast['we-eth'],
      blast['$hoge'],
      blast['aso'],
      blast['ve-blade'],
      blast['usd+']
    ]
  }
};

export { basic, networks };
