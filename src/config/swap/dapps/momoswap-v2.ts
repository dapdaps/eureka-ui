import { blast } from '@/config/tokens/blast';
const basic = {
  name: 'MonoSwap V2',
  logo: '/images/apps/momoswap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.MomoswapV2',
};
const networks = {
  81457: {
    routerAddress: '0x859374eA6dF8289d883fEd4E688a83381276521d',
    defaultCurrencies: {
      input: blast['eth'],
      output: blast['usdb'],
    },
    tokens: [blast['eth'], blast['weth'], blast['usdb'], blast['blste'], blast['musd'], blast['xmomo']],
  },
};

export { basic, networks };
