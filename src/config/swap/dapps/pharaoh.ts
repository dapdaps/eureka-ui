import { avalanche } from '@/config/tokens/avalanche';

const basic = {
  name: 'Pharaoh',
  logo: '/assets/apps/pharaoh.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  43114: {
    defaultCurrencies: {
      input: avalanche['avax'],
      output: avalanche['usdc']
    },
    tokens: [
      avalanche['avax'],
      avalanche['gg-avax'],
      avalanche['eth'],
      avalanche['savax'],
      avalanche['btc.b'],
      avalanche['usdc'],
      avalanche['phar'],
      avalanche['usdc.e'],
      avalanche['frax'],
      avalanche['usdt'],
      avalanche['usdt.e'],
      avalanche['ggp'],
      avalanche['a-usd'],
      avalanche['abc-phar'],
      avalanche['swol'],
      avalanche['zro'],
      avalanche['wavax'],
      avalanche['dai.e'],
      avalanche['eth'],
      avalanche['btc.b'],
      avalanche['wbtc.e'],
      avalanche['weth.e'],
      avalanche['bnUSD'],
      avalanche['kimbo'],
      avalanche['coq'],
      avalanche['sicko'],
      avalanche['hefe']
    ]
  }
};

export { basic, networks };
