import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get, post } from '@/utils/http';
import type { Potential } from '@/views/Dapp/components/DappDetail/config';
import { AirdropList } from '@/views/Dapp/components/DappDetail/config';
import type { StatusType } from '@/views/Odyssey/components/Tag';

export function useAirdrop(props: Props) {
  const {
    category,
    id,
  } = props;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Partial<Airdrop>>({
    potential: AirdropList,
    quests: [],
  });
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const getData = async () => {
    setLoading(true);
    try {
      const res = await get('/api/airdrop', {
        category,
        id,
      });
      const _data = res.data || {};
      const potential: Potential[] = [];
      let completedCount = 0;
      AirdropList.forEach((aridrop) => {
        potential.push({
          ...aridrop,
          value: _data[aridrop.key] as string,
        });
      });
      _data.potential = potential;
      _data.quests?.forEach((quest: Quest) => {
        quest.completed = quest.status === QuestStatus.completed;
        if (quest.completed) {
          completedCount += 1;
        }
      });
      _data.completedCount = completedCount;
      setData(_data);
    } catch (err) {
      console.log('query airdrop list on error: %o', err);
    }
    setLoading(false);
  };

  const { run: getDataDebounce } = useDebounceFn(
    () => {
      getData();
    },
    { wait: 300 },
  );

  const reportAdditionResult = async (id: number) => {
    const result = { success: false, msg: 'Add failed!' };
    try {
      const res = await post('/api/airdrop/source', { airdrop_quest_id: id });
      if (res.code === 0) {
        result.success = true;
        result.msg = 'Added successfully!';
        return result;
      }
      result.msg = res.msg;
    } catch (err) {
      console.log('report addition result on error: %o', err);
    }
    return result;
  };

  useEffect(() => {
    if (!category || !id) return;
    if (account) {
      check(getDataDebounce);
      return;
    }
    getDataDebounce();
  }, [category, id, account]);

  return {
    data,
    loading,
    reportAdditionResult,
  };
}

export interface Airdrop {
  category: Category;
  difficulty: string;
  estimated_date: string;
  likelihood: string;
  status: StatusType;
  end_time: number;
  id: number;
  online: number;
  relate_id: number;
  start_time: number;
  quests: Quest[];
  potential: Potential[];
  completedCount: number;
}

export interface Quest {
  airdrop_id: number;
  category: QuestCategory;
  dapps_id: string;
  description: string;
  id: number;
  name: string;
  times: number;
  // if the dApp task(category == dapp) returns an url, click to directly jump to the URL
  url: string;
  // if there is no URL but dapps are returned
  // check if there is only one dApp in the list
  // if so, directly jump to the dApp detail page
  // if there are multiple dApps, display a popup for each dApp
  dapps: QuestDapp[];
  volume: string;
  status: QuestStatus;
  completed: boolean;
}

export interface QuestDapp {
  category_ids: string;
  description: string;
  logo: string;
  name: string;
  native_currency: string;
  network_ids: string;
  recommend_icon: string;
  route: string;
  tag: string;
  tbd_token: string;
  theme: string;
  default_chain_id: number;
  favorite: number;
  id: number;
  priority: number;
  recommend_priority: number;
  status: number;
  recommend: boolean;
}

export enum Category {
  network = 'network',
  dApp = 'dapp',
  chain = 'chain',
}

export enum QuestCategory {
  metamask = 'metamask',
  dApp = 'dapp',
}

export enum QuestStatus {
  completed = 'completed',
}

export interface Props {
  category: Category;
  // prop the corresponding ID
  // (DApp refers to the DApp ID, and network refers to the network ID)
  id: number;
}

