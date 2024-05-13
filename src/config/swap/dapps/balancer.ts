import { polygonZkevm } from '@/config/tokens/polygonZkevm';
import { base } from '@/config/tokens/base';
import { gnosis } from '@/config/tokens/gnosis';

const basic = {
  name: 'Balancer',
  logo: '/images/apps/balancer.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut',
};
const networks = {
  1101: {
    defaultCurrencies: {
      input: polygonZkevm['eth'],
      output: polygonZkevm['usdc'],
    },
    tokens: [
      polygonZkevm['eth'],
      polygonZkevm['usdc'],
      polygonZkevm['weth'],
      polygonZkevm['wbtc'],
      polygonZkevm['matic'],
      polygonZkevm['usdt'],
      polygonZkevm['dai'],
    ],
    pools: [
      [
        [
          polygonZkevm['matic'].address.toLowerCase(),
          polygonZkevm['weth'].address.toLowerCase(),
          polygonZkevm['usdc'].address.toLowerCase(),
        ],
        '0xc951aebfa361e9d0063355b9e68f5fa4599aa3d1000100000000000000000017',
      ],
      [
        [polygonZkevm['weth'].address.toLowerCase(), polygonZkevm['dai'].address.toLowerCase()],
        '0xa7f602cfaf75a566cb0ed110993ee81c27fa3f53000200000000000000000009',
      ],
      [
        [
          polygonZkevm['weth'].address.toLowerCase(),
          polygonZkevm['dai'].address.toLowerCase(),
          polygonZkevm['usdt'].address.toLowerCase(),
        ],
        '0xe8ca7400eb61d5bdfc3f8f2ea99e687e0a4dbf78000100000000000000000019',
      ],
      [
        [polygonZkevm['weth'].address.toLowerCase(), polygonZkevm['usdc'].address.toLowerCase()],
        '0x53ddc1f1ef585b426c03674f278f8107f1524ade000200000000000000000012',
      ],
    ],
  },
  8453: {
    defaultCurrencies: {
      input: base['eth'],
      output: base['usdc'],
    },
    tokens: [base['eth'], base['usdc'], base['weth'], base['usdbc'], base['dai'], base['cbeth']],
  },
  100: {
    routerAddress: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    defaultCurrencies: {
      input: gnosis['weth'],
      output: gnosis['wxdai'],
    },
    tokens: [
      gnosis['xdai'],
      gnosis['wxdai'],
      gnosis['BAL'],
      gnosis['weth'],
      gnosis['usdc'],
      gnosis['usdt'],
      gnosis['wsteth'],
      gnosis['dai'],
      gnosis['sDAI'],
      gnosis['gno'],
    ],
    poolsGraph: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gnosis-chain-v2',
    pools: [
      [
        [gnosis['wsteth'].address.toLowerCase(), gnosis['gno'].address.toLowerCase()],
        '0x4683e340a8049261057d5ab1b29c8d840e75695e00020000000000000000005a',
      ],
      [
        [gnosis['weth'].address.toLowerCase(), gnosis['wsteth'].address.toLowerCase(), ''],
        '0xbad20c15a773bf03ab973302f61fabcea5101f0a000000000000000000000034',
      ],
      [
        [gnosis['wsteth'].address.toLowerCase(), gnosis['sDAI'].address.toLowerCase()],
        '0xbc2acf5e821c5c9f8667a36bb1131dad26ed64f9000200000000000000000063',
      ],
      [
        [
          gnosis['usdt'].address.toLowerCase(),
          '',
          gnosis['sDAI'].address.toLowerCase(),
          gnosis['usdc'].address.toLowerCase(),
        ],
        '0x7644fa5d0ea14fcf3e813fdf93ca9544f8567655000000000000000000000066',
      ],
      [
        [
          '',
          gnosis['usdt'].address.toLowerCase(),
          gnosis['usdc'].address.toLowerCase(),
          gnosis['sDAI'].address.toLowerCase(),
        ],
        '0x2086f52651837600180de173b09470f54ef7491000000000000000000000004f',
      ],
      [
        [
          gnosis['weth'].address.toLowerCase(),
          gnosis['BAL'].address.toLowerCase(),
          gnosis['gno'].address.toLowerCase(),
          gnosis['wxdai'].address.toLowerCase(),
        ],
        '0xa99fd9950b5d5dceeaf4939e221dca8ca9b938ab000100000000000000000025',
      ],
      [
        [gnosis['weth'].address.toLowerCase(), gnosis['gno'].address.toLowerCase()],
        '0xb8bb1ce9c6e5401d66fe2126db6e7387e1e24ffe00020000000000000000003d',
      ],
      [
        [
          gnosis['usdt'].address.toLowerCase(),
          gnosis['usdc'].address.toLowerCase(),
          gnosis['wxdai'].address.toLowerCase(),
        ],
        '0x11884da90fb4221b3aa288a7741c51ec4fc43b2f000000000000000000000004',
      ],
      [
        [gnosis['usdc'].address.toLowerCase(), gnosis['wxdai'].address.toLowerCase()],
        '0x0503dd6b2d3dd463c9bef67fb5156870af63393e000200000000000000000003',
      ],
      [
        [
          gnosis['weth'].address.toLowerCase(),
          gnosis['usdc'].address.toLowerCase(),
          gnosis['wxdai'].address.toLowerCase(),
        ],
        '0x013fdedd2bd8a49d6ec9447125bf32dab2f5648e00010000000000000000004a',
      ],
    ],
  },
};

export { basic, networks };
