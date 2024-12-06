import { AnimatePresence, motion } from 'framer-motion';
import React, { type ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { modal, overlay } from '@/components/animation';

import CloseIcon from './Icons/Close';

const Dialog = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 900;
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 900px) {
    align-items: flex-end;
  }
`;
const Main = styled(motion.div)<{ $width: number; $hidden: boolean }>`
  position: relative;
  width: ${({ $width }) => $width + 'px'};
  overflow: ${($hidden) => ($hidden ? 'hidden' : 'normal')};
  border-radius: 20px;
  border: 1px solid #373a53;
  background: #262836;
  @media (max-width: 900px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }
`;
const Header = styled.div`
  position: relative;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 30px 30px 0px 30px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const Content = styled.div`
  border-radius: 0px 0px 16px 16px;
`;

const StyledCloseIcon = styled.div`
  color: #979abe;
`;

const Modal = ({
  display,
  title = '',
  width = 460,
  hidden = false,
  content,
  showHeader = true,
  onClose = () => {},
  overlayClassName = '',
  overlayStyle,
  headerStyle,
  className = '',
  style,
  portal = false,
  headerCenter = false,
  titleStyle
}: any): React.ReactPortal | ReactNode => {
  const overlayRef = useRef<any>();
  const modalRef = useRef<any>();
  const [align, setAlign] = useState('center');

  const renderModal = (): ReactNode => (
    <AnimatePresence mode="wait">
      {display && (
        <Dialog>
          <Overlay
            ref={overlayRef}
            onClick={onClose}
            {...overlay}
            className={overlayClassName}
            style={{ ...overlayStyle, alignItems: align }}
          >
            <Main
              ref={modalRef}
              className={className}
              style={style}
              {...modal}
              $width={width}
              $hidden={hidden}
              onClick={(ev) => {
                ev.stopPropagation();
              }}
            >
              {showHeader && (
                <Header style={headerStyle}>
                  {headerCenter && <div />}
                  <Title style={titleStyle}>{typeof title === 'function' ? title() : title}</Title>
                  <StyledCloseIcon>
                    <CloseIcon onClose={onClose} />
                  </StyledCloseIcon>
                </Header>
              )}
              <Content>{content}</Content>
            </Main>
          </Overlay>
        </Dialog>
      )}
    </AnimatePresence>
  );

  useEffect(() => {
    if (!display) return;
    const onResize = () => {
      if (!overlayRef.current || !modalRef.current) return;
      const overlayHeight = parseFloat(getComputedStyle(overlayRef.current).height);
      const modalHeight = parseFloat(getComputedStyle(modalRef.current).height);
      const overlayContentHeight = overlayHeight - 60;
      if (modalHeight >= overlayContentHeight) {
        setAlign('flex-start');
        return;
      }
      setAlign('center');
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [display]);

  if (!portal) return renderModal();

  return ReactDOM.createPortal(renderModal() as any, document.body) as unknown as React.ReactPortal;
};

export default Modal;
