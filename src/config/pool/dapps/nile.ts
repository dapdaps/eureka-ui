import { linea } from '@/config/tokens/linea';

import { formatToken, formatTokenKey } from '../helpers';

const contracts: { [key: number]: any } = {
  59144: {
    PositionManager: '0xAAA78E8C4241990B4ce159E105dA08129345946A',
    Factory: '0xAAA32926fcE6bE95ea2c51cB4Fcb60836D320C42'
  }
};

const tokens: { [key: number]: any } = {
  59144: [
    linea['eth'],
    linea['weth'],
    linea['weeth'],
    linea['usdt'],
    linea['wrseth'],
    linea['ezeth'],
    linea['usdc'],
    linea['wbtc'],
    linea['zero']
  ]
    .map((token) => formatToken(token))
    .reduce((acc, curr) => ({ ...acc, [formatTokenKey(curr)]: curr }), {})
};

export default {
  contracts,
  fees: [100, 250, 500, 3000, 10000],
  defaultFee: 3000,
  tokens,
  hasV2: false
};
