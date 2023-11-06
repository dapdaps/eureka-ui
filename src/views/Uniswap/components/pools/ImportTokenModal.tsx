import { memo } from 'react';
import styled from 'styled-components';

import { CopyIcon, LinkIcon, WarningIcon } from './Icons';
import Modal from './ModalBox';

const StyledContent = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .hvc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const StyledTip = styled.div`
  font-size: 14px;
  color: #fff;
  margin-top: 20px;
  text-align: center;
`;
const StyledToken = styled.div`
  gap: 8px;
  margin-top: 22px;
  img {
    width: 36px;
    height: 36px;
    border-radius: 100px;
  }
  .base {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .symbol {
    font-size: 16px;
    color: #fff;
    font-weight: bold;
  }
  .data {
    font-size: 14px;
    color: #8e8e8e;
    gap: 8px;
    svg {
      cursor: pointer;
    }
  }
`;
const StyledCancel = styled.div`
  font-size: 14px;
  color: #8e8e8e;
  cursor: pointer;
  margin-top: 21px;
`;
const ImportTokenModal = (props: any) => {
  const { isOpen, onRequestClose } = props;
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <StyledContent>
        <WarningIcon />
        <StyledTip>This token isn’t frequently swapped. Please do your own research before trading.</StyledTip>
        <StyledToken className="hvc">
          <img src="" />
          <div className="base">
            <span className="symbol">DFI</span>
            <div className="hvc data">
              <span>Address: 0x8Fc8f82...c8D358A</span>
              <CopyIcon />
              <LinkIcon />
            </div>
          </div>
        </StyledToken>
        <UnderstandButton />
        <StyledCancel onClick={onRequestClose}>Cancel</StyledCancel>
      </StyledContent>
    </Modal>
  );
};

const StyledUnderstandButton = styled.div`
  width: 200px;
  height: 36px;
  cursor: pointer;
  background-color: #5ee0ff;
  font-size: 16px;
  color: #131313;
  font-weight: 600;
  margin-top: 40px;
  border-radius: 18px;
`;
const UnderstandButton = () => {
  return <StyledUnderstandButton className="hvc">I understand</StyledUnderstandButton>;
};

export default memo(ImportTokenModal);
