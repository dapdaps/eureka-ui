import { blast } from '@/config/tokens/blast';
import chains from '@/config/chains';
import { formatTokenKey, formatToken } from './helpers';

const contracts: { [key: number]: any } = {
  81457: {
    PositionManager: '0x434575EaEa081b735C985FA9bf63CD7b87e227F9',
    Factory: '0x71b08f13B3c3aF35aAdEb3949AFEb1ded1016127',
  },
};

const tokens: { [key: number]: any } = {
  81457: [
    blast['eth'],
    blast['weth'],
    blast['usdb'],
    blast['yes'],
    blast['ezeth'],
    blast['juice'],
    blast['wrseth'],
    blast['mwstETH-WPUNKS:40'],
    blast['sss'],
    blast['weeth'],
    blast['mwstETH-WPUNKS:20'],
    blast['yield'],
    blast['ole'],
    blast['pac'],
  ]
    .map((token) => formatToken(token))
    .reduce((acc, curr) => ({ ...acc, [formatTokenKey(curr)]: curr }), {}),
};

export default {
  contracts,
  fees: [500, 3000, 10000],
  defaultFee: 3000,
  tokens,
  defaultChain: chains[81457],
  theme: {
    '--button-color': 'linear-gradient(180deg, #FF8581 0%, #FE2B29 100%)',
    '--border-color': '#FE6360',
  },
};
