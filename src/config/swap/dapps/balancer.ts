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
    defaultCurrencies: {
      input: polygonZkevm['weth'],
      output: polygonZkevm['reth'],
    },
    tokens: [
      polygonZkevm['weth'],
      polygonZkevm['reth'],
      polygonZkevm['usdc.e'],
      polygonZkevm['dai2'],
      polygonZkevm['gyd'],
      polygonZkevm['aura'],
      polygonZkevm['wsteth'],
      polygonZkevm['rseth'],
      polygonZkevm['usdt'],
      polygonZkevm['bal'],
      polygonZkevm['ankreth'],
      polygonZkevm['matic'],
    ],
  },
  8453: {
    defaultCurrencies: {
      input: base['weth'],
      output: base['reth'],
    },
    tokens: [
      base['weth'],
      base['reth'],
      base['aura'],
      base['usdc'],
      base['weeth'],
      base['olas'],
      base['cbeth'],
      base['axlbal'],
      base['bal'],
      base['tbtc'],
      base['tag'],
      base['usdbc'],
    ],
  },
  100: {
    defaultCurrencies: {
      input: gnosis['wsteth'],
      output: gnosis['gno'],
    },
    tokens: [
      gnosis['wsteth'],
      gnosis['gno'],
      gnosis['weth'],
      gnosis['sDAI'],
      gnosis['eure'],
      gnosis['rETH'],
      gnosis['osGNO'],
      gnosis['wbtc'],
      gnosis['OLAS'],
      gnosis['wxdai'],
      gnosis['COW'],
    ],
  },
};

export { basic, networks };
