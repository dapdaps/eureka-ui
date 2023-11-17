import React, { memo } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 24px;
  border: 1px solid #3d363d;
  border-radius: 24px;
  background-color: #131313;
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
        content: {
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
        },
      }}
    >
      <StyledContainer>{children}</StyledContainer>
    </Modal>
  );
};

export default memo(CustomModal);
