import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'FusionX V3',
  logo: '/assets/apps/fusion-v3.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  5000: {
    defaultCurrencies: {
      input: mantle['weth'],
      output: mantle['usdc']
    },
    tokens: [
      mantle['weth'],
      mantle['usdc'],
      mantle['mnt'],
      mantle['usdt'],
      mantle['wbtc'],
      mantle['wmnt'],
      mantle['meth'],
      mantle['axlusdc'],
      mantle['minu']
    ]
  }
};

export { basic, networks };
