import { useMemo, useState } from 'react';
import { RPC_LIST, RpcList as ERpcList } from '@/utils/config';
import { useRpcStore } from '@/stores/rpc';
import { getRpcPing } from '@/components/Rpc/utils';

const list = Object.values(RPC_LIST);
const keys = Object.keys(RPC_LIST) as ERpcList[];

export function useRpc() {
  const rpcStore = useRpcStore();

  const [loading, setLoading] = useState<boolean>(false);
  const pingList = useMemo(() => {
    return rpcStore.ping;
  }, [rpcStore.ping]);
  const ping = useMemo(() => {
    return rpcStore.ping[rpcStore.selected];
  }, [rpcStore.ping, rpcStore.selected]);

  const getPingList = () => {
    setLoading(true);
    const promiseList = [];
    for (let i = 0; i < list.length; i++) {
      promiseList.push(new Promise((resolve) => {
        getRpcPing(list[i].url).then((_ping) => {
          rpcStore.setPing({ [keys[i]]: _ping });
          resolve({ [keys[i]]: _ping });
          // fix#DAP-781
          if (rpcStore.selected === keys[i] && _ping < 0) {
            rpcStore.setAlert(true);
          }
        });
      }));
    }
    Promise.all(promiseList).then(() => {
      setLoading(false);
    });
  };

  const getCurrentPing = async () => {
    const _ping = await getRpcPing(RPC_LIST[rpcStore.selected]?.url);
    rpcStore.setPing({ [rpcStore.selected]: _ping });
    if (_ping < 0) {
      rpcStore.setAlert(true);
    }
    return _ping;
  };

  return {
    ping,
    pingList,
    loading,
    getCurrentPing,
    getPingList,
  };
}
