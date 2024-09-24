import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import type { Badge } from '@/views/AllDapps/components/Badges';
import Badges from '@/views/AllDapps/components/Badges';
import { StatusType } from '@/views/Odyssey/components/Tag';
import RewardIcons from '@/views/OdysseyV8/RewardIcons';

import {
  StyledDappCard,
  StyledDappCardBody,
  StyledDappCardCategory,
  StyledDappCardCategoryItem,
  StyledDappCardDescription,
  StyledDappCardHead,
  StyledDappCardLogo,
  StyledDappCardName,
  StyledDappCardNetworks,
  StyledDappCardTitle
} from './styles';

const DAppRewardList: { [k: string]: Badge[] } = {
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
  // ['Rango Bridge']: [
  //   {
  //     name: RewardIcons['USDC']?.label || '',
  //     value: '$1000',
  //     icon: RewardIcons['USDC']?.icon || '',
  //     status: StatusType.ended,
  //     tooltip: 'Related reward on DapDap',
  //     iconSize: 20,
  //     odyssey: [
  //       {
  //         name: 'Rango Exchange X DapDap：Win USDC by Birdging via Rango on DapDap!',
  //         start_time: 1717948800000,
  //         end_time: 1719244800000,
  //         status: 'ongoing',
  //         link: '/bridge-x/rango',
  //         banner: '/images/odyssey/rango-banner-round.png',
  //         badgeValue: '$1000'
  //       }
  //     ]
  //   }
  // ],
  ['Rubic Bridge']: [
    {
      name: RewardIcons['USDT']?.label || '',
      value: '$7500',
      icon: RewardIcons['USDT']?.icon || '',
      status: StatusType.ongoing,
      tooltip: 'Related reward on DapDap',
      iconSize: 20,
      odyssey: [
        {
          name: 'Rubic x Holdstation Campaign：Play Lottery and Win Medals',
          status: 'ongoing',
          link: '/campaign/home?category=rubic-holdstation',
          banner: '/images/campaign/rubic-holdstation/link-banner.png',
          badgeValue: '$7500'
        }
      ]
    }
  ]
};

const DappCard = (props: Props) => {
  const {
    name,
    logo,
    description,
    categories,
    networks,
    bp = {},
    onClick = () => {},
    tvl = 0,
    users = 0,
    tradingVolume = 0,
    route
  } = props;

  const router = useRouter();

  const rewardList = useMemo(() => {
    const _rewardList: Badge[] = [];
    if (DAppRewardList[name]) {
      DAppRewardList[name].forEach((b) => {
        _rewardList.push(b);
      });
    }
    return _rewardList;
  }, [name]);

  useEffect(() => {
    if (!route) return;
    router.prefetch(route);
  }, [route]);

  return (
    <StyledDappCard data-bp={bp?.dapp} onClick={onClick}>
      <StyledDappCardHead $logo={logo}>
        <StyledDappCardCategory>
          {categories &&
            categories.map((cate, index) => (
              <StyledDappCardCategoryItem key={cate.key || index} $colorRgb={cate.colorRgb}>
                {cate.label}
              </StyledDappCardCategoryItem>
            ))}
        </StyledDappCardCategory>
        <StyledDappCardNetworks>
          {networks &&
            networks.map((network, index) => (
              <Image src={network.icon} alt="" width={20} height={20} key={network.chainId || index} />
            ))}
        </StyledDappCardNetworks>
      </StyledDappCardHead>
      <StyledDappCardBody>
        <StyledDappCardTitle>
          <StyledDappCardLogo $logo={logo} />
          <StyledDappCardName>{name}</StyledDappCardName>
        </StyledDappCardTitle>
        <StyledDappCardDescription>{description}</StyledDappCardDescription>
        <Badges customBadges={rewardList} tvl={tvl} users={users} tradingVolume={tradingVolume} />
      </StyledDappCardBody>
    </StyledDappCard>
  );
};

export default DappCard;

export interface Props {
  name: string;
  logo: string;
  description?: string;
  tradingVolume: number | string;
  tvl: number | string;
  users: number | string;
  categories?: Category[];
  networks?: Network[];
  bp?: bp;
  route?: string;
  onClick?: () => void;
}

interface bp {
  detail?: string;
  dapp?: string;
}

export interface Category {
  key?: string | number;
  // just r,g,b
  // such as: 255,255,255
  colorRgb: string;
  label: string;
}

export interface Network {
  chainId?: number;
  icon: string;
}
