import { blast } from '@/config/tokens/blast';
const basic = {
  name: 'MimSwap',
  logo: '/images/apps/mimswap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.Mimswap',
};
const networks = {
  81457: {
    lpAddress: '0x163B234120aaE59b46b228d8D88f5Bc02e9baeEa',
    routerAddress: '0x85FAAfc31bc8B16bE7039F869cD2006dA257b705',
    defaultCurrencies: {
      input: blast['usdb'],
      output: blast['mim'],
    },
    tokens: [blast['usdb'], blast['mim']],
  },
};

export { basic, networks };
