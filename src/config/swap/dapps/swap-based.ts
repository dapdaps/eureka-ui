import { base } from '@/config/tokens/base';

const basic = {
  name: 'SwapBased',
  logo: '/assets/apps/swap-based.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};

const networks = {
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['base']
    },
    tokens: [base['eth'], base['weth'], base['base']]
  }
};

export { basic, networks };
