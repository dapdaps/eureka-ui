import React, { useMemo, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import OdysseyCard from '@/views/Home/components/Tooltip/Odyssey';
import odyssey from '@/config/odyssey';
import { useRouter } from 'next/router';
import { StyledBadge, StyledBadgeImage, StyledBadgeItem, StyledBadgeTooltip, StyledContainer } from './styles';
import { formatIntegerThousandsSeparator } from '@/utils/format-number';
import { cloneDeep } from 'lodash';
import RewardIcons from '@/views/OdysseyV8/RewardIcons';
import { NetworkOdyssey } from '@/views/networks/list/hooks/useNetworks';
import { StatusType } from '@/views/Odyssey/components/Tag';
import TooltipSimple from './Tooltip';

const Badges = (props: Props) => {
  const {
    rewards,
    tradingVolume,
    users,
    tradingVolumeTooltip,
    usersTooltip,
    customBadges = [],
  } = props;

  const router = useRouter();
  const rewardListRef = useRef<any>();

  const initBadges: Badge[] = [
    {
      name: 'Trading Volume',
      icon: '/images/alldapps/icon-exchange.svg',
      value: '$' + formatIntegerThousandsSeparator(tradingVolume, 2),
      iconSize: 17,
      tooltip: tradingVolumeTooltip || 'Trading Volume',
    },
    {
      name: 'User Amount',
      icon: '/images/alldapps/icon-fire.svg',
      value: formatIntegerThousandsSeparator(users, 0),
      iconSize: 17,
      tooltip: usersTooltip || 'User Amount',
    },
    ...customBadges,
  ];

  const allBadges: Badge[] = useMemo(() => {
    const _badges: any = cloneDeep(initBadges);
    if (rewards && rewards.length) {
      const rewardActivities = rewards.map((b) => ({
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
              value: reward.value,
              status: activity.status,
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
  }, [rewards]);

  const onBadgeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, badge: Badge) => {
    e.stopPropagation();
  };

  const onOdysseyClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, ody: any) => {
    e.stopPropagation();
    router.push(odyssey[ody.id]?.path);
  };

  const onRewardHover = () => {
    if (!rewardListRef.current) return;
    rewardListRef.current.scrollTo({
      left: rewardListRef.current.scrollWidth,
      behavior: 'smooth',
    });
  };

  const onRewardLeave = () => {
    if (!rewardListRef.current) return;
    rewardListRef.current.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  };

  const renderBadgesTooltip = (key: string, badge: Badge, index: number, children: any) => {
    return (
      <AnimatePresence>
        <TooltipSimple
          key={key}
          style={{
            background: 'unset',
            padding: 0,
            borderRadius: 0,
          }}
          tooltip={badge.odyssey && (
            <StyledBadgeTooltip>
              {
                badge.odyssey.map((ody) => (
                  <OdysseyCard
                    status={ody.status}
                    title={ody.name}
                    subtitle={ody.description}
                    imageUrl={ody.banner}
                    withoutCardStyle
                    reward={{ value: ody.badgeValue as string, name: badge.name as string }}
                    onClick={(e) => onOdysseyClick(e, ody)}
                  />
                ))
              }
            </StyledBadgeTooltip>
          )}
        >
          {children}
        </TooltipSimple>
      </AnimatePresence>
    );
  };

  const renderBadges = () => {
    if (!allBadges) return null;
    if (allBadges.length <= 3) {
      return allBadges.map((badge: Badge, index: number) => {
        const iconSize = getIconSize(badge.iconSize);
        if (!badge.odyssey) {
          return (
            <TooltipSimple tooltip={badge.tooltip} key={index}>
              <StyledBadge
                whileHover="active"
                initial="default"
                onClick={(e) => onBadgeClick(e, badge)}
                $status={badge.status}
              >
                <StyledBadgeImage
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
                {badge.value}
              </StyledBadge>
            </TooltipSimple>
          );
        }
        return renderBadgesTooltip('single', badge, index, (
          <StyledBadge
            whileHover="active"
            initial="default"
            onClick={(e) => onBadgeClick(e, badge)}
            onHoverStart={onRewardHover}
            onHoverEnd={onRewardLeave}
          >
            <StyledBadgeImage
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
            {badge.value}
          </StyledBadge>
        ));
      });
    }
    return (
      <>
        {
          allBadges.slice(0, 2).map((badge: Badge, index: number) => (
            <TooltipSimple tooltip={badge.tooltip} key={index}>
              <StyledBadge
                onClick={(e) => onBadgeClick(e, badge)}
                whileHover="active"
                initial="default"
              >
                <StyledBadgeImage
                  src={badge.icon}
                  alt=""
                  width={getIconSize(badge.iconSize).w}
                  height={getIconSize(badge.iconSize).h}
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
                {badge.value}
              </StyledBadge>
            </TooltipSimple>
          ))
        }
        <StyledBadge
          className="group"
          onHoverStart={onRewardHover}
          onHoverEnd={onRewardLeave}
        >
          {
            allBadges.slice(2).map((badge: Badge, index: number) => (
              <StyledBadgeItem
                key={index}
                initial="hidden"
                whileHover="visible"
                onClick={(e) => onBadgeClick(e, badge)}
              >
                {
                  renderBadgesTooltip('group', badge, index, (
                    <StyledBadgeImage
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
                  ))
                }
              </StyledBadgeItem>
            ))
          }
        </StyledBadge>
      </>
    );
  };

  return (
    <StyledContainer ref={rewardListRef}>
      {renderBadges()}
    </StyledContainer>
  );
};

export default Badges;

export interface Props {
  rewards?: Partial<NetworkOdyssey>[];
  tradingVolume: string | number;
  users: string | number;
  tradingVolumeTooltip?: string;
  usersTooltip?: string;
  customBadges?: Badge[];
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
      h: size[1],
    };
  }
  return {
    w: size,
    h: size,
  };
};