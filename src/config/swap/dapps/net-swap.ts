import { metis } from '@/config/tokens/metis';

const basic = {
  name: 'Netswap',
  logo: '/images/apps/net-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  1088: {
    defaultCurrencies: {
      input: metis['eth'],
      output: metis['m.usdc'],
    },
    tokens: [
      metis['eth'],
      metis['m.usdc'],
      metis['hera'],
      metis['usdt'],
      metis['metis'],
      metis['nett'],
      metis['peak'],
      metis['byte'],
      metis['m.usdt'],
      metis['weth'],
    ],
  },
};

export { basic, networks };
