import { linea } from '@/config/tokens/linea';
import { scroll } from '@/config/tokens/scroll';
import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'SyncSwap',
  logo: '/images/apps/sync-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc']
    },
    tokens: [
      linea['eth'],
      linea['usdc'],
      linea['usdt'],
      linea['wbtc'],
      linea['matic'],
      linea['dai'],
      linea['bnb'],
      linea['ezeth'],
      linea['weeth'],
      linea['wsteth'],
      linea['wrseth'],
      linea['cebusd'],
      linea['stone']
    ]
  },
  324: {
    defaultCurrencies: {
      input: zkSync['eth'],
      output: zkSync['usdc']
    },
    tokens: [
      zkSync['eth'],
      zkSync['usdc'],
      zkSync['usdt'],
      zkSync['wbtc'],
      zkSync['cebusd'],
      zkSync['dvf'],
      zkSync['lusd'],
      zkSync['reth'],
      zkSync['usdc.e'],
      zkSync['zk'],
      zkSync['wsteth'],
      zkSync['wrseth'],
      zkSync['dai']
    ]
  },
  534352: {
    defaultCurrencies: {
      input: scroll['eth'],
      output: scroll['usdc']
    },
    tokens: [
      scroll['eth'],
      scroll['weth'],
      scroll['usdt'],
      scroll['dai'],
      scroll['wbtc'],
      scroll['usdc'],
      scroll['wsteth'],
      scroll['lusd'],
      scroll['reth'],
      scroll['wrseth'],
      scroll['stone'],
      scroll['we-eth'],
      scroll['pufETH'],
      scroll['reth'],
      scroll['sis'],
      scroll['itp']
    ]
  }
};

export { basic, networks };
