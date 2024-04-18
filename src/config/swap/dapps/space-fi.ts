import { zkSync } from '@/config/tokens/zkSync';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'SpaceFi',
  logo: '/images/apps/space-fi.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  324: {
    defaultCurrencies: {
      input: zkSync['eth'],
      output: zkSync['usdc'],
    },
    tokens: [
      zkSync['eth'],
      zkSync['usdc'],
      zkSync['wbtc'],
      zkSync['space'],
      zkSync['cebnb'],
      zkSync['usdt'],
      zkSync['cebusd'],
    ],
  },
  534352: {
    factoryAddress: '0x6cC370Ed99f1C11e7AC439F845d0BA6aed55cf50',
    routerAddress: '0x18b71386418A9FCa5Ae7165E31c385a5130011b6',
    defaultCurrencies: {
      input: scroll['weth'],
      output: scroll['usdc'],
    },
    tokens: [
      scroll['weth'],
      scroll['usdc'],
      scroll['usdt'],
      scroll['lusd'],
      scroll['reth'],
      scroll['aave'],
      scroll['crv'],
      scroll['wbtc'],
    ],
  },
};

export { basic, networks };
