import { motion } from 'framer-motion';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const NpcImage = styled(motion.img)`
  position: fixed;
  z-index: 13;
  right: 0;
  bottom: 0;
  width: 343px;
  height: 483px;
  user-select: none;
  -webkit-user-drag: none;
`;

interface IProps {
  onHandle?: () => void;
}

const Npc: FC<IProps> = ({
  onHandle
}) => {
  const anim = {
    initial: { x: 50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: { x: 50, opacity: 0 },
    transition: {
      duration: 0.5,
    },
  };
  return <NpcImage {...anim} src="/images/lrts/npc-male.png" alt="npc" onClick={onHandle}/>;
};

export default Npc;
