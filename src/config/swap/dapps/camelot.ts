import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'Camelot',
  logo: '/images/apps/camelot.png',
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
      arbitrum['grail'],
      arbitrum['arb'],
      arbitrum['usdc.e'],
      arbitrum['usdc'],
      arbitrum['usdt'],
      arbitrum['fctr'],
      arbitrum['winr'],
      arbitrum['pendle'],
      arbitrum['gmx'],
      arbitrum['trove'],
      arbitrum['jones dao'],
    ],
  },
};

export { basic, networks };
