import { base } from '@/config/tokens/base';

const basic = {
  name: 'RocketSwap',
  logo: '/images/apps/rocket-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};

const networks = {
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['axlusdc'],
    },
    tokens: [base['eth'], base['axlusdc'], base['rckt'], base['weth'], base['bald'], base['base']],
  },
};

export { basic, networks };
