import { useEffect,useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';
import type { StatusType } from '@/views/Odyssey/components/Tag';

export interface Network {
  id: number;
  name: string;
  chain_id: number;
  logo: string;
}

export interface Dapp {
  id: number;
  name: string;
  logo: string;
}

export interface Odyssey {
  id: number;
  name: string;
  description: string;
  start_time: number;
  end_time: number;
  status: StatusType;
  banner: string;
  link: string;
  category: string;
  rule: string;
  chains_id: string;
  networks_id: string;
  reward: string;
  is_new: boolean;
  trading_volume: string;
  total_transactions: number;
  total_users: number;
  reward_value?: string;
}

interface SearchData {
  networks: Network[];
  dapps: Dapp[];
  odysseys: Odyssey[];
}


export const processSearchData = (data: SearchData) => {
  return {
    networks: data.networks || [],
    dapps: data.dapps || [],
    odysseys: data.odysseys || [],
  };
};

export const getSearchDataFromSession = (): SearchData | null => {
  const defaultSearchData = sessionStorage.getItem('defaultSearchData');
  return defaultSearchData ? JSON.parse(defaultSearchData) : null;
};

export const saveSearchDataToSession = (data: SearchData) => {
  sessionStorage.setItem('defaultSearchData', JSON.stringify(data));
};


const useDefaultSearch = () => {
  const [loading, setLoading] = useState(true);
  const [defaultSearchList, setDefaultSearchList] = useState<SearchData | null>(null);
  const [defaultNetworks, setDefaultNetworks] = useState<Network[]>([]);
  const [defaultDapps, setDefaultDapps] = useState<Dapp[]>([]);
  const [defaultOdysseys, setDefaultOdysseys] = useState<Odyssey[]>([]);

  useEffect(() => {
    const defaultSearchData = getSearchDataFromSession();
    if (defaultSearchData) {
      const groupedData = processSearchData(defaultSearchData);
      setDefaultSearchList(defaultSearchData);
      setDefaultNetworks(groupedData.networks);
      setDefaultDapps(groupedData.dapps);
      setDefaultOdysseys(groupedData.odysseys);
      setLoading(false);
    } else {
      get(`${QUEST_PATH}/api/search/default`)
        .then((res) => {
          const data: SearchData = res.data || { networks: [], dapps: [], odysseys: [] };
          const groupedData = processSearchData(data);
          setDefaultSearchList(data);
          setDefaultNetworks(groupedData.networks);
          setDefaultDapps(groupedData.dapps);
          setDefaultOdysseys(groupedData.odysseys);
          saveSearchDataToSession(data);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { loading, defaultNetworks, defaultDapps, defaultOdysseys, defaultSearchList };
};

export default useDefaultSearch;
