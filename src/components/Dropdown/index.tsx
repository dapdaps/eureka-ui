import React, { useEffect, useRef, useState } from 'react';

import { StyledArrow, StyledContainer, StyledInner, StyledPopup, StyledShown } from '@/components/Dropdown/styles';

// a simple dropdown component for common
const Dropdown = (props: DropdownProps) => {
  const {
    children,
    popup,
    className,
    popupClassName,
    style,
    popupStyle,
    clickPopupClose,
    clickTriggerClose,
    triggerClassName,
    triggerStyle,
    arrowClassName,
    arrowStyle,
    isArrowRotate = true,
  } = props;

  const dropdownRef = useRef<any>();
  const popupRef = useRef<any>();
  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = () => {
    if (visible && !clickTriggerClose) {
      return;
    }
    setVisible(!visible);
  };

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (clickPopupClose && popupRef.current.contains(e.target)) {
        setVisible(false);
        return;
      }
      if (dropdownRef.current.contains(e.target)) {
        return;
      }
      setVisible(false);
    };
    document.body.addEventListener('click', handleClose);
    return () => {
      document.body.removeEventListener('click', handleClose);
    };
  }, []);

  return (
    <StyledContainer
      ref={dropdownRef}
      className={`${visible ? 'opened' : 'hidden'} ${className}`}
      style={style}
    >
      <StyledInner onClick={handleClick}>
        <StyledShown
          className={triggerClassName}
          style={triggerStyle}
        >
          {children}
        </StyledShown>
        <StyledArrow
          variants={{
            visible: {
              rotate: [0, 180],
            },
            hide: {
              rotate: 0,
            },
          }}
          initial="hide"
          animate={visible && isArrowRotate ? 'visible' : 'hide'}
          className={arrowClassName}
          style={arrowStyle}
        >
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.175334 0.300273C0.451342 -0.0447361 0.954776 -0.100673 1.29979 0.175334L5.80003 3.77553L10.3003 0.175334C10.6453 -0.100673 11.1487 -0.0447361 11.4247 0.300273C11.7007 0.645283 11.6448 1.14872 11.2998 1.42472L5.80003 5.82453L0.300273 1.42472C-0.0447361 1.14872 -0.100673 0.645283 0.175334 0.300273Z"
              fill="currentColor"
            />
          </svg>
        </StyledArrow>
      </StyledInner>
      <StyledPopup
        ref={popupRef}
        className={popupClassName}
        style={popupStyle}
        variants={{
          visible: {
            display: 'block',
            y: [-10, 0],
            opacity: [0, 1],
          },
          hide: {
            display: 'none',
            y: -10,
            opacity: 0,
          },
        }}
        initial="hide"
        animate={visible ? 'visible' : 'hide'}
      >
        {popup}
      </StyledPopup>
    </StyledContainer>
  );
};

export default Dropdown;

export interface DropdownProps {
  children: any;
  popup: any;
  className?: string;
  popupClassName?: string;
  style?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  triggerStyle?: React.CSSProperties;
  clickPopupClose?: boolean;
  clickTriggerClose?: boolean;
  triggerClassName?: string;
  arrowClassName?: string;
  arrowStyle?: React.CSSProperties;
  isArrowRotate?: boolean;
}
