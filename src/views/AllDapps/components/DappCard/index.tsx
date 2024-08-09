import React, { useMemo } from 'react';
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
  StyledDappCardTitle,
} from './styles';
import Image from 'next/image';
import Badges, { Badge } from '@/views/AllDapps/components/Badges';
import { StatusType } from '@/views/Odyssey/components/Tag';
import RewardIcons from '@/views/OdysseyV8/RewardIcons';

const DAppRewardList: { [k: string]: Badge[] } = {
  SwapMode: [
    {
      name: RewardIcons['SMD']?.label || '',
      value: '$20-25k',
      icon: RewardIcons['SMD']?.icon || '',
      status: StatusType.ended,
      tooltip: '$20-25k $SMD',
      iconSize: 20,
    },
  ],
};

const DappCard = (props: Props) => {
  const {
    name,
    logo,
    description,
    categories,
    networks,
    bp = {},
    onClick = () => {
    },
    users = 0,
    tradingVolume = 0,
  } = props;

  const rewardList = useMemo(() => {
    const _rewardList: Badge[] = [];
    if (DAppRewardList[name]) {
      DAppRewardList[name].forEach((b) => {
        _rewardList.push(b);
      });
    }
    return _rewardList;
  }, [name]);

  return (
    <StyledDappCard data-bp={bp?.dapp} onClick={onClick}>
      <StyledDappCardHead $logo={logo}>
        <StyledDappCardCategory>
          {
            categories && categories.map((cate, index) => (
              <StyledDappCardCategoryItem
                key={cate.key || index}
                $colorRgb={cate.colorRgb}
              >
                {cate.label}
              </StyledDappCardCategoryItem>
            ))
          }
        </StyledDappCardCategory>
        <StyledDappCardNetworks>
          {
            networks && networks.map((network, index) => (
              <Image
                src={network.icon}
                alt=""
                width={20}
                height={20}
                key={network.chainId || index}
              />
            ))
          }
        </StyledDappCardNetworks>
      </StyledDappCardHead>
      <StyledDappCardBody>
        <StyledDappCardTitle>
          <StyledDappCardLogo $logo={logo} />
          <StyledDappCardName>{name}</StyledDappCardName>
        </StyledDappCardTitle>
        <StyledDappCardDescription>
          {description}
        </StyledDappCardDescription>
        <Badges
          customBadges={rewardList}
          users={users}
          tradingVolume={tradingVolume}
        />
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
  users: number | string;
  categories?: Category[];
  networks?: Network[];
  bp?: bp;
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
