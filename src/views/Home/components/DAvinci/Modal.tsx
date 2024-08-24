import Index, { DAvinciProps } from './index';
import Modal from '@/components/Modal';

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
