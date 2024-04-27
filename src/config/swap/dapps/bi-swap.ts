import { bsc } from '@/config/tokens/bsc';

const basic = {
  name: 'Biswap',
  logo: '/images/apps/bi-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  56: {
    defaultCurrencies: {
      input: bsc['eth'],
      output: bsc['usdc'],
    },
    tokens: [bsc['eth'], bsc['bnb'], bsc['wbnb'], bsc['btcb'], bsc['bscusd'], bsc['busd'], bsc['usdc'], bsc['bsw']],
  },
};

export { basic, networks };
