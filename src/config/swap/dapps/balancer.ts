import { base } from '@/config/tokens/base';
import { gnosis } from '@/config/tokens/gnosis';
import { polygonZkevm } from '@/config/tokens/polygonZkevm';

const basic = {
  name: 'Balancer',
  logo: '/images/apps/balancer.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  1101: {
    defaultCurrencies: {
      input: polygonZkevm['eth'],
      output: polygonZkevm['usdc'],
    },
    tokens: [
      polygonZkevm['eth'],
      polygonZkevm['usdc'],
      polygonZkevm['weth'],
      polygonZkevm['wbtc'],
      polygonZkevm['matic'],
      polygonZkevm['usdt'],
      polygonZkevm['dai'],
    ],
  },
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['usdc'],
    },
    tokens: [base['eth'], base['usdc'], base['weth'], base['usdbc'], base['dai'], base['cbeth']],
  },
  100: {
    defaultCurrencies: {
      input: gnosis['weth'],
      output: gnosis['wxdai'],
    },
    tokens: [
      gnosis['xdai'],
      gnosis['wxdai'],
      gnosis['BAL'],
      gnosis['weth'],
      gnosis['usdc'],
      gnosis['usdt'],
      gnosis['wsteth'],
      gnosis['dai'],
      gnosis['sDAI'],
      gnosis['gno'],
    ],
  },
};

export { basic, networks };
