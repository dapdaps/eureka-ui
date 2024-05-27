import { blast } from '@/config/tokens/blast';
const basic = {
  name: 'BladeSwap',
  logo: '/images/apps/1.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  81457: {
    defaultCurrencies: {
      input: blast['eth'],
      output: blast['usdb'],
    },
    tokens: [
      blast['eth'],
      blast['weth'],
      blast['usdb'],
      blast['blade'],
      blast['ezeth'],
      blast['ve-blade'],
      blast['aso'],
      blast['mclb'],
    ],
  },
};

export { basic, networks };
