import type { Badge } from '@/views/AllDapps/components/Badges';
import { StatusType } from '@/views/Odyssey/components/Tag';
import RewardIcons from '@/views/OdysseyV8/RewardIcons';

export const CampaignData: { [campaignName: string]: Badge } = {
  Rango: {
    name: RewardIcons['USDC']?.label || '',
    value: '$1000',
    icon: RewardIcons['USDC']?.icon || '',
    status: StatusType.ended,
    tooltip: 'Related reward on DapDap',
    iconSize: 20,
    odyssey: [
      {
        id: 0,
        name: 'Rango Exchange X DapDap：Win USDC by Birdging via Rango on DapDap!',
        description: 'Explore, Trade, Earn - Go for Gold!',
        start_time: 1717948800000,
        end_time: 2719244800000,
        status: StatusType.ended,
        banner: '/images/odyssey/rango-banner-round.png',
        link: '/bridge-x/rango',
        category: 'spinblast',
        chains_id: '81457',
        networks_id: '18',
        showSummary: false,
        badgeValue: '$1000',
        reward_value: '$1000',
        // for Home RECENT REWARDS
        reward: '[{"name":"USDC","value":"$1000","logo_key":"USDC"}]'
      }
    ]
  },
  RubicHoldstation: {
    name: RewardIcons['USDT']?.label || '',
    value: '$7500',
    icon: RewardIcons['USDT']?.icon || '',
    status: StatusType.ended,
    tooltip: 'Related reward on DapDap',
    iconSize: 20,
    odyssey: [
      {
        id: -1,
        name: 'Rubic x Holdstation Campaign：Play Lottery and Win Medals',
        start_time: 1717948800000,
        end_time: 1727280000000,
        status: StatusType.ended,
        banner: '/images/campaign/rubic-holdstation/link-banner.png',
        superBridgeBanner: '/images/campaign/rubic-holdstation/banner-link-super-bridge.png',
        link: '/campaign/home?category=rubic-holdstation',
        badgeValue: '$7500',
        reward_value: '$7500',
        showSummary: false,
        reward: '[{"name":"USDT","value":"$7500","logo_key":"USDT"}]',
        category: 'rubic',
        description: 'Trade and unlock your Lottery to win big prizes! Time: 16/9/2024 - 30/9/2024 (UTC)'
      }
    ]
  },
  LineaLiquid: {
    name: '',
    value: '$10,000',
    icon: '',
    status: StatusType.ended,
    tooltip: '$10,000 Total Rewards',
    iconSize: 20,
    odyssey: [
      {
        id: -2,
        name: 'DapDap Tales: Linea Liquid Legends',
        description:
          'Trade, Earn, and Win! The more you trade, the bigger your chance to claim legendary rewards!  Time: 14/10/2024 - 30/10/2024 3PM (UTC)',
        start_time: 1717948800001,
        end_time: 1730269192273,
        status: StatusType.ended,
        banner: '/images/campaign/linea-liquid/link-banner.png',
        superBridgeBanner: '/images/campaign/linea-liquid/banner-link-super-bridge.png',
        superBridgeRoutes: ['Orbiter'],
        link: '/campaign/home?category=linea-liquid',
        badgeValue: '$10,000',
        reward_value: '$10,000',
        showSummary: false,
        reward:
          '[{"name":"$LYNX","value":"$10,000","logo_key":"LYNX","tooltip":"$10,000 Total Rewards"},{"name":"$MENDI","value":"$10,000","logo_key":"MENDI","tooltip":"$10,000 Total Rewards"},{"name":"O-Points","value":"$10,000","logo_key":"o_points","tooltip":"$10,000 Total Rewards"},{"name":"E-Forg","value":"$10,000","logo_key":"e_forg","tooltip":"$10,000 Total Rewards"}]',
        video: '/videos/campaign/dapDapTales-1.mp4',
        dapp: [
          '/images/campaign/dapp/lynex.png',
          '/images/campaign/dapp/mendi.png',
          '/images/campaign/dapp/orbiter.png'
        ],
        category: 'linea-liquid'
      }
    ]
  },
  LineaLiquid2: {
    name: '',
    value: '$10,000',
    icon: '',
    status: StatusType.ended,
    tooltip: '$10,000 Total Rewards',
    iconSize: 20,
    odyssey: [
      {
        id: -3,
        name: 'DapDap Tales The Dark Horses',
        description:
          'Trade, Earn, and Win! The more you trade, the bigger your chance to claim legendary rewards!  Time: 21/10/2024 - 06/11/2024 3PM (UTC)',
        start_time: 1717948800002,
        end_time: 1730269192273,
        status: StatusType.ended,
        banner: '/images/campaign/linea-liquid-2/Activebanner-linea-v2.png',
        superBridgeBanner: '/images/campaign/linea-liquid-2/SuperBridge-linea-v2.png',
        superBridgeRoutes: ['Across'],
        link: '/campaign/home?category=linea-liquid-2',
        badgeValue: '$10,000',
        reward_value: '$10,000',
        simpleValue: '$10K rewards',
        showSummary: false,
        // reward: '',
        _reward: '[{"name":"$ACROSS","value":"$10K rewards","logo_key":"ACROSS1","tooltip":"$10,000 Total Rewards"}]',
        // '[{"name":"$ACROSS","value":"$10,000","logo_key":"ACROSS","tooltip":"$10,000 Total Rewards"},{"name":"$NILE","value":"$10,000","logo_key":"NILE","tooltip":"$10,000 Total Rewards"},{"name":"$ZEROLEND","value":"$10,000","logo_key":"ZEROLEND","tooltip":"$10,000 Total Rewards"}]',
        video: '/videos/campaign/dapDapTales-1.mp4',
        dapp: [
          '/images/campaign/dapp/across.png',
          'https://assets.dapdap.net/images/nile-1.png',
          'https://assets.dapdap.net/images/zerolend.png'
        ],
        category: 'linea-liquid-2'
      }
    ]
  },
  LineaMarsh: {
    name: '',
    value: '$5000+',
    icon: '',
    status: StatusType.ongoing,
    tooltip: '$5,000+ Total Rewards',
    iconSize: 20,
    odyssey: [
      {
        id: -4,
        name: 'DapDap Tales: Linea Marsh',
        description: 'Bridge, trade, and join EFrogs to climb the leaderboard and claim your share!',
        start_time: 1734411600000,
        end_time: 1736830800000,
        status: StatusType.ongoing,
        banner: '/images/campaign/linea-marsh/linea-marsh.png',
        superBridgeBanner: '/images/campaign/linea-marsh/link-banner.png',
        superBridgeRoutes: ['Across'],
        superBridgeSlogen:
          'Climb to the top 100 to earn **$5000+ valued rewards** by SuperBridge via Across route on DapDap! Time: Dec. 17, 2024 - Jan. 14, 2025 3PM (UTC)',
        superSwapBanner: '/images/campaign/linea-marsh/link-banner.png',
        superSwapRoutes: ['Lynex'],
        superSwapSlogen:
          'Climb to the top 100 to earn **$5000+ valued rewards** by SuperSwap via Lynex route on DapDap! Time: Dec. 17, 2024 - Jan. 14, 2025 3PM (UTC)',
        link: '/campaign/home?category=linea-marsh',
        badgeValue: '$5,000',
        reward_value: '$5,000',
        simpleValue: '$5K+ rewards',
        showSummary: false,
        reward:
          '[{"name":"$LYNX","value":"$5,000","logo_key":"ACROSS","tooltip":"$5,000+ Total Rewards"},{"name":"$CROAK","value":"$5,000","logo_key":"CROAK","tooltip":"$5,000 Total Rewards"},{"name":"$OLYNX","value":"$5,000","logo_key":"o_lynx","tooltip":"$5,000+ Total Rewards"}]',
        // video: '/videos/campaign/dapDapTales-1.mp4',
        // dapp: [
        //   '/images/campaign/dapp/across.png',
        //   'https://assets.dapdap.net/images/nile-1.png',
        //   'https://assets.dapdap.net/images/zerolend.png'
        // ],
        category: 'linea-marsh'
      }
    ]
  }
};

export const CampaignDAppData: { [dappName: string]: Badge[] } = {
  SwapMode: [
    {
      name: RewardIcons['SMD']?.label || '',
      value: '$20-25k',
      icon: RewardIcons['SMD']?.icon || '',
      status: StatusType.ended,
      tooltip: '$20-25k $SMD',
      iconSize: 20
    }
  ],
  'Rango Bridge': [CampaignData.Rango],
  'Rubic Bridge': [CampaignData.RubicHoldstation],
  'mendi finance': [CampaignData.LineaLiquid],
  'Orbiter Bridge': [CampaignData.LineaLiquid],
  Lynex: [CampaignData.LineaMarsh, CampaignData.LineaLiquid],
  'Lynex Liquidity': [CampaignData.LineaLiquid],
  'Lynex Lock': [CampaignData.LineaLiquid],
  Across: [CampaignData.LineaMarsh, CampaignData.LineaLiquid2],
  ZeroLend: [CampaignData.LineaLiquid2],
  'Zerolend Stake': [CampaignData.LineaLiquid2],
  Nile: [CampaignData.LineaLiquid2],
  'Nile Liquidity': [CampaignData.LineaLiquid2]
};
