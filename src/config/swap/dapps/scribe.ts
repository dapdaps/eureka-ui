import liquidity from '@/config/pool/dapps/scribe';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Scribe',
  logo: '/assets/dapps/scribe.png'
};
const networks = {
  534352: {
    defaultCurrencies: {
      input: scroll['eth'],
      output: scroll['usdc']
    },
    tokens: [scroll['eth'], scroll['weth'], scroll['usdc'], scroll['usdt'], scroll['we-eth'], scroll['stone']]
  }
};

const { contracts, tokens, hasV2, poolType } = liquidity;

export { basic, networks, contracts, tokens, hasV2, poolType };
