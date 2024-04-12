import { blast } from '@/config/tokens/blast';
import multicall from '@/config/contract/multicall';

const basic = {
  name: 'Ring Protocol',
  logo: '/images/apps/ring-protocol.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.RingProtocol',
};
const networks = {
  81457: {
    fewFactoryAddress: '0x455b20131D59f01d082df1225154fDA813E8CeE9',
    routerAddress: '0x7001F706ACB6440d17cBFaD63Fa50a22D51696fF',
    multicallAddress: multicall[81457],
    defaultCurrencies: {
      input: blast['eth'],
      output: blast['usdb'],
    },
    tokens: [
      blast['eth'],
      blast['weth'],
      blast['usdb'],
      blast['wbtc'],
      blast['orbit'],
      blast['juice'],
      blast['dbz'],
      blast['omni'],
    ],
  },
};

export { basic, networks };
