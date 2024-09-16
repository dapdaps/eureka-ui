import Modal from '@/components/Modal';

import type { NewTicketProps } from './index';
import Index from './index';

const NewTicketModal = (props: Props) => {
  const { visible, onClose, ...rest } = props;

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Modal
      display={visible}
      title=""
      width={468}
      onClose={handleClose}
      content={<Index {...rest} />}
      style={{
        borderRadius: 12,
        background: '#1F2229',
        border: '1px solid #333648',
      }}
    />
  );
};

export default NewTicketModal;

interface Props extends NewTicketProps {
  visible: boolean;

  onClose?(): void;
}
