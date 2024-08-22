import { useDebounceFn } from 'ahooks';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { memo, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import odysseies from '@/config/odyssey';
import TooltipSimple from '@/views/AllDapps/components/Badges/Tooltip';
import OdysseyCard from '@/views/Home/components/Tooltip/Odyssey';
import { type NetworkOdyssey } from '@/views/networks/list/hooks/useNetworks';
import RewardIcons from '@/views/OdysseyV8/RewardIcons';

const Reward = (props: Props) => {
  const { odyssey } = props;

  const router = useRouter();
  const containerRef = useRef<any>(null);

  const [overflow, setOverflow] = useState(false);
  const [overflowVisible, setOverflowVisible] = useState(false);

  const badges = useMemo<Badge[]>(() => {
    if (!odyssey || !odyssey.length) return [];
    const _badges: any = [];
    for (const o of odyssey) {
      let rewards = [];
      try {
        rewards = JSON.parse(o.reward);
      } catch (err) {
        console.log(err);
      }
      rewards.forEach((r: any) => {
        const idx = _badges.findIndex((it: any) => it.name === r.name);
        if (idx < 0) {
          _badges.push({
            ...r,
            logo: RewardIcons[r.logo_key]?.icon ?? '',
            odyssey: [o],
          });
          return;
        }
        if (!_badges[idx].odyssey.some((it: any) => it.id === o.id)) {
          _badges[idx].odyssey.push(o);
        }
      });
    }
    return _badges;
  }, [odyssey]);

  const onOdyClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, ody: any) => {
    router.push(odysseies[ody.id]?.path);
  };

  const onBadgeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, badge: any) => {
    e.stopPropagation();
    console.log('badge: %o', badge);
  };

  const { run: onRewardLeave, cancel: onRewardLeaveCancel } = useDebounceFn(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
    setOverflowVisible(true);
  }, { wait: 300 });

  const onRewardHover = () => {
    if (!containerRef.current) return;
    onRewardLeaveCancel();
    containerRef.current.scrollTo({
      left: containerRef.current.scrollWidth,
      behavior: 'smooth',
    });
    setOverflowVisible(false);
  };

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    setOverflow(isOverflowX(containerRef.current));
    setOverflowVisible(true);
  }, []);

  return (
    <StyledContainer
      whileHover="active"
      initial="default"
    >
      <StyledContainerInner ref={containerRef}>
        <StyledValue
          variants={{
            active: {
              color: '#fff',
            },
            default: {
              color: '#979ABE',
            },
          }}
          transition={{
            duration: 0.3,
          }}
        >
          {badges.length ? `${badges[0].value} ${badges[0].name.toUpperCase()}` : ''}
        </StyledValue>
        <StyledBadges
          onHoverStart={onRewardHover}
          onHoverEnd={onRewardLeave}
        >
          {
            badges.map((b, idx) => (
              <StyledBadge
                key={idx}
                whileHover="tooltip"
                initial="default"
                variants={{
                  tooltip: {
                    scale: 1.2,
                    zIndex: 2,
                  },
                  default: {
                    scale: 1,
                  },
                }}
                transition={{
                  duration: 0.3,
                }}
                onClick={(e) => onBadgeClick(e, b)}
              >
                <TooltipSimple
                  tooltip={b.odyssey && (
                    <StyledBadgeTooltipList>
                      {
                        b.odyssey.map((ody: any) => (
                          <OdysseyCard
                            key={ody.id}
                            status={ody.status}
                            title={ody.name}
                            subtitle={ody.description}
                            imageUrl={ody.banner}
                            withoutCardStyle
                            onClick={(e) => onOdyClick(e, ody)}
                          />
                        ))
                      }
                    </StyledBadgeTooltipList>
                  )}
                  style={{
                    border: 0,
                  }}
                >
                  <Image className="badge-img" src={b.logo} alt="" width={20} height={20} />
                </TooltipSimple>
              </StyledBadge>
            ))
          }
        </StyledBadges>
      </StyledContainerInner>
      <AnimatePresence>
        {
          overflow && overflowVisible ? (
            <StyledBadge
              className="overflowed"
              initial="hidden"
              exit="hidden"
              animate="visible"
              variants={{
                visible: {
                  opacity: 1,
                  zIndex: 2,
                },
                hidden: {
                  opacity: 0,
                  zIndex: 1,
                },
              }}
              transition={{
                duration: 0.3,
              }}
              onHoverStart={onRewardHover}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="11" fill="black" stroke="#292B33" strokeWidth="2" />
                <circle cx="8.36368" cy="11.9999" r="0.909091" fill="#979ABE" />
                <circle cx="12" cy="11.9999" r="0.909091" fill="#979ABE" />
                <circle cx="15.6364" cy="11.9999" r="0.909091" fill="#979ABE" />
              </svg>
            </StyledBadge>
          ) : null
        }
      </AnimatePresence>
    </StyledContainer>
  );
};

export default memo(Reward);

export interface Props {
  odyssey: NetworkOdyssey[];
}

export interface Badge {
  name: string;
  value: string;
  logo_key: string;
  logo: string;
  odyssey?: any[];
}

function isOverflowX(element: any) {
  return element.scrollWidth > element.clientWidth;
}

const StyledContainer = styled(motion.div)`
  width: 100%;
  position: relative;
`;
const StyledContainerInner = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
  width: 100%;
  padding: 4px 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const StyledValue = styled(motion.div)`
  color: #979ABE;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  white-space: nowrap;
`;
const StyledBadges = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;
const StyledBadge = styled(motion.div)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #292B33;
  background: #292B33;
  margin-left: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
  }

  .badge-img {
    width: 20px;
    height: 20px;
  }

  &.overflowed {
    position: absolute;
    right: -14px;
    top: 4px;
  }
`;
const StyledBadgeTooltipList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 14px;
  gap: 20px;
  background: #21232A;
`;
