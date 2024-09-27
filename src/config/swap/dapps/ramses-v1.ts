import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'Ramses V1',
  logo: '/assets/dapps/ramses.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  42161: {
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['usdc.e']
    },
    tokens: [
      arbitrum['fba'],
      arbitrum['usdc.e'],
      arbitrum['frax'],
      arbitrum['alusd'],
      arbitrum['mai'],
      arbitrum['dai+'],
      arbitrum['eth'],
      arbitrum['usd+']
    ]
  }
};

export { basic, networks };
