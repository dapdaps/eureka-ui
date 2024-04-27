import { bsc } from '@/config/tokens/bsc';
const basic = {
  name: 'THENA V1',
  logo: '/images/apps/thena.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  56: {
    defaultCurrencies: {
      input: bsc['eth'],
      output: bsc['usdc'],
    },
    tokens: [
      bsc['bnb'],
      bsc['the'],
      bsc['bscusd'],
      bsc['livethe'],
      bsc['ankrbnb'],
      bsc['eth'],
      bsc['usdc'],
      bsc['frxeth'],
      bsc['bnbx'],
      bsc['btcb'],
      bsc['stkbnb'],
    ],
  },
};

export { basic, networks };
