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
      output: arbitrum['grail'],
    },
    tokens: [
      arbitrum['eth'],
      arbitrum['pendle'],
      arbitrum['wstLINK'],
      arbitrum['link'],
      arbitrum['jones dao'],
      arbitrum['sfund'],
      arbitrum['syk'],
      arbitrum['arb'],
      arbitrum['usdc.e'],
      arbitrum['mim'],
      arbitrum['grail'],
      arbitrum['usdt'],
      arbitrum['wst-eth'],
      arbitrum['usdc'],

      arbitrum['fctr'],
      arbitrum['winr'],
      arbitrum['gmx'],
      arbitrum['trove'],
    ],
  },
};

export { basic, networks };
