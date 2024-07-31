import { motion } from 'framer-motion';
import type { FC, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  children: ReactNode;
  onClose: () => void;
  onHandle?: () => void;
}

const Wrap = styled(motion.div)`
  position: fixed;
  z-index: 12;
  right: 150px;
  bottom: 225px;
  width: 465px;
`;

const PolygonDiv = styled.div`
  padding: 20px 50px 20px 38px;
  background-color: white;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  clip-path: polygon(
    15px 0,
    calc(100% - 15px) 0,
    100% 15px,
    100% calc(100% - 15px),
    calc(100% - 15px) 100%,
    15px 100%,
    0 calc(100% - 15px),
    0 15px
  );
  color: #000;
  font-family: Orbitron;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
`;

const CloseIcon = styled.span`
  margin-left: -18px;
  margin-top: -18px;
  position: absolute;
`;

const Dialog: FC<IProps> = ({ children, onClose, onHandle }) => {
  const anim = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
    },
    exit: { opacity: 0 },
    transition: {
      duration: 0.3,
    },
  };
  return (
    <Wrap {...anim}>
      <CloseIcon onClick={onClose}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M37 5C37 2.79086 35.2091 1 33 1H5C2.79086 1 0.999999 2.79086 0.999999 5V33C0.999999 35.2091 2.79086 37 5 37H33C35.2091 37 37 35.2091 37 33V5Z"
            fill="#272727"
            stroke="#3F3F3F"
          />
          <path
            d="M11.9784 14L7.30814 9.32984C6.95709 8.97867 6.89712 8.46918 7.17421 8.19221L8.19248 7.17394C8.46957 6.89685 8.97836 6.95764 9.33011 7.30857L13.9999 11.9787L18.6699 7.30869C19.0211 6.95717 19.5306 6.89685 19.8077 7.17429L20.826 8.19268C21.1029 8.4693 21.043 8.97879 20.6913 9.32996L16.0211 14L20.6913 18.6705C21.0424 19.0214 21.1032 19.5306 20.826 19.8077L19.8077 20.826C19.5306 21.1031 19.0211 21.043 18.6699 20.692L13.9996 16.0216L9.32999 20.6913C8.97824 21.0432 8.46945 21.1031 8.19237 20.826L7.17409 19.8077C6.89712 19.5306 6.95709 19.0214 7.30802 18.67L11.9784 14Z"
            fill="white"
          />
        </svg>
      </CloseIcon>
      <PolygonDiv onClick={onHandle}>{children}</PolygonDiv>
    </Wrap>
  );
};

export default Dialog;
