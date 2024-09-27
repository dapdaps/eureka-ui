import { bsc } from '@/config/tokens/bsc';

const basic = {
  name: 'Biswap',
  logo: '/assets/dapps/bi-swap.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  56: {
    defaultCurrencies: {
      input: bsc['bnb'],
      output: bsc['bsw']
    },
    tokens: [
      bsc['bnb'],
      bsc['bsw'],
      bsc['eth'],
      bsc['usdt'],
      bsc['btcb'],
      bsc['wbnb'],
      bsc['busd'],
      bsc['usdc'],
      bsc['matic'],
      // bsc['bfg'],
      bsc['sfp'],
      bsc['floki'],

      bsc['bscusd']
    ]
  }
};

export { basic, networks };
