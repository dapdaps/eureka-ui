import { avalanche } from '@/config/tokens/avalanche';

const basic = {
  name: 'Pangolin',
  logo: '/images/apps/pangolin.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  43114: {
    defaultCurrencies: {
      input: avalanche['eth'],
      output: avalanche['usdc.e'],
    },
    tokens: [
      avalanche['avax'],
      avalanche['usdc.e'],
      avalanche['dai.e'],
      avalanche['usdt.e'],
      avalanche['eth'],
      avalanche['wavax'],
      avalanche['wbtc.e'],
    ],
  },
};

export { basic, networks };
