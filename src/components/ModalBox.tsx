import React, { memo, useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 24px;
  border: 1px solid #3d363d;
  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  @media (max-width: 768px) {
    width: 100vw;
    box-sizing: border-box;
    padding: 24px 24px 0px;
    border-radius: 24px 24px 0px 0px;
  }
`;
const CustomModal = ({
  isOpen,
  onRequestClose,
  shouldCloseOnOverlayClick = true,
  children,
}: {
  isOpen: boolean;
  onRequestClose: any;
  shouldCloseOnOverlayClick?: boolean;
  children: React.ReactNode;
}) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 100,
          outline: 'none',
          overflow: 'auto',
        },
        content: ready
          ? window.innerWidth > 768
            ? {
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                transform: 'translate(-50%, -50%)',
                outline: 'none',
                border: 'none',
                background: 'transparent',
                padding: '0px',
              }
            : {
                position: 'absolute',
                top: 'auto',
                bottom: '0px',
                left: '0px',
                right: '0px',
                padding: '0px',
                outline: 'none',
                border: 'none',
                background: 'transparent',
              }
          : {},
      }}
    >
      <StyledContainer>{children}</StyledContainer>
    </Modal>
  );
};

export default memo(CustomModal);
