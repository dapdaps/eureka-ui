import { useMemo } from 'react';
import {
  StyledDappCard,
  StyledDappCardBadge,
  StyledDappCardBody,
  StyledDappCardCategory,
  StyledDappCardCategoryItem,
  StyledDappCardDescription,
  StyledDappCardHead,
  StyledDappCardLogo,
  StyledDappCardName,
  StyledDappCardNetworks,
  StyledDappCardStatics,
  StyledDappCardTitle,
} from './styles';
import Image from 'next/image';
import { cloneDeep } from 'lodash';
import RewardIcons from '@/views/OdysseyV8/RewardIcons';
import { formateInteger, simplifyNum } from '@/utils/format-number';

const DappCard = (props: Props) => {
  const {
    name,
    logo,
    description,
    categories,
    networks,
    badges,
    bp = {},
    onClick = () => {},
    participants = 0,
    trading_volume = 0
  } = props;

  const initBadges:Badge[] = [
    {
      icon: '/images/alldapps/icon-exchange.svg',
      value: '$' + simplifyNum(trading_volume),
      iconSize: 17,
    },
    {
      icon: '/images/alldapps/icon-fire.svg',
      value: formateInteger(participants ?? 0),
      iconSize: 17
    }
  ]

  const allBadges: Badge[] = useMemo(() => {
    const _badges: any = cloneDeep(initBadges);
    if (badges && badges.length) {
      const rewardBadges = badges.map((b: any) => ({
        ...b,
        rewards: b.reward ? JSON.parse(b.reward) : null
      }))
      console.log(rewardBadges);
      rewardBadges.forEach((item: any) => {
        if (item.rewards) {
          item.rewards.forEach((re: { logo_key: string, value: string |  number }) => {
            const _icon =  RewardIcons[re.logo_key]?.icon ?? '';
            if (!(_badges.find((b:Badge) => b.icon === _icon))) {
              _badges.push({
                icon: _icon ?? '',
                value: re.value,
                iconSize: 24,
                logo_key: re.logo_key,
                odyssey: []
              })
            }
          })
        }
      })
      rewardBadges.forEach((item: any) => {
        if (item.rewards) {
          item.rewards.forEach((it: any) => {
            const _finded = _badges.find((b:any) => b.logo_key === it.logo_key);
            if (_finded && !(_finded.odyssey.find((odyssey: any) => odyssey.id === item.id))) {
              _finded.odyssey.push(item);
            }
          })
        }
      })
    }
    console.log(badges, _badges);
    return _badges;
  }, [badges])

  const renderBadges = () => {
    if (!allBadges) return null;
    if (allBadges.length <= 3) {
      return allBadges.map((badge: Badge, index: number) => {
        const iconSize = getIconSize(badge.iconSize);
        return (
          <StyledDappCardBadge key={index}>
            <Image src={badge.icon} alt="" width={iconSize.w} height={iconSize.h} />
            {badge.value}
          </StyledDappCardBadge>
        );
      });
    }
    return (
      <>
        {
          allBadges.slice(0, 2).map((badge: Badge, index: number) => (
            <StyledDappCardBadge key={index}>
              <Image
                src={badge.icon}
                alt=""
                width={getIconSize(badge.iconSize).w}
                height={getIconSize(badge.iconSize).h}
              />
              {badge.value}
            </StyledDappCardBadge>
          ))
        }
        <StyledDappCardBadge className="group">
          {
            allBadges.slice(2).map((badge: Badge, index: number) => (
              <Image
                key={index}
                src={badge.icon}
                alt=""
                width={getIconSize(badge.iconSize).w}
                height={getIconSize(badge.iconSize).h}
              />
            ))
          }
        </StyledDappCardBadge>
      </>
    );
  };

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
        <StyledDappCardStatics>
          {renderBadges()}
        </StyledDappCardStatics>
      </StyledDappCardBody>
    </StyledDappCard>
  );
};

export default DappCard;

const getIconSize = (size: number | number[]) => {
  if (Array.isArray(size)) {
    return {
      w: size[0],
      h: size[1],
    };
  }
  return {
    w: size,
    h: size,
  };
};

export interface Props {
  name: string;
  logo: string;
  description?: string;
  trading_volume?: number;
  participants?: number;
  categories?: Category[];
  networks?: Network[];
  badges?: Badge[];
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

export interface Badge {
  icon: string;
  // if you need to specify different width and height
  // please pass in an array: [width, height]
  iconSize: number | number[];
  value?: string | number;
  odyssey?: Record<string, any>[];
}

export interface Rewards {
  chain_id: string;
  network_id: string;
  reward: string;
}