import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, useMotionValue } from 'framer-motion';
import Tooltip from '.';
import Status, { StatusType } from '@/components/navigation/desktop/components/Status';

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
    .compass {
        position: relative;
        .status {
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        }

        .c_container {
        display: flex;
        flex-direction: column;
        align-items: center;

        .c_title {
            font-weight: 700;
            font-size: 20px;
            line-height: 20px;
            color: #fff;
            max-width: 214px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 5px;
        }

        .c_subtitle {
            font-size: 16px;
            line-height: 16px;
            font-weight: 500;
            color: #fff;
            margin-bottom: 10px;
            max-width: 214px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .c_image {
            width: 100%;
            height: 116px;
        }
        }
  }
`

type IData = {
    imgSrc: string;
    title: string;
    subtitle: string;
    imageUrl: string;

}

interface TooltipListProps {
    data: IData[];
}

const TooltipList = ({
    data
}: TooltipListProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const x = useMotionValue(0);
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
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
              <Tooltip x={x}>
                <div className="compass">
                  <Status status={StatusType.LIVE} className="status" />
                  <div className="c_container">
                    <div className="c_title">{item.title}</div>
                    <div className="c_subtitle">{item.subtitle}</div>
                    <img className="c_image" src={item.imageUrl} alt={item.title} />
                  </div>
                </div>
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
