import RpcSelector from '@/components/Rpc/Selector';
import RpcAlert from '@/components/Rpc/Alert';
import { useRpcStore } from '@/stores/rpc';
import { useRpc } from '@/hooks/useRpc';
import { useEffect } from 'react';
import { renderPing, renderPingConfig } from '@/components/Rpc/utils';

import styled from 'styled-components';

const StyledRpcs = styled.div<{ $color?: string }>`
  position: fixed;
  bottom: 30px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ $color }) => $color || '#57DB64'};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s linear;

  @media (max-width: 1394px) {
    bottom: 60px;
  }

  &:hover {
    opacity: 1;
  }

  &&::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    flex-shrink: 0;
    background: ${({ $color }) => $color || '#57DB64'};
    border-radius: 50%;
  }
`;

const Rpc = ({
  className
}: {
  className?: string;
}) => {
  const rpcStore = useRpcStore();
  const { ping, getCurrentPing } = useRpc();

  const handleRpc = () => {
    rpcStore.setVisible(true);
  };

  useEffect(() => {
    getCurrentPing();
  }, []);

  return (
    <>
      <StyledRpcs $color={renderPingConfig(ping).color} onClick={handleRpc} className={className}>
        {renderPing(ping)}
      </StyledRpcs>
      <RpcSelector
        visible={rpcStore.visible}
        onClose={() => {
          rpcStore.setVisible(false);
        }}
      />
      <RpcAlert visible={rpcStore.alert} />
    </>
  );
};

export default Rpc;