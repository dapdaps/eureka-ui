import { mode } from '@/config/tokens/mode';

const basic = {
  name: 'SupSwap',
  logo: '/assets/dapps/sup-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  34443: {
    defaultCurrencies: {
      input: mode['eth'],
      output: mode['usdt']
    },
    tokens: [mode['eth'], mode['weth'], mode['mode'], mode['usdc'], mode['usdt'], mode['ezeth'], mode['m-btc']]
  }
};

export { basic, networks };
