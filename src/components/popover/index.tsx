import { useDebounceFn } from 'ahooks';
import { AnimatePresence, motion } from 'framer-motion';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Placement:
//            TopLeft         Top         TopRight
//    LeftTop ------------------------------------ RightTop
//            |                                  |
//       Left |              Trigger             | Right
//            |                                  |
// LeftBottom ------------------------------------ RightBottom
//            BottomLeft     Bottom    BottomRight
const Popover = (props: Props) => {
  const {
    children,
    content,
    placement = PopoverPlacement.BottomLeft,
    offset = 5,
    trigger = PopoverTrigger.Click,
    contentStyle,
    contentClassName,
    triggerContainerStyle,
    triggerContainerClassName
  } = props;

  const triggerRef = useRef<any>();

  const [visible, setVisible] = useState(false);
  const [realVisible, setRealVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const { run: closeDelay, cancel: closeCancel } = useDebounceFn(
    () => {
      setVisible(false);
      setRealVisible(false);
    },
    { wait: 300 }
  );

  return (
    <>
      <div
        ref={triggerRef}
        style={triggerContainerStyle}
        className={triggerContainerClassName}
        onClick={() => {
          if (trigger === PopoverTrigger.Hover) return;
          setVisible(true);
        }}
        onMouseEnter={() => {
          if (trigger === PopoverTrigger.Click) return;
          closeCancel();
          setVisible(true);
        }}
        onMouseLeave={() => {
          if (trigger === PopoverTrigger.Click) return;
          closeDelay();
        }}
      >
        {children}
      </div>
      {visible &&
        createPortal(
          <Card
            x={x}
            y={y}
            onLoaded={(elTooltip) => {
              const triggerEl = triggerRef.current;

              const { width: triggerW, height: triggerH, x: triggerX, y: triggerY } = triggerEl.getBoundingClientRect();

              const { width: w, height: h } = elTooltip.getBoundingClientRect();

              const triggerMiddleWidth = triggerX + triggerW / 2;
              const triggerMiddleHeight = triggerY + triggerH / 2;
              const targetMiddleWidth = triggerX + w / 2;
              const targetMiddleHeight = triggerY + h / 2;

              let targetX = 0;
              let targetY = 0;
              if (placement === PopoverPlacement.BottomRight) {
                targetX = triggerX + triggerW - w;
                targetY = triggerY + triggerH + offset;
              }
              if (placement === PopoverPlacement.Bottom) {
                targetX = triggerX - (targetMiddleWidth - triggerMiddleWidth);
                targetY = triggerY + triggerH + offset;
              }
              if (placement === PopoverPlacement.BottomLeft) {
                targetX = triggerX;
                targetY = triggerY + triggerH + offset;
              }
              if (placement === PopoverPlacement.LeftBottom) {
                targetX = triggerX - w - offset;
                targetY = triggerY - (h - triggerH);
              }
              if (placement === PopoverPlacement.Left) {
                targetX = triggerX - w - offset;
                targetY = triggerY - (targetMiddleHeight - triggerMiddleHeight);
              }
              if (placement === PopoverPlacement.LeftTop) {
                targetX = triggerX - w - offset;
                targetY = triggerY;
              }
              if (placement === PopoverPlacement.TopLeft) {
                targetX = triggerX;
                targetY = triggerY - offset - h;
              }
              if (placement === PopoverPlacement.Top) {
                targetX = triggerX - (targetMiddleWidth - triggerMiddleWidth);
                targetY = triggerY - offset - h;
              }
              if (placement === PopoverPlacement.TopRight) {
                targetX = triggerX + triggerW - w;
                targetY = triggerY - offset - h;
              }
              if (placement === PopoverPlacement.RightTop) {
                targetX = triggerX + triggerW + offset;
                targetY = triggerY;
              }
              if (placement === PopoverPlacement.Right) {
                targetX = triggerX + triggerW + offset;
                targetY = triggerY - (targetMiddleHeight - triggerMiddleHeight);
              }
              if (placement === PopoverPlacement.RightBottom) {
                targetX = triggerX + triggerW + offset;
                targetY = triggerY - (h - triggerH);
              }

              if (placement === PopoverPlacement.Center) {
                targetX = triggerX + offset * 2 + (triggerW - w) / 2;
                targetY = triggerY + offset + (triggerH - h) / 2;
              }

              // edge
              if (targetX < 0) targetX = 0;
              if (targetX > window.innerWidth - w) targetX = window.innerWidth - w;
              if (targetY < 0) targetY = 0;
              if (targetY > window.innerHeight - h) targetY = window.innerHeight - h;

              setX(targetX);
              setY(targetY);
              setRealVisible(true);
            }}
            visible={realVisible}
            onClose={() => {
              setRealVisible(false);
              setVisible(false);
            }}
            style={contentStyle}
            className={contentClassName}
            setVisible={setVisible}
            closeDelay={closeDelay}
            closeCancel={closeCancel}
            trigger={trigger}
            triggerRef={triggerRef}
          >
            {content}
          </Card>,
          document.body
        )}
    </>
  );
};

export default Popover;

export enum PopoverPlacement {
  Top,
  Right,
  Bottom,
  Left,
  TopLeft,
  TopRight,
  RightTop,
  RightBottom,
  BottomLeft,
  BottomRight,
  LeftTop,
  LeftBottom,
  Center
}

export enum PopoverTrigger {
  Click = 'click',
  Hover = 'hover'
}

interface Props {
  children: any;
  content: any;
  placement?: PopoverPlacement;
  offset?: number;
  trigger?: PopoverTrigger;
  contentStyle?: React.CSSProperties;
  contentClassName?: string;
  triggerContainerStyle?: React.CSSProperties;
  triggerContainerClassName?: string;
  elRef?: HTMLElement;
}

const Card = (props: CardProps) => {
  const {
    onLoaded,
    x,
    y,
    visible,
    onClose,
    children,
    style,
    className,
    setVisible,
    closeDelay,
    closeCancel,
    trigger,
    triggerRef
  } = props;

  const cardRef = useRef<any>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    onLoaded(cardRef.current);

    const handleClose = (e: any) => {
      if (cardRef.current.contains(e.target) || triggerRef.current?.contains(e.target)) return;
      onClose();
    };
    document.addEventListener('click', handleClose);
    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={`fixed z-[100] left-0 top-0 ${className}`}
        ref={cardRef}
        style={{
          left: x,
          top: y,
          visibility: visible ? 'visible' : 'hidden',
          ...style
        }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            type: 'spring',
            stiffness: 200,
            damping: 15,
            duration: 1
          }
        }}
        exit={{
          opacity: 0
        }}
        initial={{
          opacity: 0
        }}
        onMouseEnter={() => {
          if (trigger === PopoverTrigger.Click) return;
          setVisible(true);
          closeCancel();
        }}
        onMouseLeave={() => {
          if (trigger === PopoverTrigger.Click) return;
          closeDelay();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

interface CardProps {
  x: number;
  y: number;
  visible: boolean;
  children: any;
  style?: React.CSSProperties;
  className?: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
  closeDelay: () => void;
  closeCancel: () => void;
  trigger: PopoverTrigger;
  triggerRef: any;

  onLoaded(cardRef: any): void;
  onClose(): void;
}
