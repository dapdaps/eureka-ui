import { blast } from '@/config/tokens/blast';
const basic = {
  name: 'Thruster Finance',
  logo: '/images/apps/thruster-finance.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  81457: {
    defaultCurrencies: {
      input: blast['eth'],
      output: blast['usdb'],
    },
    tokens: [
      blast['eth'],
      blast['usdb'],
      blast['weth'],
      blast['yes'],
      blast['ezeth'],
      blast['mwstETH-WPUNKS:20'],
      blast['mwstETH-WPUNKS:40'],
      blast['wrseth'],
      blast['orbit'],
      blast['axlusdc'],
      blast['usde'],
      blast['baja'],
      blast['andy'],
      blast['yield'],
      blast['kap'],
      blast['early'],
      blast['sss'],
      blast['juice'],
    ],
  },
};

export { basic, networks };
