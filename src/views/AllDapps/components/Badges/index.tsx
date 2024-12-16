import { AnimatePresence } from 'framer-motion';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import TooltipSimple from '@/components/Tooltip';
import odyssey from '@/config/odyssey';
import { formatValueDecimal } from '@/utils/formate';
import OdysseyCard from '@/views/Home/components/Tooltip/Odyssey';
import type { NetworkOdyssey } from '@/views/networks/list/hooks/useNetworks';
import type { StatusType } from '@/views/Odyssey/components/Tag';
import RewardIcons from '@/views/OdysseyV8/RewardIcons';

import { StyledBadge, StyledBadgeImage, StyledBadgeItem, StyledBadgeTooltip, StyledContainer } from './styles';

const Badges = (props: Props) => {
  const { rewards, tradingVolume, tvl, users, tradingVolumeTooltip, usersTooltip, customBadges = [], isCenter } = props;

  const router = useRouter();
  const rewardListRef = useRef<any>();

  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>();

  const initBadges: Badge[] = [
    {
      name: 'TVL',
      icon: '/images/alldapps/icon-tvl.svg',
      value: formatValueDecimal(tvl, '$', 2, true),
      iconSize: 17,
      tooltip: 'TVL'
    },
    {
      name: 'Volume (24h)',
      icon: '/images/alldapps/icon-exchange.svg',
      value: formatValueDecimal(tradingVolume, '$', 2, true),
      iconSize: 17,
      tooltip: tradingVolumeTooltip || 'Volume (24h)'
    },
    ...customBadges
  ];

  const onBadgeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, badge: Badge) => {
    e.stopPropagation();
  };

  const onOdysseyClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, ody: any) => {
    e.stopPropagation();
    router.push(ody.link || odyssey[ody.id]?.path);
  };

  const onRewardHover = () => {
    if (!rewardListRef.current) return;
    rewardListRef.current.scrollTo({
      left: rewardListRef.current.scrollWidth,
      behavior: 'smooth'
    });
  };

  const onRewardLeave = () => {
    if (!rewardListRef.current) return;
    rewardListRef.current.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  };

  const renderBadgesTooltip = (key: string, badge: Badge, index: number, children: any) => {
    return (
      <AnimatePresence>
        <TooltipSimple
          key={key}
          triggerContainerStyle={{ display: 'flex', justifyContent: 'center' }}
          style={{
            background: 'unset',
            padding: 0,
            borderRadius: 0,
            border: 0
          }}
          tooltip={
            badge.odyssey && (
              <StyledBadgeTooltip>
                {badge.odyssey.map((ody, index) => (
                  <OdysseyCard
                    key={index}
                    status={ody.status}
                    title={ody.name}
                    subtitle={ody.description}
                    imageUrl={ody.banner}
                    withoutCardStyle
                    reward={{ value: ody.badgeValue as string, name: badge.name as string }}
                    onClick={(e) => onOdysseyClick(e, ody)}
                    isCampaign={ody.tag === 'tales'}
                    category={ody.category}
                  />
                ))}
              </StyledBadgeTooltip>
            )
          }
        >
          {children}
        </TooltipSimple>
      </AnimatePresence>
    );
  };

  const renderBadges = () => {
    if (!initBadges?.length) return null;

    const hasOdysseyReward = initBadges.some((badge) => badge.odyssey?.[0]?.reward);

    if (!hasOdysseyReward) {
      return initBadges.map((badge: Badge, index: number) => {
        const iconSize = getIconSize(badge.iconSize);
        return (
          <TooltipSimple tooltip={badge.tooltip} key={index}>
            <StyledBadge
              whileHover="active"
              initial="default"
              onClick={(e) => onBadgeClick(e, badge)}
              $status={badge.status}
            >
              {badge.icon && (
                <StyledBadgeImage
                  src={badge.icon}
                  alt=""
                  width={iconSize.w}
                  height={iconSize.h}
                  variants={{
                    active: {
                      scale: 1.2,
                      zIndex: 2
                    },
                    default: {
                      zIndex: 1
                    }
                  }}
                />
              )}
              {badge.value}
            </StyledBadge>
          </TooltipSimple>
        );
      });
    }

    return (
      <>
        {initBadges.slice(0, 2).map((badge: Badge, index: number) => (
          <TooltipSimple tooltip={badge.tooltip} key={index}>
            <StyledBadge onClick={(e) => onBadgeClick(e, badge)} whileHover="active" initial="default">
              <StyledBadgeImage
                src={badge.icon}
                alt=""
                width={getIconSize(badge.iconSize).w}
                height={getIconSize(badge.iconSize).h}
                variants={{
                  active: {
                    scale: 1.2,
                    zIndex: 2
                  },
                  default: {
                    zIndex: 1
                  }
                }}
              />
              {badge.value}
            </StyledBadge>
          </TooltipSimple>
        ))}

        {initBadges.slice(2).map((badge: Badge, groupIndex: number) => {
          const rewards = badge.odyssey?.[0]?.reward ? JSON.parse(badge.odyssey[0].reward) : null;

          if (!rewards) {
            return renderBadgesTooltip(
              'single',
              badge,
              groupIndex,
              <StyledBadge
                key={groupIndex}
                whileHover="active"
                initial="default"
                onClick={(e) => onBadgeClick(e, badge)}
                onHoverStart={onRewardHover}
                onHoverEnd={onRewardLeave}
                $status={badge.status}
              >
                {badge.icon && (
                  <StyledBadgeImage
                    src={badge.icon}
                    alt=""
                    width={getIconSize(badge.iconSize).w}
                    height={getIconSize(badge.iconSize).h}
                    variants={{
                      active: {
                        scale: 1.2,
                        zIndex: 2
                      },
                      default: {
                        zIndex: 1
                      }
                    }}
                  />
                )}
                {badge.odyssey?.length && badge.odyssey[0].category === 'linea-liquid-2'
                  ? badge.odyssey[0].simpleValue
                  : badge.value}
              </StyledBadge>
            );
          }

          return (
            <StyledBadge key={groupIndex} className="group" onHoverStart={onRewardHover} onHoverEnd={onRewardLeave}>
              {badge.value}&#20;
              {rewards.map((reward: any, rewardIndex: number) => (
                <StyledBadgeItem
                  key={`${groupIndex}-${rewardIndex}`}
                  initial="hidden"
                  whileHover="visible"
                  onClick={(e) => onOdysseyClick(e, badge.odyssey?.[0])}
                >
                  {renderBadgesTooltip(
                    'group',
                    badge,
                    rewardIndex,
                    <StyledBadgeImage
                      src={RewardIcons[reward.logo_key]?.icon || ''}
                      alt=""
                      width={20}
                      height={20}
                      initial={{ zIndex: 1 }}
                      whileHover={{ scale: 1.2, zIndex: 2 }}
                    />
                  )}
                </StyledBadgeItem>
              ))}
            </StyledBadge>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    if (!rewardListRef.current || !isCenter) return;
    if (rewardListRef.current.scrollWidth > rewardListRef.current.clientWidth) {
      setContainerStyle({ justifyContent: 'flex-start' });
    } else {
      setContainerStyle({ justifyContent: 'center' });
    }
  }, [isCenter]);

  return (
    <StyledContainer ref={rewardListRef} style={containerStyle}>
      {renderBadges()}
    </StyledContainer>
  );
};

export default Badges;

export interface Props {
  rewards?: Partial<NetworkOdyssey>[];
  tradingVolume: string | number;
  tvl: string | number;
  users: string | number;
  tradingVolumeTooltip?: string;
  usersTooltip?: string;
  customBadges?: Badge[];
  isCenter?: boolean;
}

export interface Badge {
  name?: string;
  icon: string;
  // if you need to specify different width and height
  // please pass in an array: [width, height]
  iconSize: number | number[];
  value?: string | number;
  status?: StatusType;
  odyssey?: Record<string, any>[];
  tooltip?: string;
}

const getIconSize = (size: number | number[]) => {
  if (Array.isArray(size)) {
    return {
      w: size[0],
      h: size[1]
    };
  }
  return {
    w: size,
    h: size
  };
};
