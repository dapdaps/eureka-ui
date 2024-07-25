import React from 'react';
import styled from 'styled-components';
import { motion, useTransform, useSpring } from 'framer-motion';
import Status, { StatusType } from '@/components/navigation/desktop/components/Status';

const StyledTooltip = styled(motion.div)`
  border: 1px solid;
  border-image-source: linear-gradient(180deg, #464b56 0%, rgba(0, 0, 0, 0) 100%);
  background: #21232a;
  box-shadow: 0px 10px 20px 0px #00000040;
  width: 244px;
  height: 205px;
  position: absolute;
  top: -205px;
  left: -90px;
  border-radius: 12px;
  padding: 26px 11px 13px 11px;
  box-sizing: border-box;
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
`;

interface TooltipProps {
  x: any;
  data: {
    title: string;
    subtitle: string;
    imageUrl: string;
  };
}

const Tooltip: React.FC<TooltipProps> = ({ x, data }) => {
  const springConfig = { stiffness: 100, damping: 5 };
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);
  return (
    <StyledTooltip
      initial={{ opacity: 0, y: 20, scale: 0.6 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 260,
          damping: 10,
        },
      }}
      exit={{ opacity: 0, y: 20, scale: 0.6 }}
      style={{
        translateX: translateX,
        rotate: rotate,
        whiteSpace: 'nowrap',
      }}
      className="tooltip"
    >
      <div className="compass">
        <Status status={StatusType.LIVE} className="status" />
        <div className="c_container">
          <div className="c_title">{data.title}</div>
          <div className="c_subtitle">{data.subtitle}</div>
          <img className="c_image" src={data.imageUrl} alt={data.title} />
        </div>
      </div>
    </StyledTooltip>
  );
};

export default Tooltip;
