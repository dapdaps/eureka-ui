import { avalanche } from '@/config/tokens/avalanche';

const basic = {
  name: 'Trader Joe',
  logo: '/images/apps/trader-joe.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  43114: {
    defaultCurrencies: {
      input: avalanche['eth'],
      output: avalanche['usdt.e'],
    },
    tokens: [
      avalanche['avax'],
      avalanche['usdc.e'],
      avalanche['dai.e'],
      avalanche['usdt.e'],
      avalanche['eth'],
      avalanche['wavax'],
      avalanche['wbtc.e'],
      avalanche['gg-avax'],
      avalanche['savax'],
      avalanche['usdc'],
      avalanche['a-usd'],
      avalanche['weth.e'],
      avalanche['btc.b'],
      avalanche['qi'],
      avalanche['joe'],
      avalanche['zro'],
      avalanche['coq'],
      avalanche['shrap'],
      avalanche['beam'],
      avalanche['prime'],
      avalanche['alot'],
      avalanche['aleph'],
      avalanche['yak'],
    ],
  },
};

export { basic, networks };
