import { base } from '@/config/tokens/base';
import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'Velocimeter V2',
  logo: '/images/apps/velocimeter.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ChronosV1AmountOut'
};
const networks = {
  5000: {
    routerAddress: '0xCe30506F6c1Cea34aC704f93d51d55058791E497',
    defaultCurrencies: {
      input: mantle['weth'],
      output: mantle['usdc']
    },
    tokens: [
      mantle['usdt'],
      mantle['mnt'],
      mantle['wmnt'],
      mantle['weth'],
      mantle['wbtc'],
      mantle['usdc'],
      mantle['lusd'],
      mantle['mvm']
    ]
  },
  8453: {
    routerAddress: '0xE11b93B61f6291d35c5a2beA0A9fF169080160cF',
    defaultCurrencies: {
      input: base['eth'],
      output: base['usdbc']
    },
    tokens: [
      base['weth'],
      base['eth'],
      base['bvm'],
      base['usdc'],
      base['bmx'],
      base['cbeth'],
      base['wBLT'],
      base['ftw']
    ]
  }
};

export { basic, networks };
