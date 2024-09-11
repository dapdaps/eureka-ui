import dynamic from 'next/dynamic';

import { blast } from '@/config/tokens/blast';

const basic = {
  name: 'AgentFi',
};

const networks = {
  // Blast
  81457: {
    StakeTokens: [
      { ...blast['eth'] },
      { ...blast['weth'] },
      { ...blast['usdb'] },
      { ...blast['deth'] },
      { ...blast['dusd'] },
    ],
    strategies: [
      {
        ID: '4',
        NAME: 'Looper',
        DESCRIPTION_LAUNCH: [
          'This strategy recursively deposits funds into Duo Exchange and Orbit Lending.',
          'You earn Blast Gold + Points, Particle Points, Ring Points and Orbit emissions!',
        ],
        DESCRIPTION_CONFIG: [
          'This strategy recursively deposits funds into Duo Exchange and Orbit Lending.',
          'You earn Blast Gold + Points, Particle Points, Ring Points and Orbit emissions!',
        ],
        IMPLEMENTATION_ADDRESS: '0x',
        CONFIG_ID: '',
        AGENT_TYPE: 'STRATEGY',
        THUMBNAIL_URL: '/assets/strategies/4.png',
        VARIANTS: [],
        ASSETS: [
          'ETH',
          'USDB',
          'DUSD',
          'DETH',
        ],
        PROTOCOLS: [
          'Orbit',
          'Particle',
          'Duo',
          'Ring',
        ],
        isNew: true,
        achievements: [
          {
            'name': 'Blast Gold',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/gold.svg',
          },
          {
            'name': 'Blast Points',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/points.svg',
          },
          {
            'name': 'Orbit Emissions',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/orbit.svg',
          },
          {
            'name': 'Particle Points',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/particle.svg',
          },
          {
            'name': 'Ring Points',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/ring.svg',
          },
        ],
        meta: {
          leverage: 2,
          targetLTV: '50%',
          PointsRate: {
            ETH: '1.5',
            WETH: '1.5',
            USDB: '2.2',
            DETH: '1.5',
            DUSD: '2.2',
          },
          modeList: [
            {
              value: 1,
              text: 'Boost Points', //  - 1.5x
            },
            {
              value: 2,
              text: 'Boost Yield', //  - APY 9.3%
            },
          ],
          contract: '0xf6B6C15256de133cC722313bfFBb75280Bb2B228',
          wrapMint: {
            ETH: '0xD89dcC88AcFC6EF78Ef9602c2Bf006f0026695eF',
            WETH: '0xD89dcC88AcFC6EF78Ef9602c2Bf006f0026695eF',
            USDB: '0xf2050acF080EE59300E3C0782B87f54FDf312525',
            DETH: '0x0000000000000000000000000000000000000000',
            DUSD: '0x0000000000000000000000000000000000000000',
          },
          otoken: {
            ETH: '0xa3135b76c28b3971B703a5e6CD451531b187Eb5A',
            WETH: '0xa3135b76c28b3971B703a5e6CD451531b187Eb5A',
            USDB: '0x4ADF85E2e760c9211894482DF74BA535BCae50A4',
            DETH: '0xa3135b76c28b3971B703a5e6CD451531b187Eb5A',
            DUSD: '0x4ADF85E2e760c9211894482DF74BA535BCae50A4',
          },
          underlying: {
            ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            WETH: blast['weth'].address,
            USDB: blast['usdb'].address,
            DETH: blast['deth'].address,
            DUSD: blast['dusd'].address,
          },
        },
        formContent: dynamic(() => import('@/modules/staking/AgentFi/components/Looper')),
      },
      {
        ID: '3',
        NAME: 'Concentrated Liquidity Manager',
        DESCRIPTION_LAUNCH: [
          'This strategy rebalances your LP position every 24hrs if price moves outside of the LP range.',
        ],
        DESCRIPTION_CONFIG: [
          'This strategy optimizes liquidity positions (Uniswap v3) via automated rebalancing.',
          'When price strays outside of the defined range, your Blastooor automatically re-centers the range about the new price.',
        ],
        IMPLEMENTATION_ADDRESS: '0x',
        CONFIG_ID: '',
        AGENT_TYPE: 'STRATEGY',
        THUMBNAIL_URL: '/assets/strategies/2_conc_liq_man_dark.png',
        VARIANTS: [],
        PROTOCOLS: [
          'Blasterswap',
          'BladeSwap',
          'Thruster',
        ],
        ASSETS: [
          'ETH',
          'USDB',
        ],
        isNew: true,
        achievements: [
          {
            'name': 'Blast Gold',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/gold.svg',
          },
          {
            'name': 'Blast Points',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/points.svg',
          },
          {
            'name': 'Blasterswap',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/blasterswap.svg',
          },
        ],
        meta: {
          dexList: [
            {
              value: 1,
              text: 'Blasterswap',
              icons: ['https://app.agentfi.io/assets/strategies/icons/blasterswap.svg'],
              contract: '0x1e60C4113C86231Ef4b5B0b1cbf689F1b30e7966',
            },
          ],
          feeTierList: [
            {
              value: 100,
              text: '0.01 % fee tier',
              name: ['BlasterSwap Positions NFT 0.01', 'BlasterSwap Positions NFT 0.01%'],
              pool: '0xaf40238F23213a912443F001201602115795d0D6',
            },
            {
              value: 500,
              text: '0.05 % fee tier',
              name: ['BlasterSwap Positions NFT 0.05', 'BlasterSwap Positions NFT 0.05%'],
              pool: '0x9f8b6c144268f784E79FAAfd6F6Df8355733Eb2E',
            },
            {
              value: 3000,
              text: '0.30 % fee tier',
              name: ['BlasterSwap Positions NFT 0.3', 'BlasterSwap Positions NFT 0.3%'],
              pool: '0x2F4F0a1cfCD835cf20314375ee28C50Ccd871f50',
            },
          ],
          contract: '0x5eAda3477F15A0636D1eDCa309ECcd0A6e8Ab77F',
          formatBigInt: (value: string | number) => {
            return BigInt(value);
          },
        },
        formContent: dynamic(() => import('@/modules/staking/AgentFi/components/Liquidity')),
      },
      {
        ID: '1',
        NAME: 'DEX Balancer',
        DESCRIPTION_LAUNCH: [
          'DEX Balancer distributes your funds evenly across below partner DEXes. These protocols have all won awards in the Big Bang competition.',
        ],
        DESCRIPTION_CONFIG: [
          'DEX Balancer distributes your funds evenly across below partner DEXes.',
          'DEPOSIT will distribute your funds evenly across below DEXes.',
          'WITHDRAW will remove all your funds from the strategy.',
        ],
        IMPLEMENTATION_ADDRESS: '0x4b1e8C60E4a45FD64f5fBf6c497d17Ab12fba213',
        CONFIG_ID: '4',
        AGENT_TYPE: 'STRATEGY',
        THUMBNAIL_URL: '/assets/strategies/1_dex_balancer_dark.png',
        VARIANTS: [],
        ASSETS: [
          'ETH',
          'USDB',
        ],
        PROTOCOLS: [
          'Hyperlock',
          'Ring',
          'Blasterswap',
        ],
        achievements: [
          {
            'name': 'Blast Gold',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/gold.svg',
          },
          {
            'name': 'Blast Points',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/points.svg',
          },
          {
            'name': 'Blasterswap',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/blasterswap.svg',
          },
          {
            'name': 'Hyperlock',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/hyperlock.svg',
          },
          {
            'name': 'Ring Points',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/ring.svg',
          },
          {
            'name': 'Thruster',
            'iconUrl': 'https://app.agentfi.io/assets/strategies/icons/thruster.svg',
          },
        ],
        meta: {
          APR: '9.1%',
          protocolList: [
            {
              name: 'Ring',
              iconUrl: 'https://app.agentfi.io/logo/partners/svgs/symbol/color/ring.svg',
              link: 'https://www.ring.exchange',
              address: '0x9BE8a40C9cf00fe33fd84EAeDaA5C4fe3f04CbC3',
              logo: 'https://app.agentfi.io/logo/partners/svgs/wordmark/color/hyperlock.svg',
            },
            {
              name: 'Blasterswap',
              iconUrl: 'https://app.agentfi.io/logo/partners/svgs/symbol/color/blasterswap.svg',
              link: 'https://blasterswap.com',
              address: '0x3b5d3f610Cc3505f4701E9FB7D0F0C93b7713adD',
              logo: 'https://app.agentfi.io/logo/partners/svgs/wordmark/color/blasterswap.svg',
            },
            {
              name: 'Hyperlock',
              iconUrl: 'https://app.agentfi.io/logo/partners/svgs/symbol/color/hyperlock.svg',
              link: 'https://hyperlock.finance',
              address: '0x12c69BFA3fb3CbA75a1DEFA6e976B87E233fc7df',
              logo: 'https://app.agentfi.io/logo/partners/svgs/wordmark/color/ring.svg',
            },
          ],
          contract: '0xB52274826621B6886787eC29E4C25cd3493B4930',
        },
        formContent: dynamic(() => import('@/modules/staking/AgentFi/components/DEXBalancer')),
      },
      {
        ID: '2',
        NAME: 'Multipliooor',
        DESCRIPTION_LAUNCH: [
          'Deposit our recommended 0.003 ETH now and this strategy will complete all Blast Multiplier tasks on your behalf, and automatically boost your Blast points!',
        ],
        DESCRIPTION_CONFIG: [
          'This strategy will complete all Blast Multiplier tasks on your behalf, and automatically boost your Blast points!',
          'You can withdraw any remaining funds at the end of the Blast Multiplier program.',
        ],
        IMPLEMENTATION_ADDRESS: '0x',
        CONFIG_ID: '6',
        AGENT_TYPE: 'STRATEGY',
        THUMBNAIL_URL: '/assets/strategies/3_multiplooor_dark.png',
        VARIANTS: [],
        PROTOCOLS: [
          'AgentFi',
        ],
        ASSETS: [
          'ETH',
        ],
        achievements: [
          { 'name': 'Spot Dexes', img: 'https://app.agentfi.io/assets/strategies/multipliooor/1_spot_dexes.png' },
          { 'name': 'Perp Dexes', img: 'https://app.agentfi.io/assets/strategies/multipliooor/2_perp_dexes.png' },
          { 'name': 'NFTFi', img: 'https://app.agentfi.io/assets/strategies/multipliooor/3_nft_fi.png' },
          { 'name': 'SocialFi', img: 'https://app.agentfi.io/assets/strategies/multipliooor/4_social_fi.png' },
          { 'name': 'Jackpot NFT', img: 'https://app.agentfi.io/assets/strategies/multipliooor/5_jackpot_nft.png' },
          { 'name': 'Jackpot Token', img: 'https://app.agentfi.io/assets/strategies/multipliooor/6_jackpot_token.png' },
          { 'name': 'GambleFi', img: 'https://app.agentfi.io/assets/strategies/multipliooor/7_gamble_fi.png' },
        ],
        meta: {
          lockedImgUrl: 'https://app.agentfi.io/assets/strategies/multipliooor/0_locked.png',
          contract: '0xE42ECCA759813Ceed368Ca08d8F0F6780D0c41E1',
        },
        formContent: dynamic(() => import('@/modules/staking/AgentFi/components/Multipliooor')),
      },
    ],
  },
};

export default { basic, networks };
