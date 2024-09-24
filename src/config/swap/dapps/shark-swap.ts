import { base } from '@/config/tokens/base';

const basic = {
  name: 'SharkSwap',
  logo: '/images/apps/shark-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};

const networks = {
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['usdbc']
    },
    tokens: [base['weth'], base['eth'], base['usdbc'], base['dai']]
  }
};

export { basic, networks };
