import { bsc } from '@/config/tokens/bsc';
import { linea } from '@/config/tokens/linea';
import { metis } from '@/config/tokens/metis';
import { optimism } from '@/config/tokens/optimism';

const basic = {
  name: 'Gamma',
  icon: '/images/apps/steakhut.png',
  logo: '',
  amountOutFn: 'bluebiu.near/widget/Liquidity.STEAKHUT',
  ICON_VAULT_MAP: {
    CAI: 'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0x48f88A3fE843ccb0b5003e70B4192c1d7448bEf0/logo.png',
    AVAX: 'https://old.steakhut.finance/avalancheIcon.svg'
  },
};
const networks = {
  // avalanche
  43114: {
    ALL_DATA_URL: 'https://api.thegraph.com/subgraphs/name/0xsirloin/steakhutlb',
    // USER_DATA_BASE: 'https://wire2.gamma.xyz/sushi/base/user/',
    // LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/sushi/base/hypervisors/lastSnapshot',
    defaultPair: 'B CAI-AVAX',
    pairs: [
      {
        id: 'B CAI-AVAX',
        strategy: 'Dynamic',
        strategy2: 'Balanced',
        token0: 'CAI',
        token1: 'AVAX',
        decimals0: 18,
        decimals1: 18,
        // poolAddress: '0x22ca6d83ab887a535ae1c6011cc36ea9d1255c31',
      },
    ],
    addresses: {
      CAI: '0x48f88A3fE843ccb0b5003e70B4192c1d7448bEf0',
      AVAX: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',

      'B CAI-AVAX': '0xffe588ac8d94c758afac5c50a4b4bf4bc1887ffd',
    },
    proxyAddress: '0xc40F63879630dFF5b69dd6d287f7735E65e90702'
  },
};

export default { basic, networks };
