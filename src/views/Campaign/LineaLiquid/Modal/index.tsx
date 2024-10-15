import ReactDOM from 'react-dom';

import Modal from '@/views/SuperBridge/Modal';

interface Props {
  title: string;
  onClose: () => void;
  width?: number;
  children: any;
}

function ComModal({ title, children, width = 468, onClose }: Props) {
  return (
    <Modal onClose={onClose} title={title} fixed width={width}>
      {children}
    </Modal>
  );
}

export default function ComaModal(props: Props): any {
  return ReactDOM.createPortal(<ComModal {...props} />, document.body);
}
