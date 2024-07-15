import { ethereum } from '@/config/tokens/ethereum';

const LSTS_DATA = [
  {
    key: 0,
    lstIcon: '/images/lrts/box_1.svg',
    dapp: {
      name: 'Mantle',
      logo: '/images/lrts/dapp-mantle.svg',
    },

    token: {
      ...ethereum['mETH'],
    },
    lrtTokens: [
      {
        order: 3,
        logo: '/images/lrts/gem-inmeth.svg', // gem logo
        isActive: true, //TODO has balance?
        token: ethereum['inmeth'],
      },
      {
        order: 15,
        logo: '/images/lrts/gem-mmeth.svg', // gem logo
        isActive: true,
        token: ethereum['mmeth'],
      },
      {
        order: 21,
        logo: '/images/lrts/gem-kmeth.svg', // gem logo
        isActive: true,
        token: ethereum['kmeth'],
      },
      {
        order: 40,
        logo: '/images/lrts/gem-rmeth.svg', // gem logo
        isActive: true,
        token: ethereum['rmeth'],
      },
    ],
  },
  {
    key: 1,
    lstIcon: '/images/lrts/box_2.svg',
    dapp: {
      name: 'Lido',
      logo: '/images/lrts/dapp-lido.svg',
    },
    token: {
      ...ethereum['stETH'],
    },
    lrtTokens: [
      {
        order: 3,
        logo: '/images/lrts/gem-rseth.svg',
        isActive: true,
        token: ethereum['rsETH'],
      },
      {
        order: 7,
        logo: '/images/lrts/gem-insteth.svg',
        isActive: true,
        token: ethereum['insETH'],
      },
      {
        order: 13,
        logo: '/images/lrts/gem-msteth.svg',
        isActive: true,
        token: ethereum['msETH'],
      },
      {
        order: 15,
        logo: '/images/lrts/gem-pufeth.svg',
        isActive: true,
        token: ethereum['pufETH'],
      },
      {
        order: 25,
        logo: '/images/lrts/gem-weeth.svg',
        isActive: true,
        token: ethereum['rmETH'],
      },
      {
        order: 31,
        logo: '/images/lrts/gem-ezeth.svg',
        isActive: true,
        token: ethereum['rmETH'],
      },
      {
        order: 40,
        logo: '/images/lrts/gem-rsteth.svg',
        isActive: true,
        token: ethereum['rmETH'],
      },
    ],
  },
  {
    key: 2,
    lstIcon: '/images/lrts/box_3.svg',
    dapp: {
      name: 'Rocket Pool',
      logo: '/images/lrts/dapp-rocket.svg',
    },
    token: {
      ...ethereum['rETH'],
    },
    lrtTokens: [
      {
        order: 7,
        logo: '/images/lrts/gem-inreth.svg',
        isActive: true,
        token: ethereum['inrETH'],
      },
      {
        order: 13,
        logo: '/images/lrts/gem-kreth.svg',
        isActive: true,
        token: ethereum['krETH'],
      },
      {
        order: 40,
        logo: '/images/lrts/gem-mreth.svg',
        isActive: true,
        token: ethereum['mrETH'],
      },
    ],
  },
  {
    key: 3,
    lstIcon: '/images/lrts/box_4.svg',
    dapp: {
      name: 'Frax Finance',
      logo: '/images/lrts/dapp-frax.svg',
    },
    token: {
      ...ethereum['sfrxETH'],
    },
    lrtTokens: [
      {
        order: 7,
        logo: '/images/lrts/gem-insfrseth.svg',
        isActive: true,
        token: ethereum['insfrsETH'],
      },
      {
        order: 13,
        logo: '/images/lrts/gem-ksfrxeth.svg',
        isActive: true,
        token: ethereum['ksfrxETH'],
      },
      {
        order: 25,
        logo: '/images/lrts/gem-msfrxeth.svg',
        isActive: true,
        token: ethereum['msfrxETH'],
      },
      {
        order: 40,
        logo: '/images/lrts/gem-rsfrxeth.svg',
        isActive: true,
        token: ethereum['rsfrxETH'],
      },
    ],

    userGems: [7],
  },
];

export default LSTS_DATA;
