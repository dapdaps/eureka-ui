import { base } from '@/config/tokens/base';

const basic = {
  name: 'BaseSwap',
  logo: '/images/apps/base-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};

const networks = {
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['axlusdc'],
    },
    tokens: [base['eth'], base['axlusdc'], base['cbeth'], base['weth'], base['bswap'], base['dai'], base['usdbc']],
  },
};

export { basic, networks };
