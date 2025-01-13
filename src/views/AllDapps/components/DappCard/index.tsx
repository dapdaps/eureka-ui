import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { CampaignDAppData } from '@/data/campaign';
import type { Badge } from '@/views/AllDapps/components/Badges';
import Badges from '@/views/AllDapps/components/Badges';

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
    if (CampaignDAppData[name]) {
      CampaignDAppData[name].forEach((b) => {
        _rewardList.push(b);
      });
    }
    return _rewardList.sort((a, b) => {
      if (!a.status) return 1;
      if (!b.status) return -1;

      if (a.status === 'ongoing' && b.status !== 'ongoing') return -1;
      if (b.status === 'ongoing' && a.status !== 'ongoing') return 1;

      if (a.status === 'ended' && b.status !== 'ended') return -1;
      if (b.status === 'ended' && a.status !== 'ended') return 1;

      return 0;
    });
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
        <Badges customBadges={rewardList} tvl={tvl} users={users} tradingVolume={tradingVolume} rewards={rewardList} />
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
