import { blast } from '@/config/tokens/blast';
const basic = {
  name: 'Fenix Finance',
  logo: '/images/apps/fenix.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  81457: {
    defaultCurrencies: {
      input: blast['eth'],
      output: blast['usdb'],
    },
    tokens: [blast['eth'], blast['weth'], blast['usdb'], blast['wbtc'], blast['deus'], blast['pxeth'], blast['usd+']],
  },
};

export { basic, networks };
