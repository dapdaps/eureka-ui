import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, useMotionValue } from 'framer-motion';
import Tooltip from './';
import OdysseyCard from './Odyssey';
import { StatusType } from '@/views/Odyssey/components/Tag';
import { FormattedRewardList } from '@/views/AllDapps/hooks/useDappReward';
import RewardIconsMap from '@/views/OdysseyV8/RewardIcons';

const ToolList = styled.div`
  display: flex;
  align-items: center;

  .box {
    position: relative;
    padding-top: 20px;

    &:not(:first-child) {
      margin-left: -8px;
    }

    .brand {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      border: 4px solid #292b33;
    }
  }
`;

const StyledTooltipList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: #21232A;
`;

interface TooltipListProps {
  data: FormattedRewardList[];
}

const TooltipList: React.FC<TooltipListProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const x = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <ToolList>
      {data.map((item, index) => (
        <div
          className="box"
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === index && (
            <AnimatePresence>
              <Tooltip
                x={x}
                showAnimateTooltip={true}
                animationProps={{ type: 'spring', stiffness: 200, damping: 15, duration: 0.5 }}
              >
                <StyledTooltipList>
                  {
                    item.odysseys.map((odyssey) => (
                      <OdysseyCard
                        key={odyssey.id}
                        status={odyssey.status}
                        title={odyssey.name}
                        subtitle={odyssey.description}
                        imageUrl={odyssey.banner}
                        withoutCardStyle
                      />
                    ))
                  }
                </StyledTooltipList>
              </Tooltip>
            </AnimatePresence>
          )}
          <img className="brand" src={RewardIconsMap[item.logo_key]?.icon} alt="" onMouseMove={handleMouseMove} />
        </div>
      ))}
    </ToolList>
  );
};

export default TooltipList;
