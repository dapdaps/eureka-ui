import { linea } from '@/config/tokens/linea';

import { formatToken, formatTokenKey } from '../helpers';

const contracts: { [key: number]: any } = {
  59144: {
    PositionManager: '0x5D3D9E20ad27dd61182505230D1bD075bd249E4B',
    Factory: '0x622b2c98123D303ae067DB4925CD6282B3A08D0F'
  }
};

const tokens: { [key: number]: any } = {
  59144: [
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
    .map((token) => formatToken(token))
    .reduce((acc, curr) => ({ ...acc, [formatTokenKey(curr)]: curr }), {})
};

export default {
  contracts,
  tokens,
  poolType: 'algebra'
};
