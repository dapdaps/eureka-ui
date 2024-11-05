import ReactDOM from 'react-dom';

import Modal from '@/views/SuperBridge/Modal';

interface Props {
  title: string;
  onClose: () => void;
  width?: number;
  children: any;
  style?: any;
  padding?: any;
}

function ComModal({ title, children, width = 468, onClose, padding = 20 }: Props) {
  return (
    <Modal onClose={onClose} title={title} fixed width={width} paddingSize={padding}>
      {children}
    </Modal>
  );
}

export default function ComaModal(props: Props): any {
  return ReactDOM.createPortal(<ComModal {...props} />, document.body);
}
