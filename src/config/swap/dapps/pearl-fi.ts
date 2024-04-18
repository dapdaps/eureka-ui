import { polygon } from '@/config/tokens/polygon';

const basic = {
  name: 'PearlFi',
  logo: '/images/apps/pearl-fi.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  137: {
    defaultCurrencies: {
      input: polygon['eth'],
      output: polygon['usdc'],
    },
    tokens: [
      polygon['eth'],
      polygon['usdc'],
      polygon['usdr'],
      polygon['dai'],
      polygon['wusdr'],
      polygon['usdt'],
      polygon['matic'],
      polygon['cvr'],
      polygon['pearl'],
    ],
  },
};

export { basic, networks };
