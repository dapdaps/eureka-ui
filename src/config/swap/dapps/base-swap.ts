import { base } from '@/config/tokens/base';

const basic = {
  name: 'BaseSwap',
  logo: '/assets/dapps/base-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};

const networks = {
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['bswap']
    },
    tokens: [
      base['eth'],
      base['bswap'],
      base['weth'],
      base['bsx'],
      base['cbeth'],
      base['usdbc'],
      base['usdc'],
      base['dai'],
      base['tbtc'],
      base['axlusdc'],
      base['brett']
    ]
  }
};

export { basic, networks };
