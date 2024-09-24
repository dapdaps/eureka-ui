import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'Ramses V2',
  logo: '/images/apps/ramses.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  42161: {
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['ram']
    },
    tokens: [
      arbitrum['eth'],
      arbitrum['ram'],
      arbitrum['weth'],
      arbitrum['rseth'],
      arbitrum['ethx'],
      arbitrum['usdc'],
      arbitrum['usdc.e'],
      arbitrum['usdt'],
      arbitrum['zro'],
      arbitrum['ezeth'],
      arbitrum['wst-eth'],
      arbitrum['wbtc'],
      arbitrum['arb'],
      arbitrum['frax'],
      arbitrum['we-eth'],
      arbitrum['uniETH'],
      arbitrum['frxeth'],
      arbitrum['aleth'],
      arbitrum['sfrxETH'],
      arbitrum['alusd'],
      arbitrum['osETH'],
      arbitrum['dola'],
      arbitrum['abcRAM'],
      arbitrum['usde'],
      arbitrum['USDx'],
      arbitrum['grai'],
      arbitrum['comp'],
      arbitrum['ichi'],
      arbitrum['EUROs'],
      arbitrum['agEUR'],
      arbitrum['psm'],
      arbitrum['lusd'],
      arbitrum['lqdr'],
      arbitrum['tarot'],
      arbitrum['pool'],
      arbitrum['usdfi'],
      arbitrum['fly-wheel'],
      arbitrum['pendle']
    ]
  }
};

export { basic, networks };
