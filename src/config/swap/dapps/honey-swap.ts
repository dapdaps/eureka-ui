import { gnosis } from '@/config/tokens/gnosis';
import { polygon } from '@/config/tokens/polygon';

const basic = {
  name: 'Honeyswap',
  logo: '/assets/apps/honey-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  100: {
    defaultCurrencies: {
      input: gnosis['weth'],
      output: gnosis['xdai']
    },
    tokens: [gnosis['weth'], gnosis['xdai'], gnosis['gno'], gnosis['wbtc'], gnosis['donut'], gnosis['hny']]
  },
  137: {
    defaultCurrencies: {
      input: polygon['eth'],
      output: polygon['usdc']
    },
    tokens: [
      polygon['eth'],
      polygon['wbtc'],
      polygon['wmatic'],
      polygon['pcomb'],
      polygon['usdc'],
      polygon['dai'],
      polygon['usdt']
    ]
  }
};

export { basic, networks };
