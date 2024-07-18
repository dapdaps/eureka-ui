import { scroll } from '@/config/tokens/scroll';
import { blast } from '@/config/tokens/blast';

const basic = {
  name: 'Ambient',
  logo: '/images/apps/ambient.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmbientAmountOut',
};
const networks = {
  534352: {
    routerAddress: '0xaaaaAAAACB71BF2C8CaE522EA5fa455571A74106',
    quoterAddress: '0xc2c301759B5e0C385a38e678014868A33E2F3ae3',
    defaultCurrencies: {
      input: scroll['usdc'],
      output: scroll['usdt'],
    },
    tokens: [scroll['pxeth'], scroll['usdt'], scroll['eth'], scroll['usdc'], scroll['wbtc']],
  },
  81457: {
    routerAddress: '0xaAaaaAAAFfe404EE9433EEf0094b6382D81fb958',
    quoterAddress: '0x6A699AB45ADce02891E6115b81Dfb46CAa5efDb9',
    defaultCurrencies: {
      input: blast['eth'],
      output: blast['usdb'],
    },
    tokens: [
      blast['eth'],
      blast['usdb'],
      blast['ezeth'],
      blast['orbit'],
      blast['wrseth'],
      blast['juice'],
      blast['mim'],
    ],
  },
};

export { basic, networks };
