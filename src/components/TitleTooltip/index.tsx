import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import IconWarning from '@public/images/utils/warning.svg'

interface TooltipProps {
  content: string;
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipIcon = styled(IconWarning)`
  width: 13px;
  height: 13px;
  cursor: pointer;
`;

const TooltipContent = styled(motion.div)`
  position: absolute;
  left: 20px;
  top: -12px;
  background-color: #2c2d3a;
  color: #979ABE;
  padding: 8px 15px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(51, 54, 72, 1);
  z-index: 1;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  text-align: left;
`;

const Tooltip: React.FC<TooltipProps> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipContainer
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <TooltipIcon />
      <AnimatePresence>
        {isVisible && (
          <TooltipContent
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {content}
          </TooltipContent>
        )}
      </AnimatePresence>
    </TooltipContainer>
  );
};

export default Tooltip;