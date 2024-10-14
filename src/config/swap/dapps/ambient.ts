import { blast } from '@/config/tokens/blast';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Ambient',
  logo: '/assets/dapps/ambient.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  534352: {
    defaultCurrencies: {
      input: scroll['usdc'],
      output: scroll['usdt']
    },
    tokens: [
      scroll['pxeth'],
      scroll['usdt'],
      scroll['eth'],
      scroll['usdc'],
      scroll['wbtc'],
      scroll['wrseth'],
      scroll['wsteth'],
      scroll['usde'],
      scroll['sUSDe'],
      scroll['we-eth'],
      scroll['stone'],
      scroll['uniETH'],
      scroll['pufETH'],
      scroll['dai'],
      scroll['reth'],
      scroll['scribes'],
      scroll['sol'],
      scroll['axlusdc']
    ]
  },
  81457: {
    defaultCurrencies: {
      input: blast['eth'],
      output: blast['usdb']
    },
    tokens: [blast['eth'], blast['usdb'], blast['ezeth'], blast['blast'], blast['weeth']]
  }
};

export { basic, networks };
