import { blast } from '@/config/tokens/blast';
const basic = {
  name: 'MonoSwap V3',
  logo: '/assets/apps/monoswap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  81457: {
    defaultCurrencies: {
      input: blast['eth'],
      output: blast['usdb']
    },
    tokens: [blast['eth'], blast['weth'], blast['usdb'], blast['blste'], blast['musd'], blast['xmomo']]
  }
};

export { basic, networks };
