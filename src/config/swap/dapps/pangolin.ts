import { avalanche } from '@/config/tokens/avalanche';

const basic = {
  name: 'Pangolin',
  logo: '/images/apps/pangolin.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  43114: {
    defaultCurrencies: {
      input: avalanche['usdc'],
      output: avalanche['avax']
    },
    tokens: [
      avalanche['usdc'],
      avalanche['avax'],
      avalanche['png'],
      avalanche['xava'],
      avalanche['eth'],
      avalanche['yak'],
      avalanche['qi'],
      avalanche['usdc.e'],
      avalanche['usdt'],
      avalanche['link.e'],
      avalanche['usdt.e'],
      avalanche['wbtc.e'],
      avalanche['savax'],
      avalanche['dai.e'],
      avalanche['wavax'],
      avalanche['weth.e'],
      avalanche['ampl']
    ]
  }
};

export { basic, networks };
