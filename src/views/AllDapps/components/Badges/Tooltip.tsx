import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useDebounceFn } from 'ahooks';

// a simple tooltip component that supports rendering content to the root node (document.body)
const Tooltip = forwardRef<Refs, Props>((props, ref) => {
  const {
    children,
    tooltip,
    containerStyle,
    isShake,
    isControlled,
    isControlledAutoClose = true,
    controlledDuration = 2000,
  } = props;

  const offset = 10;

  const triggerRef = useRef<any>();
  const [visible, setVisible] = useState(false);
  const [realVisible, setRealVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const springX = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 5 };
  const rotate = useSpring(useTransform(springX || useMotionValue(0), [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(springX || useMotionValue(0), [-100, 100], [-50, 50]), springConfig);

  const { run: closeTooltip, cancel: cancelCloseTooltip } = useDebounceFn(() => {
    setVisible(false);
    setRealVisible(false);
  }, {
    wait: isControlled ? controlledDuration : 150,
  });

  const onMouseMove = (e: React.MouseEvent<any, MouseEvent>) => {
    if (isShake) {
      const halfWidth = e.currentTarget.offsetWidth / 2;
      springX.set(e.nativeEvent.offsetX - halfWidth);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setVisible(false);
    };
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  const open = () => {
    setVisible(true);
    if (!isControlledAutoClose) {
      return;
    }
    cancelCloseTooltip();
    closeTooltip();
  };

  useImperativeHandle(ref, () => ({
    open,
    close: closeTooltip,
    cancelClose: cancelCloseTooltip,
  }));

  if (!tooltip) return children;

  return (
    <StyledContainer style={containerStyle}>
      <StyledTooltipTrigger
        ref={triggerRef}
        onHoverStart={() => {
          if (isControlled) return;
          setVisible(true);
          cancelCloseTooltip();
        }}
        onHoverEnd={() => {
          if (isControlled) return;
          closeTooltip();
        }}
        onClick={(e) => {
          if (!isControlled) return;
          onMouseMove(e);
        }}
        onMouseMove={onMouseMove}
      >
        {children}
      </StyledTooltipTrigger>
      {
        visible ? createPortal((
          <Popup
            {...props}
            x={x}
            y={y}
            translateX={translateX}
            rotate={rotate}
            realVisible={realVisible}
            setVisible={setVisible}
            cancelCloseTooltip={cancelCloseTooltip}
            closeTooltip={closeTooltip}
            onLoaded={(elTooltip) => {
              const el = triggerRef.current;
              const { width: elW, x: elX, y: elY } = el.getBoundingClientRect();
              const middleWidth = elX + elW / 2;

              const { width: w, height: h } = elTooltip.getBoundingClientRect();
              const targetMiddleWidth = elX + w / 2;
              let targetX = elX - (targetMiddleWidth - middleWidth);
              if (targetX < 0) {
                targetX = 0;
              }
              if (targetX + w > window.innerWidth) {
                targetX = window.innerWidth - w;
              }
              setY(elY - h - offset);
              setX(targetX);
              setRealVisible(true);
            }}
          />
        ), document.body) as React.ReactNode : null
      }
    </StyledContainer>
  );
});

export default memo(Tooltip);

export interface Refs {
  open(): void;

  close(): void;

  cancelClose(): void;
}

export interface Props {
  children: any;
  tooltip: any;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  isShake?: boolean;
  isControlled?: boolean;
  isControlledAutoClose?: boolean;
  // in controlled mode
  // set the auto-close time after opening
  controlledDuration?: number;
}

const Popup = (props: PopupProps) => {
  const {
    style,
    x,
    y,
    translateX,
    rotate,
    realVisible,
    isControlled,
    tooltip,
    onLoaded,
    setVisible,
    cancelCloseTooltip,
    closeTooltip,
  } = props;

  const tooltipRef = useRef<any>(null);

  useEffect(() => {
    if (!tooltipRef.current) return;
    onLoaded(tooltipRef.current);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <StyledTooltip
        ref={tooltipRef}
        style={{
          ...style,
          left: x,
          top: y,
          translateX,
          rotate,
          visibility: realVisible ? 'visible' : 'hidden',
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 200, damping: 15, duration: 0.5 },
        }}
        exit={{
          opacity: 0,
          y: 20,
        }}
        initial={{
          opacity: 0,
          y: 20,
        }}
        onHoverStart={() => {
          if (isControlled) return;
          setVisible(true);
          cancelCloseTooltip();
        }}
        onHoverEnd={() => {
          if (isControlled) return;
          closeTooltip();
        }}
      >
        {tooltip}
      </StyledTooltip>
    </AnimatePresence>
  );
};

export interface PopupProps {
  x: number;
  y: number;
  translateX: MotionValue<any>;
  rotate: MotionValue<any>;
  realVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  tooltip: any;
  style?: React.CSSProperties;
  isControlled?: boolean;

  onLoaded(tooltipRef: any): void;

  cancelCloseTooltip(): void;

  closeTooltip(): void;
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledTooltip = styled(motion.div)`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #333648;
  background: #1F2229;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  color: #979ABE;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  padding: 12px 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;
const StyledTooltipTrigger = styled(motion.div)``;
