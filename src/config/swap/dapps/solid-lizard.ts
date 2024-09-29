import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'SolidLizard',
  logo: '/assets/dapps/solid-lizard.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};

const networks = {
  42161: {
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['usdt']
    },
    tokens: [
      arbitrum['eth'],
      arbitrum['weth'],
      arbitrum['usdt'],
      arbitrum['usdc.e'],
      arbitrum['sliz'],
      arbitrum['dai'],
      arbitrum['arb'],
      arbitrum['wbtc']
    ]
  }
};

export { basic, networks };
