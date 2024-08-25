import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Zebra',
  logo: '/images/apps/zebra.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  534352: {
    defaultCurrencies: {
      input: scroll['eth'],
      output: scroll['usdc'],
    },
    tokens: [
      scroll['usdc'],
      scroll['dai'],
      scroll['eth'],
      scroll['weth'],
      scroll['reth'],
      scroll['aave'],
      scroll['crv'],
      scroll['lusd'],
      scroll['wsteth'],
      scroll['usdt'],
      scroll['wbtc'],
      scroll['wrseth'],
      scroll['stone'],
      scroll['we-eth'],
    ],
  },
};

export { basic, networks };
