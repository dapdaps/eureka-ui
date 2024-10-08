import Big from 'big.js';
import _, { orderBy } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { IdToPath } from '@/config/all-in-one/chains';
import { L1ChainIds } from '@/config/chains';
import { QUEST_PATH } from '@/config/quest';
import { useAdvertise } from '@/hooks/useAdvertise';
import { get } from '@/utils/http';
import { SortList } from '@/views/AllDapps/config';
import { type StatusType } from '@/views/Odyssey/components/Tag';

const InConfigNetworkIds = Object.keys(IdToPath);

export default function useNetworks({ sort, mode, rewardNow, airdrop }: any) {
  const { fetchAdvertise } = useAdvertise('networks');
  const [loading, setLoading] = useState(false);
  const [networkList, setNetworkList] = useState<Network[]>([]);
  const [l1NetworkList, setL1NetworkList] = useState<Network[]>([]);
  const [l2networkList, setL2NetworkList] = useState<Network[]>([]);
  const [advertise, setAdvertise] = useState<any>([]);

  const networkListSortByAZ = useMemo(() => {
    return orderBy(networkList, 'name', 'asc');
  }, [networkList]);

  const fetchNetworkData = async () => {
    if (loading) return [];
    try {
      const resultNetwork = await get(`${QUEST_PATH}/api/network/all`);
      let data: Network[] = resultNetwork.data || [];
      data = data.filter((it) => InConfigNetworkIds.includes(it.id + ''));
      // find trading_volume and participants max
      setNetworkList(data);
      return data;
    } catch (error) {
      console.error('Error fetching resultNetwork data:', error);
      return [];
    }
  };
  const queryIsTop = (data: Network[]) => {
    const sortData = _.cloneDeep(data).sort(
      (prev: Network, next: Network) => Number(next.trading_volume_general) - Number(prev.trading_volume_general)
    );
    data.forEach((item) => {
      if (item?.chain_id === sortData[0]?.chain_id || item?.chain_id === sortData[1]?.chain_id) {
        item.isTop = true;
      } else {
        item.isTop = false;
      }
    });
    return data;
  };

  const fetchAdvertiseData = async () => {
    if (mode === 'card') {
      const _advertise = await fetchAdvertise();
      setAdvertise(_advertise);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchNetworkData(), fetchAdvertiseData()]).then(() => {
      setLoading(false);
    });
    return () => {
      setAdvertise([]);
    };
  }, [mode]);

  const filterNetworkData = async () => {
    if (!networkList.length) {
      return;
    }
    let _networkList = [...networkList];
    const findSortVar: any = SortList.find((i) => i.value === sort);
    if (findSortVar?.variable) {
      if (findSortVar.variable === 'name') {
        _networkList = orderBy(_networkList, (it) => it.name, findSortVar.value === 'z-a' ? 'desc' : 'asc');
      } else {
        _networkList = orderBy(
          _networkList,
          (it) => Big((it[findSortVar.variable as keyof Network] as string) || 0).toNumber(),
          'desc'
        );
      }
    } else {
      _networkList = orderBy(_networkList, (it) => Big(it.trading_volume || 0).toNumber(), 'desc');
    }
    const _l1NetworkList = [];
    const _l2NetworkList = [];
    for (const network of _networkList) {
      if (L1ChainIds.includes(network.chain_id)) {
        _l1NetworkList.push(network);
        continue;
      }
      _l2NetworkList.push(network);
    }
    if (advertise.length > 0 && mode === 'card') {
      _l2NetworkList.splice(5, 0, { isAdvertise: true, advertise } as any);
    }
    setL1NetworkList(_l1NetworkList);
    setL2NetworkList(queryIsTop(_l2NetworkList));
  };

  useEffect(() => {
    filterNetworkData();
  }, [sort, rewardNow, airdrop, networkList, advertise]);

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
  trading_volume_general: string;
  odyssey: NetworkOdyssey[];
  airdrop: NetworkAirdrop[];
  index?: number;
  isTop?: boolean;
  isHot?: boolean;
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

export interface NetworkAirdrop {
  category: string;
  difficulty: string;
  estimated_date: string;
  likelihood: string;
  end_time: number;
  id: number;
  online: number;
  relate_id: number;
  start_time: number;
  total_quest: number;
  status: StatusType;
}
