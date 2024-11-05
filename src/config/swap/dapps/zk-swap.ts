import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'zkSwap Finance',
  logo: '/assets/dapps/zk-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  324: {
    defaultCurrencies: {
      input: zkSync['eth'],
      output: zkSync['usdc']
    },
    tokens: [
      zkSync['usdc'],
      zkSync['eth'],
      zkSync['weth'],
      zkSync['wbtc'],
      zkSync['cebusd'],
      zkSync['zf'],
      zkSync['usdt'],
      zkSync['velocore'],
      zkSync['zk'],
      zkSync['long'],
      zkSync['wsteth'],
      zkSync['leth'],
      zkSync['reth']
    ]
  }
};

export { basic, networks };
