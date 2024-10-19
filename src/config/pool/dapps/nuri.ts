import { scroll } from '@/config/tokens/scroll';

import { formatToken, formatTokenKey } from '../helpers';

const contracts: { [key: number]: any } = {
  534352: {
    PositionManager: '0xAAA78E8C4241990B4ce159E105dA08129345946A',
    Factory: '0xAAA32926fcE6bE95ea2c51cB4Fcb60836D320C42'
  }
};

const tokens: { [key: number]: any } = {
  534352: [
    scroll['eth'],
    scroll['weth'],
    scroll['stone'],
    scroll['usdc'],
    scroll['wsteth'],
    scroll['wrseth'],
    scroll['we-eth'],
    scroll['usdt'],
    scroll['wbtc'],
    scroll['dai'],
    scroll['pufETH']
  ]
    .map((token) => formatToken(token))
    .reduce((acc, curr) => ({ ...acc, [formatTokenKey(curr)]: curr }), {})
};

export default {
  contracts,
  fees: [100, 250, 500, 3000, 10000],
  defaultFee: 500,
  tokens,
  hasV2: false
};
