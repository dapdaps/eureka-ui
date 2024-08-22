import { linea } from '@/config/tokens/linea';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'XY Finance',
  logo: '/images/apps/xy-finance.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  534352: {
    defaultCurrencies: {
      input: scroll['eth'],
      output: scroll['usdc'],
    },
    tokens: [
      scroll['weth'],
      scroll['usdc'],
      scroll['dai'],
      scroll['wbtc'],
      scroll['eth'],
      scroll['wsteth'],
      scroll['usdt'],
    ],
  },
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc'],
    },
    tokens: [linea['usdc'], linea['eth'], linea['weth'], linea['wbtc'], linea['usdt'], linea['dai'], linea['wsteth']],
  },
};

export { basic, networks };
