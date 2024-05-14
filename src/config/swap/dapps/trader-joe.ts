import { avalanche } from '@/config/tokens/avalanche';
import { bsc } from '@/config/tokens/bsc';
const basic = {
  name: 'Trader Joe',
  logo: '/images/apps/trader-joe.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  43114: {
    defaultCurrencies: {
      input: avalanche['eth'],
      output: avalanche['usdt.e'],
    },
    tokens: [
      avalanche['avax'],
      avalanche['usdc.e'],
      avalanche['dai.e'],
      avalanche['usdt.e'],
      avalanche['eth'],
      avalanche['wavax'],
      avalanche['wbtc.e'],
    ],
  },
  56: {
    defaultCurrencies: {
      input: bsc['bnb'],
      output: bsc['usdc'],
    },
    tokens: [bsc['btcb'], bsc['bnb'], bsc['busd'], bsc['usdt'], bsc['eth'], bsc['usdc']],
  },
};

export { basic, networks };
