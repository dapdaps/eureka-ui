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
      base['weth'],
      base['aero'],
      base['usdc'],
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
      base['eurc'],
      base['fbomb'],
      base['klima'],
      base['rdnt'],
      base['well'],
      base['bsd-eth'],
      base['e-usd'],
      base['tarot'],
      base['brett'],
    ],
  },
};

export { basic, networks };
