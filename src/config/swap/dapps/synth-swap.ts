import { base } from '@/config/tokens/base';

const basic = {
  name: 'Synthswap',
  logo: '/assets/dapps/synth-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};

const networks = {
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['dai']
    },
    tokens: [base['eth'], base['synth'], base['usdc'], base['weth'], base['dai']]
  }
};

export { basic, networks };
