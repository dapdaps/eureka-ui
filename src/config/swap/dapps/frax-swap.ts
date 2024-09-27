import { optimism } from '@/config/tokens/optimism';
const basic = {
  name: 'Frax Swap',
  logo: '/assets/dapps/frax.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  10: {
    defaultCurrencies: {
      input: optimism['weth'],
      output: optimism['frax']
    },
    tokens: [optimism['weth'], optimism['frax'], optimism['fxs']]
  }
};

export { basic, networks };
