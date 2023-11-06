import { memo, useState } from 'react';
import styled from 'styled-components';

import PreviewModal from './PreviewModal';

const StyledWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 62px;
  border-radius: 16px;
  background-color: #62ddff;
  font-size: 18px;
  color: #1b1b1b;
  font-weight: 600;
  margin-top: 15px;
  ${({ disabled }) => (disabled ? 'opacity: 0.3; cursor: not-allowed;' : 'cursor: pointer;')}
`;

const IncreaseButton = () => {
  const [open, setOpen] = useState(false);
  function closeModal() {
    setOpen(false);
  }
  function openModal() {
    setOpen(true);
  }
  return (
    <>
      <StyledWrapper onClick={openModal}>Preview</StyledWrapper>
      <PreviewModal isOpen={open} onRequestClose={closeModal} />
    </>
  );
};

export default memo(IncreaseButton);
