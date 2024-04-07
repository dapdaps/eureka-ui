import { blast } from '@/config/tokens/blast';
const basic = {
  name: 'MonoSwap V3',
  logo: '/images/apps/1.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.MomoswapV3',
};
const networks = {
  81457: {
    quoterAddress: '0x2AdD22A4B213bb0b26c0231bE61F931ec0666120',
    routerAddress: '0xE4Dd30f7a2808580C9185e975bd7770A842923c6',
    fees: [500, 3000, 10000],
    defaultCurrencies: {
      input: blast['eth'],
      output: blast['usdb'],
    },
    tokens: [blast['eth'], blast['weth'], blast['usdb'], blast['blste'], blast['musd'], blast['xmomo']],
  },
};

export { basic, networks };
