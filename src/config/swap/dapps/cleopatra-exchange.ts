import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'Cleopatra Exchange',
  logo: '/assets/apps/cleopatra.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  5000: {
    defaultCurrencies: {
      input: mantle['weth'],
      output: mantle['usdc']
    },
    tokens: [
      mantle['usdt'],
      mantle['mnt'],
      mantle['wmnt'],
      mantle['weth'],
      mantle['usdc'],
      mantle['cleo'],
      mantle['lusd'],
      mantle['meth'],
      mantle['fbtc'],
      mantle['ausd']
    ]
  }
};

export { basic, networks };
