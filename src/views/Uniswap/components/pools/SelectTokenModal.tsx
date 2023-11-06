import { memo } from 'react';
import styled from 'styled-components';

import { CloseIcon } from './Icons';
import Modal from './ModalBox';

const StyledContent = styled.div`
  width: 460px;
  .vchb {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hvc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .w-full {
    width: 100%;
  }
`;
const StyledHead = styled.div`
  .title {
    font-size: 20px;
    color: #ffffff;
    font-weight: 700;
  }
  svg {
    cursor: pointer;
  }
`;
const StyledBody = styled.div`
  margin-top: 16px;
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
    background-color: #1b1b1b;
    padding: 18px;
    gap: 20px;
    img {
      width: 22px;
      height: 22px;
      border-radius: 100px;
      margin-right: 7px;
    }
    .symbol {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }
    .balance {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }
  }
`;
const StyledDescription = styled.div`
  font-size: 12px;
  color: #8e8e8e;
  margin-top: 10px;
`;
const StyledCollectButton = styled.div<{ disabled?: boolean }>`
  margin-top: 20px;
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
const SelectTokenModal = (props: any) => {
  const { isOpen, onRequestClose } = props;
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <StyledContent>
        <StyledHead className="vchb">
          <span className="title">Claim fees</span>
          <CloseIcon onClick={onRequestClose} />
        </StyledHead>
        <StyledBody>
          <div className="box">
            <div className="vchb w-full">
              <div className="hvc">
                <img src="" />
                <span className="symbol">ETH</span>
              </div>
              <span className="balance">{'<0'}</span>
            </div>
            <div className="vchb w-full">
              <div className="hvc">
                <img src="" />
                <span className="symbol">USDC</span>
              </div>
              <span className="balance">{'0.001675'}</span>
            </div>
          </div>
          <StyledDescription>Collecting fees will withdraw currently available fees for you.</StyledDescription>
          <StyledCollectButton>Collect</StyledCollectButton>
        </StyledBody>
      </StyledContent>
    </Modal>
  );
};

export default memo(SelectTokenModal);
