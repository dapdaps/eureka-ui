import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Xfai',
  logo: '/images/apps/xfai.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc'],
    },
    tokens: [
      linea['xfit'],
      linea['usdc'],
      linea['eth'],
      linea['weth'],
      linea['wbtc'],
      linea['usdt'],
      linea['dai'],
      linea['wsteth'],
    ],
  },
};

export { basic, networks };
