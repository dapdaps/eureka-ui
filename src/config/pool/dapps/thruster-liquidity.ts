import { blast } from '@/config/tokens/blast';

import { formatToken, formatTokenKey } from '../helpers';

const contracts: { [key: number]: any } = {
  81457: {
    PositionManager: '0x434575EaEa081b735C985FA9bf63CD7b87e227F9',
    Factory: '0x71b08f13B3c3aF35aAdEb3949AFEb1ded1016127',
    Factory3: '0xb4A7D971D0ADea1c73198C97d7ab3f9CE4aaFA13',
    Router3: '0x98994a9A7a2570367554589189dC9772241650f6',
    Factory10: '0x37836821a2c03c171fB1a595767f4a16e2b93Fc4',
    Router10: '0x44889b52b71E60De6ed7dE82E2939fcc52fB2B4E'
  }
};

const tokens: { [key: number]: any } = {
  81457: [
    blast['eth'],
    blast['weth'],
    blast['usdb'],
    blast['blast'],
    blast['yes'],
    blast['usde'],
    blast['ezeth'],
    blast['pac'],
    blast['weeth'],
    blast['usd+'],
    blast['wrseth'],
    blast['rbx'],
    blast['andy'],
    blast['bpepe'],
    blast['ole'],
    blast['sUSDe'],
    blast['kap'],
    blast['juice'],
    blast['bwool'],
    blast['sss'],
    blast['yield'],
    blast['deth'],
    blast['wbtc'],
    blast['mwstETH-WPUNKS:20'],
    blast['axlusdc'],
    blast['mwstETH-WPUNKS:40'],
    blast['mia'],
    blast['sfrxETH'],
    blast['bus'],
    blast['pxeth'],
    blast['tes'],
    blast['early'],
    blast['baja'],
    blast['core'],
    blast['ese'],
    blast['dusd'],
    blast['ankrETH'],
    blast['sfrax'],
    blast['bag'],
    blast['dola'],
    blast['glory'],
    blast['inETH'],
    blast['mWETH-PPG:5'],
    blast['orbit'],
    blast['mblastopians'],
    blast['ohno'],
    blast['bepe'],
    blast['bns'],
    blast['pump'],
    blast['pstake'],
    blast['zai'],
    blast['bnd'],
    blast['ethx'],
    blast['ghost'],
    blast['big'],
    blast['aura'],
    blast['upt'],
    blast['$wai'],
    blast['wels'],
    blast['usb'],
    blast['pacm'],
    blast['usdc+'],
    blast['alien'],
    blast['swim'],
    blast['vroom'],
    blast['peace'],
    blast['ankr'],
    blast['mWETH-PPG:10'],
    blast['nptx'],
    blast['ai'],
    blast['usdbx'],
    blast['fxs']
  ]
    .map((token) => formatToken(token))
    .reduce((acc, curr) => ({ ...acc, [formatTokenKey(curr)]: curr }), {})
};

export default {
  contracts,
  fees: [500, 3000, 10000],
  defaultFee: 500,
  tokens,
  hasV2: true
};
