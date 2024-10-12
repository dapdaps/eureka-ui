import liquidity from '@/config/pool/dapps/lynex';
import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Lynex',
  logo: '/assets/dapps/lynex.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdt']
    },
    tokens: [
      linea['usdc'],
      linea['eth'],
      linea['weth'],
      linea['usdt'],
      linea['mendi'],
      linea['weeth'],
      linea['wsteth'],
      linea['ezeth'],
      linea['wbtc'],
      linea['foxy'],
      linea['lynx'],
      linea['mai'],
      linea['stone'],
      linea['croak']
    ]
  }
};

const { contracts, tokens, poolType } = liquidity;

export { basic, networks, contracts, tokens, poolType };
