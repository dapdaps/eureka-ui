import { base } from '@/config/tokens/base';

const basic = {
  name: 'Aerodrome',
  logo: '/images/apps/aerodrome.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};

const networks = {
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['aero'],
    },
    tokens: [
      base['eth'],
      base['aero'],
      base['usdc'],
      base['weth'],
      base['dola'],
      base['usd-z'],
      base['ovn'],
      base['usd+'],
      base['usdbc'],
      base['usdc+'],
      base['cbeth'],
      base['wsteth'],
      base['usdt'],
      base['mai'],
      base['weeth'],

      base['dai'],
    ],
  },
};

export { basic, networks };
