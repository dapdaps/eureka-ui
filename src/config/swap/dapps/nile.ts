import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Nile',
  logo: '/images/apps/1.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc'],
    },
    tokens: [
      linea['eth'],
      linea['weth'],
      linea['weeth'],
      linea['wrseth'],
      linea['ezeth'],
      linea['usdc'],
      linea['usdt'],
      linea['wbtc'],
      linea['dai'],
      linea['axlusdc'],
      linea['wsteth'],
    ],
  },
};

export { basic, networks };
