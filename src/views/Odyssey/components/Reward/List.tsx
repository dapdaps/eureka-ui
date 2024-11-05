import { AnimatePresence, useMotionValue } from 'framer-motion';
import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import type { CSSProperties } from 'styled-components';
import styled from 'styled-components';

import { FormattedRewardList } from '@/views/AllDapps/hooks/useDappReward';
import Tooltip from '@/views/Home/components/Tooltip';
import OdysseyCard from '@/views/Home/components/Tooltip/Odyssey';
import RewardIconsMap from '@/views/OdysseyV8/RewardIcons';

import type { StatusType } from '../Tag';
import { parseReward } from '.';

const ToolList = styled.div`
  display: flex;
  align-items: center;

  .box {
    position: relative;

    &:not(:first-child) {
      margin-left: -2px;
    }
  }
`;

const StyledTagChain = styled(motion.div)`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 1px solid #292b33;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  margin-left: -6px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }
`;

interface IOdyssey {
  id: string;
  name: string;
  description: string;
  banner: string;
  reward: string;
  status: StatusType;
}

interface TooltipListProps {
  odyssey: any;
  sxImg?: CSSProperties;
}

const TooltipList: React.FC<TooltipListProps> = ({ odyssey, sxImg }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const x = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const rewards = useMemo(() => {
    return parseReward(odyssey?.reward);
  }, [odyssey]);

  return (
    <ToolList>
      {rewards.map((item: any, index: number) => {
        if (!RewardIconsMap[item.logo_key]?.icon) {
          return;
        }

        return (
          <div
            className="box"
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* {hoveredIndex === index && ( 
            <AnimatePresence>
              <Tooltip
                x={x}
                showAnimateTooltip={true}
                animationProps={{ type: 'spring', stiffness: 200, damping: 15, duration: 0.5 }}
              >
                <OdysseyCard
                  key={odyssey.id}
                  status={odyssey.status}
                  title={odyssey.name}
                  subtitle={odyssey.description}
                  imageUrl={odyssey.banner}
                  reward={item}
                  isCampaign={odyssey.tag === 'tales'}
                  category={odyssey.category}
                  withoutCardStyle
                />
              </Tooltip>
            </AnimatePresence>
          )} */}
            <StyledTagChain
              key={item.logo_key}
              initial={{
                zIndex: 1
              }}
              whileHover={{
                scale: 1.2,
                zIndex: 2
              }}
              onMouseMove={handleMouseMove}
              style={sxImg}
            >
              <img src={RewardIconsMap[item.logo_key]?.icon} />
            </StyledTagChain>
          </div>
        );
      })}
    </ToolList>
  );
};

export default TooltipList;
