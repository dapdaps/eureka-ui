import { scroll } from '@/config/tokens/scroll';
import weth from '@/config/contract/weth';

const basic = {
  name: 'Uniswap V3',
  logo: '/images/apps/uniswapv3.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.UniswapV3',
};
const networks = {
  534352: {
    routerAddress: '0xfc30937f5cDe93Df8d48aCAF7e6f5D8D8A31F636',
    wethAddress: weth[534352],
    defaultCurrencies: {
      input: scroll['eth'],
      output: scroll['usdc'],
    },
    tokens: [scroll['usdt'], scroll['eth'], scroll['usdc'], scroll['wbtc']],
  },
};

export { basic, networks };
