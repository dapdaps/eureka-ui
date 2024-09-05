import { AnimatePresence, useMotionValue } from 'framer-motion';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

import type { Odyssey } from '@/components/DropdownSearchResultPanel/hooks/useDefaultSearch';
import odyssey from '@/config/odyssey';
import useToast from '@/hooks/useToast';
import type { FormattedRewardList } from '@/views/AllDapps/hooks/useDappReward';
import RewardIconsMap from '@/views/OdysseyV8/RewardIcons';

import Tooltip from './';
import OdysseyCard from './Odyssey';

const ToolList = styled.div`
  display: flex;
  align-items: center;

  .box {
    position: relative;
    padding-top: 20px;

    &:not(:first-child) {
      margin-left: -8px;
    }
  }
`;

const StyledTooltipList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: #21232a;
  cursor: pointer;
`;

const StyledTagChainMask = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 50%;
`;

const StyledTagChain = styled(motion.div)`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 4px solid #292b33;
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

  &:first-child {
    margin-left: 0;
  }
`;

interface TooltipListProps {
  data: FormattedRewardList[];
}

const TooltipList: React.FC<TooltipListProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const x = useMotionValue(0);
  const router = useRouter();
  const toast = useToast();

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const onOdysseyClick = (ody: Odyssey) => {
    if (odyssey[ody.id]) {
      router.push(ody.link || odyssey[ody.id].path);
      return;
    }
    toast.fail('Invalid odyssey id!');
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
                  {item.odysseys.map((odyssey) => (
                    <OdysseyCard
                      key={odyssey.id}
                      status={odyssey.status}
                      title={odyssey.name}
                      subtitle={odyssey.description}
                      imageUrl={odyssey.banner}
                      rewardValue={odyssey.reward_value}
                      reward={item}
                      withoutCardStyle
                      onClick={() => onOdysseyClick(odyssey)}
                    />
                  ))}
                </StyledTooltipList>
              </Tooltip>
            </AnimatePresence>
          )}
          <StyledTagChain
            key={item.logo_key}
            initial="default"
            whileHover="hover"
            onMouseMove={handleMouseMove}
            variants={{
              hover: {
                scale: 1.2,
                zIndex: 2,
                filter: 'drop-shadow(0px 0px 10px rgba(223, 254, 0, 0.60))',
              },
              default: {
                zIndex: 1,
                filter: 'unset',
              },
            }}
          >
            <StyledTagChainMask
              variants={{
                hover: {
                  opacity: 0,
                },
                default: {
                  opacity: 1,
                },
              }}
            />
            <img
              src={RewardIconsMap[item.logo_key]?.icon}
            />
          </StyledTagChain>
        </div>
      ))}
    </ToolList>
  );
};

export default TooltipList;
