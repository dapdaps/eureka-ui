import { bsc } from '@/config/tokens/bsc';
const basic = {
  name: 'THENA V1',
  logo: '/images/apps/thena.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  56: {
    defaultCurrencies: {
      input: bsc['bnb'],
      output: bsc['the'],
    },
    tokens: [
      bsc['bnb'],
      bsc['the'],
      bsc['eth'],
      bsc['wsteth'],
      bsc['btcb'],
      bsc['bnbx'],
      bsc['ankrbnb'],
      bsc['usdt'],
      bsc['ftm'],
      bsc['usdc'],
      bsc['weeth'],
      bsc['ankr-eth'],

      bsc['bscusd'],
      bsc['livethe'],
      bsc['frxeth'],
      bsc['stkbnb'],
      bsc['slisBNB'],
    ],
  },
};

export { basic, networks };
