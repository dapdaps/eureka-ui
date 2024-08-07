import React, { useMemo, useState } from 'react';
import {
  StyledDappCard,
  StyledDappCardBadge, StyledDappCardBadgeImage,
  StyledDappCardBadgeItem,
  StyledDappCardBadgeTooltipList,
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
import { formatIntegerThousandsSeparator } from '@/utils/format-number';
import OdysseyCard from '@/views/Home/components/Tooltip/Odyssey';
import Tooltip from '@/views/Home/components/Tooltip';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import odyssey from '@/config/odyssey';

const DappCard = (props: Props) => {
  const {
    name,
    logo,
    description,
    categories,
    networks,
    badges,
    bp = {},
    onClick = () => {
    },
    participants = 0,
    trading_volume = 0,
  } = props;

  const router = useRouter();

  const initBadges: Badge[] = [
    {
      name: 'tradingVolume',
      icon: '/images/alldapps/icon-exchange.svg',
      value: '$' + formatIntegerThousandsSeparator(trading_volume),
      iconSize: 17,
    },
    {
      name: 'participants',
      icon: '/images/alldapps/icon-fire.svg',
      value: formatIntegerThousandsSeparator(participants),
      iconSize: 17,
    },
  ];

  const allBadges: Badge[] = useMemo(() => {
    const _badges: any = cloneDeep(initBadges);
    if (badges && badges.length) {
      const rewardActivities = badges.map((b: any) => ({
        ...b,
        rewards: b.reward ? JSON.parse(b.reward) : null,
      }));
      for (const activity of rewardActivities) {
        if (!activity.rewards) continue;
        activity.rewards.forEach((reward: any) => {
          const currIdx = _badges.findIndex((it: any) => it.name === reward.name);
          if (currIdx < 0) {
            _badges.push({
              name: reward.name,
              icon: RewardIcons[reward.logo_key]?.icon ?? '',
              iconSize: 20,
              defaultValue: reward.value,
              odyssey: [{
                ...activity,
                badgeValue: reward.value,
              }],
            });
          } else {
            if (!_badges[currIdx].odyssey.some((ody: any) => ody.id === activity.id)) {
              _badges[currIdx].odyssey.push({
                ...activity,
                badgeValue: reward.value,
              });
            }
          }
        });
      }
    }
    return _badges;
  }, [badges]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const onBadgeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, badge: Badge) => {
    e.stopPropagation();
  };

  const onOdysseyClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, ody: any) => {
    e.stopPropagation();
    router.push(odyssey[ody.id]?.path);
  };

  const renderBadgesTooltip = (key: string, badge: Badge, index: number) => {
    return badge.odyssey && hoveredIndex === index && (
      <AnimatePresence>
        <Tooltip customClass="dapp-card-odyssey-tooltip" key={key}>
          <StyledDappCardBadgeTooltipList>
            {
              badge.odyssey.map((ody) => (
                <OdysseyCard
                  status={ody.status}
                  title={ody.name}
                  subtitle={ody.description}
                  imageUrl={ody.banner}
                  withoutCardStyle
                  onClick={(e) => onOdysseyClick(e, ody)}
                />
              ))
            }
          </StyledDappCardBadgeTooltipList>
        </Tooltip>
      </AnimatePresence>
    );
  };

  const renderBadges = () => {
    if (!allBadges) return null;
    if (allBadges.length <= 3) {
      return allBadges.map((badge: Badge, index: number) => {
        const iconSize = getIconSize(badge.iconSize);
        return (
          <StyledDappCardBadge
            key={index}
            whileHover="active"
            initial="default"
            onHoverStart={() => {
              setHoveredIndex(index);
            }}
            onHoverEnd={() => {
              setHoveredIndex(null);
            }}
            onClick={(e) => onBadgeClick(e, badge)}
          >
            <StyledDappCardBadgeImage
              src={badge.icon}
              alt=""
              width={iconSize.w}
              height={iconSize.h}
              variants={{
                active: {
                  scale: 1.2,
                  zIndex: 2,
                },
                default: {
                  zIndex: 1,
                },
              }}
            />
            {badge.defaultValue || badge.value}
            {renderBadgesTooltip('single', badge, index)}
          </StyledDappCardBadge>
        );
      });
    }
    return (
      <>
        {
          allBadges.slice(0, 2).map((badge: Badge, index: number) => (
            <StyledDappCardBadge
              key={index}
              onClick={(e) => onBadgeClick(e, badge)}
            >
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
              <StyledDappCardBadgeItem
                initial="hidden"
                whileHover="visible"
                onHoverStart={() => {
                  setHoveredIndex(index);
                }}
                onHoverEnd={() => {
                  setHoveredIndex(null);
                }}
                onClick={(e) => onBadgeClick(e, badge)}
              >
                <StyledDappCardBadgeImage
                  key={index}
                  src={badge.icon}
                  alt=""
                  width={getIconSize(badge.iconSize).w}
                  height={getIconSize(badge.iconSize).h}
                  initial={{
                    zIndex: 1,
                  }}
                  whileHover={{
                    scale: 1.2,
                    zIndex: 2,
                  }}
                />
                {renderBadgesTooltip('group', badge, index)}
              </StyledDappCardBadgeItem>
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
  name?: string;
  icon: string;
  // if you need to specify different width and height
  // please pass in an array: [width, height]
  iconSize: number | number[];
  value?: string | number;
  defaultValue?: string | number;
  odyssey?: Record<string, any>[];
}

export interface Rewards {
  chain_id: string;
  network_id: string;
  reward: string;
}