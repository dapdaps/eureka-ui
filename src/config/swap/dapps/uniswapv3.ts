import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Uniswap V3',
  logo: '/images/apps/uniswapv3.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  534352: {
    defaultCurrencies: {
      input: scroll['eth'],
      output: scroll['usdc'],
    },
    tokens: [scroll['usdt'], scroll['eth'], scroll['usdc'], scroll['wbtc']],
  },
};

export { basic, networks };
