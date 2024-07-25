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
    orders: [3, 15, 21, 40],
    lrtTokens: [
      {
        dapp: {
          name: 'Inception',
          logo: '/images/lrts/gem-inmeth.svg',
        },
        logo: '/images/lrts/gem-inmeth.svg', // gem logo
        token: ethereum['inmETH'],
      },
      {
        dapp: {
          name: 'Eigenpie',
          logo: '/images/lrts/gem-mmeth.svg',
        },
        logo: '/images/lrts/gem-mmeth.svg',
        token: ethereum['mmETH'],
      },
      {
        dapp: {
          name: 'KaraK',
          logo: '/images/lrts/gem-kmeth.svg',
        },
        logo: '/images/lrts/gem-kmeth.svg',
        token: ethereum['kmETH'],
      },
      {
        dapp: {
          name: 'RestakeFinance',
          logo: '/images/lrts/gem-rmeth.svg',
        },
        logo: '/images/lrts/gem-rmeth.svg',
        token: ethereum['rmETH'],
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
    orders: [3, 7, 13, 15, 33, 40],
    lrtTokens: [
      {
        dapp: {
          name: 'KelpDao',
          logo: '/images/lrts/gem-rseth.svg',
        },
        logo: '/images/lrts/gem-rseth.svg',
        token: ethereum['rsETH'],
      },
      {
        dapp: {
          name: 'Inception',
          logo: '/images/lrts/gem-insteth.svg',
        },
        logo: '/images/lrts/gem-insteth.svg',
        token: ethereum['instETH'],
      },
      {
        dapp: {
          name: 'Eigenpie',
          logo: '/images/lrts/gem-msteth.svg',
        },
        logo: '/images/lrts/gem-msteth.svg',
        token: ethereum['mstETH'],
      },
      {
        dapp: {
          name: 'Puffer Finance',
          logo: '/images/lrts/gem-pufeth.svg',
        },
        logo: '/images/lrts/gem-pufeth.svg',
        token: ethereum['pufETH'],
      },
      {
        dapp: {
          name: 'RestakeFinance',
          logo: '/images/lrts/gem-rsteth.svg',
        },
        logo: '/images/lrts/gem-rsteth.svg',
        token: ethereum['rstETH'],
      },
      {
        dapp: {
          name: 'EtherFi',
          logo: '/images/lrts/gem-weeth.svg',
        },
        logo: '/images/lrts/gem-weeth.svg',
        token: ethereum['eETH'],
      },
      // {
      //   dapp: {
      //     name: 'Renzo',
      //     logo: '/images/lrts/gem-ezeth.svg',
      //   },
      //   logo: '/images/lrts/gem-ezeth.svg',
      //   token: ethereum['ezETH'],
      // },
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
    orders: [7, 13, 40],
    lrtTokens: [
      {
        dapp: {
          name: 'Inception',
          logo: '/images/lrts/gem-inreth.svg',
        },
        logo: '/images/lrts/gem-inreth.svg',
        token: ethereum['inrETH'],
      },
      {
        dapp: {
          name: 'KaraK',
          logo: '/images/lrts/gem-kreth.svg',
        },
        logo: '/images/lrts/gem-kreth.svg',
        token: ethereum['krETH'],
      },
      {
        dapp: {
          name: 'Eigenpie',
          logo: '/images/lrts/gem-mreth.svg',
        },
        logo: '/images/lrts/gem-mreth.svg',
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
    orders: [7, 13, 25, 40],
    lrtTokens: [
      {
        dapp: {
          name: 'Inception',
          logo: '/images/lrts/gem-insfrseth.svg',
        },
        logo: '/images/lrts/gem-insfrseth.svg',
        token: ethereum['insfrxETH'],
      },
      {
        dapp: {
          name: 'KaraK',
          logo: '/images/lrts/gem-ksfrxeth.svg',
        },
        logo: '/images/lrts/gem-ksfrxeth.svg',
        token: ethereum['ksfrxETH'],
      },
      {
        dapp: {
          name: 'Eigenpie',
          logo: '/images/lrts/gem-msfrxeth.svg',
        },
        logo: '/images/lrts/gem-msfrxeth.svg',
        token: ethereum['msfrxETH'],
      },
      {
        dapp: {
          name: 'RestakeFinance',
          logo: '/images/lrts/gem-rsfrxeth.svg',
        },
        logo: '/images/lrts/gem-rsfrxeth.svg',
        token: ethereum['rsfrxETH'],
      },
    ],
  },
];

export default LSTS_DATA;
