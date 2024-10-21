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
        id: 0,
        name: 'Rubic x Holdstation Campaign：Play Lottery and Win Medals',
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
    status: StatusType.ongoing,
    tooltip: '$10,000 Total Rewards',
    iconSize: 20,
    odyssey: [
      {
        id: -2,
        name: 'DapDap Tales: Linea Liquid Legends',
        description:
          'Trade, Earn, and Win! The more you trade, the bigger your chance to claim legendary rewards!  Time: 14/10/2024 - 30/10/2024 3PM (UTC)',
        end_time: 1730332800000,
        status: StatusType.ongoing,
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
  Lynex: [CampaignData.LineaLiquid],
  'Lynex Liquidity': [CampaignData.LineaLiquid],
  'Lynex Lock': [CampaignData.LineaLiquid]
};
