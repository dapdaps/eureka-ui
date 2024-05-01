import { bsc } from '@/config/tokens/bsc';

const basic = {
  name: 'Orion',
  logo: '/images/apps/orion.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  56: {
    defaultCurrencies: {
      input: bsc['eth'],
      output: bsc['usdc'],
    },
    tokens: [bsc['eth'], bsc['bnb'], bsc['inj'], bsc['orn'], bsc['usdt'], bsc['busd'], bsc['usdc']],
  },
};

export { basic, networks };
