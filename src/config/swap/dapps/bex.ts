import { beraB } from '@/config/tokens/bera-bArtio';

const basic = {
  name: 'BEX',
  logo: ''
};
const networks = {
  80084: {
    routerAddress: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    defaultCurrencies: {
      input: beraB['bera'],
      output: beraB['honey']
    },
    tokens: [
      beraB['bera'],
      beraB['wbera'],
      beraB['honey'],
      beraB['usdt'],
      beraB['usdc'],
      beraB['dai'],
      beraB['wbtc'],
      beraB['weth']
    ]
  }
};

export { basic, networks };
