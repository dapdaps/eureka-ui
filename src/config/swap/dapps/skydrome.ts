import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Skydrome',
  logo: '/images/apps/skydrome.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  534352: {
    defaultCurrencies: {
      input: scroll['weth'],
      output: scroll['usdt'],
    },
    tokens: [
      scroll['usdt'],
      scroll['weth'],
      scroll['usdc'],
      scroll['wbtc'],
      scroll['sky'],
      scroll['IZI'],
      scroll['soi'],
    ],
  },
};

export { basic, networks };
