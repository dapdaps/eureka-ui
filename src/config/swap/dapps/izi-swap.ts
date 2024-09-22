import { linea } from '@/config/tokens/linea';
import { manta } from '@/config/tokens/manta';
import { mantle } from '@/config/tokens/mantle';
import { mode } from '@/config/tokens/mode';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'iZiSwap',
  logo: '/images/apps/izi-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc']
    },
    tokens: [
      linea['eth'],
      linea['usdc'],
      linea['weth'],
      linea['izi'],
      linea['wbtc'],
      linea['busd'],
      linea['iusd'],
      linea['usdt'],
      linea['solv-btc'],
      linea['m-btc'],
      linea['wsteth'],
      linea['ezeth'],
      linea['foxy'],
      linea['lab'],
      linea['dai']
    ]
  },
  5000: {
    defaultCurrencies: {
      input: mantle['weth'],
      output: mantle['usdc']
    },
    tokens: [
      mantle['weth'],
      mantle['usdc'],
      mantle['mnt'],
      mantle['usdt'],
      mantle['wbtc'],
      mantle['wmnt'],
      mantle['meth'],
      mantle['izi']
    ]
  },
  169: {
    defaultCurrencies: {
      input: manta['weth'],
      output: manta['usdc']
    },
    tokens: [
      manta['weth'],
      manta['usdc'],
      manta['iusd'],
      manta['izi'],
      manta['usdt'],
      manta['wbtc'],
      manta['dai'],
      manta['wsteth'],
      manta['tia'],
      manta['wusdm'],
      manta['stone'],
      manta['lab'],
      manta['manta']
    ]
  },
  534352: {
    defaultCurrencies: {
      input: scroll['eth'],
      output: scroll['usdc']
    },
    tokens: [
      scroll['eth'],
      scroll['weth'],
      scroll['usdc'],
      scroll['dai'],
      scroll['wbtc'],
      scroll['izi'],
      scroll['wsteth'],
      scroll['stone'],
      scroll['usdt'],
      scroll['scrolly'],
      scroll['we-eth'],
      scroll['pufETH'],
      scroll['cat'],
      scroll['wrseth'],
      scroll['iusd'],
      scroll['kala'],
      scroll['panda'],
      scroll['bald']
    ]
  },
  34443: {
    defaultCurrencies: {
      input: mode['eth'],
      output: mode['usdt']
    },
    tokens: [
      mode['eth'],
      mode['weth'],
      mode['mode'],
      mode['usdc'],
      mode['usdt'],
      mode['ezeth'],
      mode['m-btc'],
      mode['we-eth.mode']
    ]
  }
};

export { basic, networks };
