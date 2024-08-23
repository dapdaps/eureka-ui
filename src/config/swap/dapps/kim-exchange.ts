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
      mode['mode'],
      mode['usdc'],
      mode['usdt'],
      mode['iusd'],
      mode['kim'],
      mode['we-eth.mode'],
      mode['wrseth'],
      mode['ezeth'],
      mode['we-eth'],
      mode['m-btc'],
      mode['wbtc'],
      mode['stone'],
      mode['mochad'],
      mode['djump'],
      mode['px-eth'],
      mode['ionx'],
    ],
  },
};

export { basic, networks };
