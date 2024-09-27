import { blast } from '@/config/tokens/blast';
const basic = {
  name: 'MimSwap',
  logo: '/assets/dapps/mimswap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  81457: {
    defaultCurrencies: {
      input: blast['usdb'],
      output: blast['mim']
    },
    tokens: [blast['usdb'], blast['mim']]
  }
};

export { basic, networks };
