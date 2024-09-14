import { base } from '@/config/tokens/base';

const basic = {
  name: 'RocketSwap',
  logo: '/images/apps/rocket-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};

const networks = {
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['rckt']
    },
    tokens: [base['eth'], base['rckt'], base['higher'], base['weth']]
  }
};

export { basic, networks };
