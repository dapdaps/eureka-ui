import ReactDOM from 'react-dom';

import Modal from '@/views/SuperBridge/Modal';

interface Props {
  title: string;
  onClose: () => void;
  children: any;
}

function ComModal({ title, children, onClose }: Props) {
  return (
    <Modal onClose={onClose} title={title} fixed>
      {children}
    </Modal>
  );
}

export default function ComaModal(props: Props): any {
  return ReactDOM.createPortal(<ComModal {...props} />, document.body);
}
