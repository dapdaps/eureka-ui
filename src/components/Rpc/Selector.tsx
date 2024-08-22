import { memo } from 'react';

import Modal from '@/components/Modal';

import RpcList, { type Props as RpcListProps } from './rpc';

const RpcSelector = (props: Props) => {
  const { visible, onClose } = props;

  return (
    <Modal
      display={visible}
      title="RPC Selector"
      width={420}
      onClose={onClose}
      content={(
        <RpcList />
      )}
      style={{
        borderRadius: 20,
        border: '1px solid #202329',
        background: '#18191E',
        backdropFilter: 'blur(10px)',
        padding: '0 20px 40px',
      }}
      headerStyle={{
        padding: '20px 0 0',
      }}
    />
  );
};

export default memo(RpcSelector);

export interface Props extends RpcListProps {
  visible: boolean;
  onClose(): void;
}
