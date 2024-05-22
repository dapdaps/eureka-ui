import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'Ramses V2',
  logo: '/images/apps/ramses.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  42161: {
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['usdt'],
    },
    tokens: [
      arbitrum['eth'],
      arbitrum['weth'],
      arbitrum['usdc'],
      arbitrum['usdt'],
      arbitrum['arb'],
      arbitrum['ram'],
      arbitrum['frax'],
    ],
  },
};

export { basic, networks };
