import { mode } from '@/config/tokens/mode';

const basic = {
  name: 'KimExchange',
  logo: '/images/apps/kim-exchange.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  34443: {
    defaultCurrencies: {
      input: mode['eth'],
      output: mode['usdt'],
    },
    tokens: [
      mode['eth'],
      mode['weth'],
      mode['usdc'],
      mode['usdt'],
      mode['kim'],
      mode['ezeth'],
      mode['we-eth'],
      mode['m-btc'],
      mode['wbtc'],
      mode['stone'],
    ],
  },
};

export { basic, networks };
