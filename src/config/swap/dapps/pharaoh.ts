import { avalanche } from '@/config/tokens/avalanche';

const basic = {
  name: 'Pharaoh',
  logo: '/images/apps/pharaoh.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  43114: {
    defaultCurrencies: {
      input: avalanche['eth'],
      output: avalanche['usdc'],
    },
    tokens: [
      avalanche['avax'],
      avalanche['wavax'],
      avalanche['usdc'],
      avalanche['usdt'],
      avalanche['usdc.e'],
      avalanche['usdt.e'],
      // avalanche['phar'],
      avalanche['dai.e'],
      avalanche['eth'],
      avalanche['btc.b'],
      avalanche['wbtc.e'],
    ],
  },
};

export { basic, networks };
