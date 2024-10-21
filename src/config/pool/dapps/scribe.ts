import { scroll } from '@/config/tokens/scroll';

import { formatToken, formatTokenKey } from '../helpers';

const contracts: { [key: number]: any } = {
  534352: {
    PositionManager: '0x8b370dc23bE270a7FA78aD3803fCaAe549Ac21fc',
    Factory: '0xDc62aCDF75cc7EA4D93C69B2866d9642E79d5e2e'
  }
};

const tokens: { [key: number]: any } = {
  534352: [scroll['eth'], scroll['weth'], scroll['usdc'], scroll['usdt'], scroll['we-eth'], scroll['stone']]
    .map((token) => formatToken(token))
    .reduce((acc, curr) => ({ ...acc, [formatTokenKey(curr)]: curr }), {})
};

export default {
  contracts,
  tokens,
  poolType: 'algebra',
  hasV2: false
};
