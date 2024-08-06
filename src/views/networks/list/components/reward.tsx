import { memo, useMemo, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { NetworkOdyssey } from '@/views/networks/list/hooks/useNetworks';
import odysseyConfig from '@/config/odyssey';
import RewardIcons from '@/views/OdysseyV8/RewardIcons';
import { AnimatePresence, motion } from 'framer-motion';
import Tooltip from '@/views/Home/components/Tooltip';
import OdysseyCard from '@/views/Home/components/Tooltip/Odyssey';

const Reward = (props: Props) => {
  const { odyssey } = props;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const defaultValue = useMemo(() => {
    if (!odyssey || !odyssey.length) return '';
    for (const o of odyssey) {
      if (odysseyConfig[o.id]) {
        return odysseyConfig[o.id].reward;
      }
    }
    return '';
  }, [odyssey]);

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
        const idx = _badges.findIndex((it: any) => it.name === r.name)
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

  const renderBadgesTooltip = (key: string, badge: any, index: number) => {
    return badge.odyssey && hoveredIndex === index && (
      <AnimatePresence>
        <Tooltip customClass="network-odyssey-card-tooltip" key={key}>
          <StyledBadgeTooltipList>
            {
              badge.odyssey.map((ody: any) => (
                <OdysseyCard
                  key={ody.id}
                  status={ody.status}
                  title={ody.name}
                  subtitle={ody.description}
                  imageUrl={ody.banner}
                  withoutCardStyle
                />
              ))
            }
          </StyledBadgeTooltipList>
        </Tooltip>
      </AnimatePresence>
    )
  };

  return (
    <StyledContainer
      whileHover="active"
      initial="default"
    >
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
        {badges.length ? defaultValue : (defaultValue || '-')}
      </StyledValue>
      <StyledBadges>
        {
          badges.map((b, idx) => (
            <StyledBadge
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
              onHoverStart={() => {
                setHoveredIndex(idx);
              }}
              onHoverEnd={() => {
                setHoveredIndex(null);
              }}
            >
              <Image src={b.logo} alt="" width={20} height={20} />
              {renderBadgesTooltip(b.name, b, idx)}
            </StyledBadge>
          ))
        }
      </StyledBadges>
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
}

const StyledContainer = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
`;
const StyledValue = styled(motion.div)`
  color: #979ABE;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`;
const StyledBadges = styled.div`
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
  margin-left: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  &:first-child {
    margin-left: 0;
  }
  
  .network-odyssey-card-tooltip {
    width: auto;
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
