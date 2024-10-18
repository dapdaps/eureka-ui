import React, { useState } from 'react';

import Modal from '@/components/Modal';
import { StyledFlex, StyledFont } from '@/styled/styles';

import CreateNewLockContent from './CreateNewLockContent';

const LockModal = ({ show, onClose }: any) => {
  const [updater, setUpdater] = useState(0);

  const onSuccess = () => {
    onClose();
    setUpdater(Date.now());
  };

  return (
    <Modal
      display={show}
      title={() => {
        return (
          <StyledFlex gap="12px">
            <StyledFont color="#FFF" fontSize="20px" fontWeight="600">
              Stake zLP (ZERO/ETH)
            </StyledFont>
            <img src="/images/alldapps/zeroland.png" alt="zeroland" className="w-[135px] h-[39px] mr-3" />
          </StyledFlex>
        );
      }}
      onClose={onClose}
      portal={true}
      width={500}
      headerStyle={{ padding: '26px 20px 0' }}
      titleStyle={{ fonwWeight: 'bold', fontSize: '22px' }}
      content={<CreateNewLockContent onSuccess={onSuccess} />}
    />
  );
};

export default LockModal;
