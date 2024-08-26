import { gnosis } from '@/config/tokens/gnosis';

const basic = {
  name: 'Swapr',
  logo: '/images/apps/swapr.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  100: {
    defaultCurrencies: {
      input: gnosis['weth'],
      output: gnosis['xdai'],
    },
    tokens: [
      gnosis['wxdai'],
      gnosis['gno'],
      gnosis['usdc'],
      gnosis['usdt'],
      gnosis['weth'],
      gnosis['wbtc'],
      gnosis['swpr'],
      gnosis['xdai'],
    ],
  },
};

export { basic, networks };
