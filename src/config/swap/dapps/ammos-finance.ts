import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'Ammos Finance',
  logo: '/assets/dapps/ammos-finance.png',
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
      mantle['dai']
    ]
  }
};

export { basic, networks };
