import liquidity from '@/config/pool/dapps/etherex';
import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Etherex',
  logo: '/assets/dapps/nile.png'
};

const networks = {
  59144: {
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdt']
    },
    tokens: [
      linea['eth'],
      linea['weth'],
      linea['weeth'],
      linea['usdt'],
      linea['wrseth'],
      linea['ezeth'],
      linea['usdc'],
      linea['wbtc'],
      linea['nile'],
      linea['zero'],
      linea['linea']
    ]
  }
};

const { contracts, tokens, hasV2, fees, defaultFee } = liquidity;

export { basic, networks, contracts, tokens, hasV2, fees, defaultFee };
