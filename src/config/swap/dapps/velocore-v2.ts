import { linea } from '@/config/tokens/linea';
import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'Velocore V2',
  logo: '/assets/dapps/velocore.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc']
    },
    tokens: [
      linea['weth'],
      linea['eth'],
      linea['busd'],
      linea['dai'],
      linea['usdt'],
      linea['wbtc'],
      linea['bnb'],
      linea['wsteth'],
      linea['usdc']
    ]
  },
  324: {
    defaultCurrencies: {
      input: zkSync['eth'],
      output: zkSync['usdc']
    },
    tokens: [
      zkSync['eth'],
      zkSync['weth'],
      zkSync['usdc'],
      zkSync['vc'],
      zkSync['waifu'],
      zkSync['zch'],
      zkSync['keyvc'],
      zkSync['lsd'],
      zkSync['cebusd']
    ]
  }
};

export { basic, networks };
