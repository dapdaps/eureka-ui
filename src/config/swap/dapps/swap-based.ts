import { base } from '@/config/tokens/base';

const basic = {
  name: 'SwapBased',
  logo: '/images/apps/swap-based.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};

const networks = {
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['axlusdc'],
    },
    tokens: [base['eth'], base['axlusdc'], base['usdc'], base['weth'], base['bald'], base['base'], base['dai']],
  },
};

export { basic, networks };
