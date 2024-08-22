import { useDebounceFn } from 'ahooks';
import { useEffect, useRef, useState } from 'react';

import chainCofig from '@/config/chains';
import { QUEST_PATH } from '@/config/quest';
import type { Advertise} from '@/hooks/useAdvertise';
import { useAdvertise } from '@/hooks/useAdvertise';
import { get } from '@/utils/http';
import { CategoryList, PageSize } from '@/views/AllDapps/config';

export default function useList(props: Props) {
  const {
    network,
    sort,
    category,
    searchText,
    rewardNow,
    airdrop,
  } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [dappList, setDappList] = useState<any>([]);
  const [advertise, setAdvertise] = useState<Advertise[]>([]);
  const [titleDappList, setTitleDappList] = useState<any>([]);
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const { fetchAdvertise } = useAdvertise('dapps');


  const fetchDappList = async (page: number) => {
    const _advertise = await fetchAdvertiseData();
    setPageIndex(page);
    try {
      setLoading(true);
      const params: Record<string, any> = {
        page_size: PageSize,
        page,
      };
      if (sort) {
        params.sort = sort;
      }
      if (rewardNow) {
        params.reward_now = rewardNow;
      }
      if (airdrop) {
        params.airdrop = airdrop;
      }
      if (network && network > -1) {
        params.chain_id = network;
      }
      if (category) {
        const currCategory = CategoryList.find((it) => it.key == category);
        if (currCategory) {
          params.category = currCategory.name;
        }
      }
      if (searchText) {
        params.content = searchText;
      }

      // only sort show advertise

      const showAdvertise = Object.keys(params).length === 3 && params.sort && _advertise.length > 0;
      if (showAdvertise) {
        params.page_size = PageSize - 1;
      }

      const result = await get(
        `${QUEST_PATH}/api/dapp/search`,
        params,
      );
      const data = result.data?.data || [];
      data.forEach((dapp: any) => {
        //#region format categories
        dapp.categories = [];
        dapp.dapp_category && dapp.dapp_category.forEach((it: any) => {
          const curr = CategoryList.find((_it) => _it.key === it.category_id);
          curr && dapp.categories.push(curr);
        });
        //#endregion
        //#region format networks
        dapp.networks = [];
        dapp.dapp_network && dapp.dapp_network.forEach((it: any) => {
          const curr = chainCofig[it.chain_id];
          curr && dapp.networks.push({ ...curr });
        });
        //#endregion
      });
      if (showAdvertise) {
        data.splice(8, 0, {isAdvertise: true, advertise: _advertise } as any);
      }
      setDappList(data);
      const titleDapps = (result?.data?.top_dapps ?? []).map((item: any) => ({ logo: item }));
      setTitleDappList(titleDapps);
      setPageTotal(result.data.total_page || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resultDapp data:', error);
      setLoading(false);
    }
  };

  const { run: getDappList } = useDebounceFn(fetchDappList, { wait: 600 });


  const prevSearchText = useRef<any>(undefined);

  useEffect(() => {
    prevSearchText.current = searchText;
    if (prevSearchText.current === searchText) {
      getDappList(1);
    } else {
      fetchDappList(1);
    }
  }, [network, sort, rewardNow, category, airdrop, searchText]);

  const fetchAdvertiseData = async () => {
    if (isRequested) {
      return advertise ?? [];
    }
    setIsRequested(true);
    const resp = await fetchAdvertise();
    setAdvertise(resp ?? []);
    return resp ?? [];
  }


  useEffect(() => {

    return () => {
      setIsRequested(false);
      setAdvertise([]);
    }
  }, []);



  return {
    loading,
    dappList,
    pageTotal,
    pageIndex,
    fetchDappList,
    titleDappList,
  };
}

export interface Props {
  // chainId
  network?: number;
  // sort method
  sort?: any;
  // Bridge: 1
  // Dex(Swap): 2
  // Lending: 3
  // Liquidity: 4
  // Staking: 5
  // Yield: 6
  // Launchpad: 7
  category?: number | string;
  searchText?: string;
  rewardNow?: boolean;
  // Potential Airdrop
  airdrop?: boolean;
}