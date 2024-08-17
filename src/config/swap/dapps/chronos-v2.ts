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
    factoryAddress: "0x4Db9D624F67E00dbF8ef7AE0e0e8eE54aF1dee49",
    routerAddress: "0xE0aBdFD837D451640CF43cB1Ec4eE87976eFbb41",
    quoterAddress: "0x6E7f0Ca45171a4440c0CDdF3A46A8dC5D4c2d4A0",
    uniType: "v3",
  },
};

export { basic, networks };
