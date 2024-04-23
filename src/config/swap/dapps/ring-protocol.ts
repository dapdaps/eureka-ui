import { blast } from '@/config/tokens/blast';

const basic = {
  name: 'Ring Protocol',
  logo: '/images/apps/ring-protocol.png',
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
      blast['weth'],
      blast['usdb'],
      blast['wbtc'],
      blast['orbit'],
      blast['juice'],
      blast['dbz'],
      blast['omni'],
    ],
  },
};

export { basic, networks };
