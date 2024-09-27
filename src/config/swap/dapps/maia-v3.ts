import { metis } from '@/config/tokens/metis';

const basic = {
  name: 'Maia V3',
  logo: '/assets/apps/maia.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  1088: {
    defaultCurrencies: {
      input: metis['eth'],
      output: metis['m.usdc']
    },
    tokens: [metis['eth'], metis['m.usdc'], metis['metis']]
  }
};

export { basic, networks };
