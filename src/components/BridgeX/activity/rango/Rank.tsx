import ReactDOM from 'react-dom';

import Modal from '@/views/SuperBridge/Modal';

function Rank() {
  return <Modal>11</Modal>;
}

export default function QuickBridgeModal(props: any) {
  return ReactDOM.createPortal(<Rank {...props} />, document.body);
}
