import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'veSync',
  logo: '/assets/dapps/ve-sync.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  324: {
    defaultCurrencies: {
      input: zkSync['eth'],
      output: zkSync['usdc.e']
    },
    tokens: [zkSync['eth'], zkSync['usdc.e'], zkSync['vs']]
  }
};

export { basic, networks };
