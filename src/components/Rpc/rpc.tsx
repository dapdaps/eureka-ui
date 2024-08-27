import { memo, useEffect } from 'react';

import {
  StyledNetworkDelay,
  StyledRpcContainer,
  StyledRpcItem,
  StyledRpcList,
  StyledRpcListDesc,
  StyledRpcRadio,
} from '@/components/Rpc/styles';
import { renderPing, renderPingConfig } from '@/components/Rpc/utils';
import { useRpc } from '@/hooks/useRpc';
import { useRpcStore } from '@/stores/rpc';
import { StyledFlex } from '@/styled/styles';
import { RPC_LIST, type RpcList as ERpcList } from '@/utils/config';

const RpcList = (props: Props) => {
  const list = Object.values(RPC_LIST);
  const keys = Object.keys(RPC_LIST) as ERpcList[];
  const rpcStore = useRpcStore();
  const { pingList, getPingList } = useRpc();

  const handleSelected = (rpc: ERpcList) => {
    if (rpc === rpcStore.selected) return;
    rpcStore.setSelected(rpc);
    rpcStore.setVisible(false);
    window.history.go(0);
  };

  useEffect(() => {
    getPingList();
  }, []);

  return (
    <StyledRpcContainer>
      <StyledRpcListDesc>
        Select the available RPC service below and the page will be automatically refreshed
      </StyledRpcListDesc>
      <StyledRpcList>
        {
          list.map((it, idx) => (
            <StyledRpcItem key={idx} onClick={() => handleSelected(keys[idx])}>
              {it.simpleName}
              <StyledFlex gap="10px">
                <StyledNetworkDelay $color={renderPingConfig(pingList[keys[idx]]).color}>
                  {renderPing(pingList[keys[idx]])}
                </StyledNetworkDelay>
                <StyledRpcRadio $selected={rpcStore.selected === keys[idx]} />
              </StyledFlex>
            </StyledRpcItem>
          ))
        }
      </StyledRpcList>
    </StyledRpcContainer>
  );
};

export default memo(RpcList);

export interface Props {
}
