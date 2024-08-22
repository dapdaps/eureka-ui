import { arbitrum } from '@/config/tokens/arbitrum';
import { base } from '@/config/tokens/base';
import { gnosis } from '@/config/tokens/gnosis';
import { linea } from '@/config/tokens/linea';
import { optimism } from '@/config/tokens/optimism';
import { polygon } from '@/config/tokens/polygon';
import { polygonZkevm } from '@/config/tokens/polygonZkevm';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'SushiSwap',
  logo: '/images/apps/sushi.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};

const networks = {
  42161: {
    defaultCurrencies: {
      input: arbitrum['weth'],
      output: arbitrum['usdt'],
    },
    tokens: [
      arbitrum['eth'],
      arbitrum['weth'],
      arbitrum['usdc'],
      arbitrum['usdc.e'],
      arbitrum['usdt'],
      arbitrum['dai'],
      arbitrum['arb'],
      arbitrum['sushi'],
      arbitrum['wbtc'],
    ],
  },
  100: {
    defaultCurrencies: {
      input: gnosis['weth'],
      output: gnosis['xdai'],
    },
    tokens: [
      gnosis['gno'],
      gnosis['usdc'],
      gnosis['wxdai'],
      gnosis['weth'],
      gnosis['wbtc'],
      gnosis['usdt'],
      gnosis['sushi'],
    ],
  },
  10: {
    defaultCurrencies: {
      input: optimism['eth'],
      output: optimism['usdc.e'],
    },
    tokens: [
      optimism['op'],
      optimism['eth'],
      optimism['weth'],
      optimism['susd'],
      optimism['wbtc'],
      optimism['dai'],
      optimism['usdc'],
      optimism['usdt'],
      optimism['usdc.e'],
      optimism['lusd'],
      optimism['snx'],
      optimism['mai'],
    ],
  },
  137: {
    defaultCurrencies: {
      input: polygon['weth'],
      output: polygon['usdt'],
    },
    tokens: [
      polygon['matic'],
      polygon['wmatic'],
      polygon['wbtc'],
      polygon['weth'],
      polygon['usdc'],
      polygon['dai'],
      polygon['usdt'],
      polygon['sushi'],
    ],
  },
  1101: {
    defaultCurrencies: {
      input: polygonZkevm['eth'],
      output: polygonZkevm['usdc'],
    },
    tokens: [
      polygonZkevm['matic'],
      polygonZkevm['usdc'],
      polygonZkevm['usdt'],
      polygonZkevm['eth'],
      polygonZkevm['weth'],
      polygonZkevm['wbtc'],
      polygonZkevm['dai'],
    ],
  },
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['axlusdc'],
    },
    tokens: [linea['eth'], linea['weth'], linea['axlusdc']],
  },
  534352: {
    defaultCurrencies: {
      input: scroll['eth'],
      output: scroll['usdc'],
    },
    tokens: [scroll['eth'], scroll['weth'], scroll['usdc'], scroll['dai'], scroll['wbtc'], scroll['wsteth']],
  },
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['dai'],
    },
    tokens: [base['eth'], base['weth'], base['dai'], base['usdc'], base['usdbc'], base['axlusdc']],
  },
};

export { basic, networks };
