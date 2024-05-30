import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Secta Finance',
  logo: '/images/apps/secta-finance.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc'],
    },
    tokens: [linea['eth'], linea['weth'], linea['lube'], linea['usdc'], linea['usdt'], linea['wbtc']],
  },
};

export { basic, networks };
