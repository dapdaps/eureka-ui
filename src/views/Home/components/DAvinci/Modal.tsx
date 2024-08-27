import Modal from '@/components/Modal';

import type { DAvinciProps } from './index';
import Index from './index';

const DAvinciModal = (props: Props) => {
  const { visible, onClose } = props;

  return (
    <Modal
      overlayClassName="d-avinci-modal-overlay"
      className="d-avinci-modal"
      display={visible}
      showHeader={false}
      portal={true}
      width={680}
      content={
        <Index onClose={onClose} />
      }
    />
  );
};

export default DAvinciModal;

interface Props extends DAvinciProps {
  visible: boolean;
}
