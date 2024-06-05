import { base } from '@/config/tokens/base';
import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'HorizonDEX',
  logo: '/images/apps/horizon-dex.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['axlusdc'],
    },
    tokens: [
      base['hzn'],
      base['weth'],
      base['cbeth'],
      base['eth'],
      base['dai'],
      base['axlusdc'],
      base['usdbc'],
      base['bswap'],
      base['bald'],
    ],
  },
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc'],
    },
    tokens: [
      linea['eth'],
      linea['usdc'],
      linea['weth'],
      linea['axlusdc'],
      linea['axlusdt'],
      linea['hzn'],
      linea['busd'],
      linea['bnb'],
    ],
  },
};

export { basic, networks };
