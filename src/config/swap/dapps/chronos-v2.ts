import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'Chronos V2',
  logo: '/images/apps/chronos.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  42161: {
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['usdc'],
    },
    tokens: [
      arbitrum['eth'],
      arbitrum['wusdrv3'],
      arbitrum['usdc'],
      arbitrum['frax'],
      arbitrum['usd+'],
      arbitrum['chr'],
      arbitrum['usdc.e'],
      arbitrum['weth'],
      arbitrum['deus'],
      arbitrum['arb'],
      arbitrum['dai+'],
    ],
  },
};

export { basic, networks };
