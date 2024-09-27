import { blast } from '@/config/tokens/blast';
const basic = {
  name: 'Fenix Finance',
  logo: '/assets/dapps/fenix.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};

const networks = {
  81457: {
    defaultCurrencies: {
      input: blast['eth'],
      output: blast['usdb']
    },
    tokens: [
      blast['eth'],
      blast['weth'],
      blast['usdb'],
      blast['wbtc'],
      blast['deus'],
      blast['pxeth'],
      blast['usd+'],
      blast['blast'],
      blast['core'],
      blast['ezeth'],
      blast['we-eth'],
      blast['wrseth'],
      blast['sfrxETH'],
      blast['dola'],
      blast['preon'],
      blast['star'],
      blast['ibex'],
      blast['inETH'],
      blast['fdao'],
      blast['usde'],
      blast['sfrax']
    ]
  }
};

export { basic, networks };
