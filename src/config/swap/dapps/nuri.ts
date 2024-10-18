import liquidity from '@/config/pool/dapps/nuri';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Nuri',
  logo: '/assets/dapps/1.png'
};
const networks = {
  534352: {
    defaultCurrencies: {
      input: scroll['eth'],
      output: scroll['usdc']
    },
    tokens: [
      scroll['eth'],
      scroll['weth'],
      scroll['stone'],
      scroll['usdc'],
      scroll['wsteth'],
      scroll['wrseth'],
      scroll['we-eth'],
      scroll['usdt'],
      scroll['wbtc'],
      scroll['dai'],
      scroll['pufETH']
    ]
  }
};
const { contracts, tokens, hasV2, fees, defaultFee } = liquidity;

export { basic, networks, contracts, tokens, hasV2, fees, defaultFee };
