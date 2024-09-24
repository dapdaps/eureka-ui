import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'HorizonDEX',
  logo: '/images/apps/horizon-dex.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc']
    },
    tokens: [linea['eth'], linea['usdc'], linea['weth'], linea['busd']]
  }
};

export { basic, networks };
