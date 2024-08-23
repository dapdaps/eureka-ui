import { bsc } from '@/config/tokens/bsc';

const basic = {
  name: 'Orion',
  logo: '/images/apps/orion.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  56: {
    defaultCurrencies: {
      input: bsc['orn'],
      output: bsc['usdt'],
    },
    tokens: [
      bsc['orn'],
      bsc['usdt'],
      bsc['eth'],
      bsc['bnb'],
      bsc['btc'],
      bsc['busd'],
      bsc['inj'],
      bsc['coti'],
      bsc['egld'],

      bsc['usdc'],
    ],
  },
};

export { basic, networks };
