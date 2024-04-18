import { mantle } from '@/config/tokens/mantle';
import { base } from '@/config/tokens/base';

const basic = {
  name: 'Velocimeter V2',
  logo: '/images/apps/velocimeter.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  5000: {
    defaultCurrencies: {
      input: mantle['weth'],
      output: mantle['usdc'],
    },
    tokens: [
      mantle['usdt'],
      mantle['mnt'],
      mantle['wmnt'],
      mantle['weth'],
      mantle['wbtc'],
      mantle['usdc'],
      mantle['lusd'],
      mantle['mvm'],
    ],
  },
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['usdbc'],
    },
    tokens: [
      base['weth'],
      base['eth'],
      base['bvm'],
      base['usdc'],
      base['bmx'],
      base['axlusdc'],
      base['usdbc'],
      base['dai'],
      base['cbeth'],
    ],
  },
};

export { basic, networks };
