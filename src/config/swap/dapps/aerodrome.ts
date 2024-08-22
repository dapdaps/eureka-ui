import { base } from '@/config/tokens/base';

const basic = {
  name: 'Aerodrome',
  logo: '/images/apps/aerodrome.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};

const networks = {
  8453: {
    defaultCurrencies: {
      input: base['weth'],
      output: base['usdc'],
    },
    tokens: [
      base['weth'],
      base['cbeth'],
      base['aero'],
      base['usdc'],
      base['dai'],
      base['dola'],
      base['mai'],
      base['usdbc'],
      base['eth'],
    ],
  },
};

export { basic, networks };
