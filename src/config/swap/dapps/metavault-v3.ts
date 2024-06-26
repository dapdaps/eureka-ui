import { scroll } from '@/config/tokens/scroll';
import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Metavault V3',
  logo: '/images/apps/metavault.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  534352: {
    defaultCurrencies: {
      input: scroll['weth'],
      output: scroll['usdt'],
    },
    tokens: [scroll['usdt'], scroll['weth'], scroll['usdc'], scroll['lusd'], scroll['wbtc']],
  },
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc'],
    },
    tokens: [
      linea['dai'],
      linea['eth'],
      linea['weth'],
      linea['usdt'],
      linea['usdc'],
      linea['wbtc'],
      linea['bnb'],
      linea['cebusd'],
      linea['matic'],
    ],
  },
};

export { basic, networks };
