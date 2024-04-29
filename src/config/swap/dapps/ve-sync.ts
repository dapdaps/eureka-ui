import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'veSync',
  logo: '/images/apps/ve-sync.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  324: {
    defaultCurrencies: {
      input: zkSync['eth'],
      output: zkSync['usdt'],
    },
    tokens: [
      zkSync['eth'],
      zkSync['usdt'],
      zkSync['usdc'],
      zkSync['usx'],
      zkSync['iusd'],
      zkSync['slusdt'],
      zkSync['lusd'],
      zkSync['cebusd'],
    ],
  },
};

export { basic, networks };
