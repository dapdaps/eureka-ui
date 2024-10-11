import Modal from '@/components/Modal';
import { StyledModalTitle } from '@/views/Campaign/LineaLiquid/Mendi/styles';

import Index from './index';

const MendiModal = (props: any) => {
  const { visible, onClose, ...restProps } = props;

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Modal
      display={visible}
      width={500}
      title={
        <StyledModalTitle>
          <span>Lend</span>
          <img src="/assets/images/060-mendi-v1-1.png" alt="" width={24} height={24} />
          <span>mendi finance</span>
        </StyledModalTitle>
      }
      onClose={handleClose}
      portal={true}
      content={<Index {...restProps} />}
      style={{
        borderRadius: 12,
        border: '1px solid #333648',
        background: '#1F2229',
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)'
      }}
    />
  );
};

export default MendiModal;
