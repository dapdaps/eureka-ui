import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, useMotionValue } from 'framer-motion';
import Tooltip from './';
import { FormattedRewardList } from '@/views/AllDapps/hooks/useDappReward';
import { motion } from 'framer-motion';
import { Odyssey } from '@/components/DropdownSearchResultPanel/hooks/useDefaultSearch';
import odyssey from '@/config/odyssey';
import { useRouter } from 'next/router';
import useToast from '@/hooks/useToast';

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
  background: #EBF479;
  cursor: pointer;
  .corn-outer {
    
    .corn-inner {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -36px;
        display: inline-block;
        width: 0;
        height: 0;
        border: 18px solid transparent;
        border-top-color: #EBF479;
    }
  }
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

const StyledTipWrapper = styled(motion.div)`
  max-width: 250px;
  white-space: normal;
`

const StyledTipTitle = styled(motion.div)`
  font-size: 22px;
  font-weight: 600;
`

const StyledTipDesc = styled(motion.div)`
  font-size: 16px;
  font-weight: 500;
`

const StyledTagChain = styled(motion.div)`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  /* border: 4px solid #292b33; */
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
      router.push(odyssey[ody.id].path);
      return;
    }
    toast.fail('Invalid odyssey id!');
  };

  return (
    <ToolList>
      {data.map((item: any, index) => (
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
                customStyle={{ background: '#EBF479' }}
                showAnimateTooltip={true}
                animationProps={{ type: 'spring', stiffness: 200, damping: 15, duration: 0.5 }}
              >
                <StyledTooltipList>
                  <StyledTipWrapper>
                    <StyledTipTitle>{item.name}</StyledTipTitle>
                    <StyledTipDesc>{item.desc}</StyledTipDesc>
                  </StyledTipWrapper>
                  <section className="corn-outer">
                    <em className="corn-inner"></em>
                  </section>
                </StyledTooltipList>
              </Tooltip>
            </AnimatePresence>
          )}
          <StyledTagChain
            key={item.logo_key}
            initial="default"
            whileHover="hover"
            onMouseMove={handleMouseMove}
            onClick={() => {
              window.open(item.link)
            }}
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
              src={item.icon}
            />
          </StyledTagChain>
        </div>
      ))}
    </ToolList>
  );
};

export default TooltipList;
