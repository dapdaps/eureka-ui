import { polygonZkevm } from '@/config/tokens/polygonZkevm';
import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Pancake Swap',
  logo: '/images/apps/pancake.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  1101: {
    defaultCurrencies: {
      input: polygonZkevm['eth'],
      output: polygonZkevm['usdc'],
    },
    tokens: [polygonZkevm['eth'], polygonZkevm['usdc'], polygonZkevm['weth'], polygonZkevm['usdt']],
  },
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc'],
    },
    tokens: [
      linea['eth'],
      linea['weth'],
      linea['wsteth'],
      linea['usdc'],
      linea['cake'],
      linea['wbtc'],
      linea['dai'],
      linea['usdt'],
      linea['axlusdc'],
      linea['ezeth'],
      linea['foxy'],
    ],
  },
};

export { basic, networks };
