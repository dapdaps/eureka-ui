import { useEffect, useMemo, useState } from 'react';

import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';
import { L1ChainIds } from '@/config/chains';
import { StatusType } from '@/views/Odyssey/components/Tag';
import { IdToPath } from '@/config/all-in-one/chains';
import { orderBy } from 'lodash';
import Big from 'big.js';

const InConfigNetworkIds = Object.keys(IdToPath);

export default function useNetworks() {
  const [loading, setLoading] = useState(false);
  const [networkList, setNetworkList] = useState<Network[]>([]);
  const [l1NetworkList, setL1NetworkList] = useState<Network[]>([]);
  const [l2networkList, setL2NetworkList] = useState<Network[]>([]);

  const networkListSortByAZ = useMemo(() => {
    return orderBy(networkList, 'name', 'asc');
  }, [networkList]);

  const fetchNetworkData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const resultNetwork = await get(`${QUEST_PATH}/api/network/all`);
      let data: Network[] = resultNetwork.data || [];
      data = data.filter((it) => InConfigNetworkIds.includes(it.id + ''));
      data = orderBy(data, (it) => Big(it.trading_volume).toNumber(), 'desc');
      const _l1NetworkList = [];
      const _l2NetworkList = [];
      for (const network of data) {
        if (L1ChainIds.includes(network.chain_id)) {
          _l1NetworkList.push(network);
          continue;
        }
        _l2NetworkList.push(network);
      }
      setNetworkList(data);
      setL1NetworkList(_l1NetworkList);
      setL2NetworkList(_l2NetworkList);
    } catch (error) {
      console.error('Error fetching resultNetwork data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNetworkData();
  }, []);

  return { loading, networkList, l1NetworkList, l2networkList, networkListSortByAZ };
}

export interface Network {
  block_explorer: string;
  created_at: string;
  updated_at: string;
  description: string;
  logo: string;
  name: string;
  // JSON string
  native_currency: string;
  // JSON string
  rpc: string;
  tag: string;
  tbd_token: string;
  chain_id: number;
  id: number;
  participants: number;
  participants_change_percent: string;
  total_execution: number;
  total_integrated_dapp: number;
  trading_volume: string;
  trading_volume_change_percent: string;
  odyssey: NetworkOdyssey[];
  index?: number;
}

export interface NetworkOdyssey {
  banner: string;
  category: string;
  chains_id: string;
  description: string;
  end_time: number;
  id: number;
  is_new: boolean;
  link: string;
  name: string;
  networks_id: string;
  // JSON string
  reward: string;
  rule: string;
  start_time: number;
  status: StatusType;
  total_transactions: number;
  total_users: number;
  trading_volume: string;
}
