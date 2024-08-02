import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, useMotionValue } from 'framer-motion';
import Tooltip from './';
import OdysseyCard from './Odyssey';
import { StatusType } from '@/components/navigation/desktop/components/Status';

const ToolList = styled.div`
  display: flex;
  align-items: center;

  .box {
    position: relative;
    padding-top: 20px;

    &:not(:first-child) {
      margin-left: -6px;
    }

    .brand {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      border: 4px solid #292b33;
    }
  }
`;

type IData = {
  imgSrc: string;
  title: string;
  subtitle: string;
  imageUrl: string;
};

interface TooltipListProps {
  data: IData[];
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
                <OdysseyCard
                  status={StatusType.ended}
                  title={item.title}
                  subtitle={item.subtitle}
                  imageUrl={item.imageUrl}
                  withoutCardStyle
                />
              </Tooltip>
            </AnimatePresence>
          )}
          <img className="brand" src={item.imgSrc} alt="" onMouseMove={handleMouseMove} />
        </div>
      ))}
    </ToolList>
  );
};

export default TooltipList;
