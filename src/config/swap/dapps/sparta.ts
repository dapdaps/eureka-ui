import { arbitrum } from '@/config/tokens/arbitrum';
const basic = {
  name: 'Spartadex',
  logo: '/images/apps/sparta.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  42161: {
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['usdc.e']
    },
    tokens: [
      arbitrum['eth'],
      arbitrum['weth'],
      arbitrum['usdc.e'],
      arbitrum['sparta'],
      arbitrum['arb'],
      arbitrum['wbtc'],
      arbitrum['usdt'],
      arbitrum['gswift'],
      arbitrum['usdc'],
      arbitrum['star']
    ]
  }
};

export { basic, networks };
