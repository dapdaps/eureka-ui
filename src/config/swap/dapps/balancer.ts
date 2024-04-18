import { polygonZkevm } from '@/config/tokens/polygonZkevm';
import { base } from '@/config/tokens/base';
import { gnosis } from '@/config/tokens/gnosis';

const basic = {
  name: 'Balancer',
  logo: '/images/apps/balancer.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  1101: {
    routerAddress: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
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
    routerAddress: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    defaultCurrencies: {
      input: base['eth'],
      output: base['usdc'],
    },
    tokens: [base['eth'], base['usdc'], base['weth'], base['usdbc'], base['dai'], base['cbeth']],
  },
  100: {
    routerAddress: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
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
