import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'Agni Finance',
  logo: '/images/apps/agni-finance.png',
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
      mantle['wmnt'],
      mantle['meth'],
      mantle['fbtc'],
      mantle['usdy']
    ]
  }
};

export { basic, networks };
