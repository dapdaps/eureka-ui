import { blast } from '@/config/tokens/blast';
import { formatTokenKey, formatToken } from '../helpers';

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
    blast['kap'],
    blast['glory'],
    blast['andy'],
    blast['early'],
    blast['mia'],
    blast['orbit'],
    blast['baja'],
    blast['bag'],
    blast['pump'],
    blast['$wai'],
  ]
    .map((token) => formatToken(token))
    .reduce((acc, curr) => ({ ...acc, [formatTokenKey(curr)]: curr }), {}),
};

export default {
  contracts,
  fees: [500, 3000, 10000],
  defaultFee: 3000,
  tokens,
};
