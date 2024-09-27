import { mode } from '@/config/tokens/mode';

const basic = {
  name: 'SwapMode',
  logo: '/assets/dapps/swap-mode.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  34443: {
    defaultCurrencies: {
      input: mode['eth'],
      output: mode['usdt']
    },
    tokens: [
      mode['eth'],
      mode['weth'],
      mode['usdc'],
      mode['usdt'],
      mode['ezeth'],
      mode['wbtc'],
      mode['we-eth'],
      mode['m-btc'],
      mode['we-eth.mode']
    ]
  }
};

export { basic, networks };
