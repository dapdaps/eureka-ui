import { useDebounceFn } from "ahooks";
import { useEffect, useState } from "react";

import { QUEST_PATH } from '@/config/quest';
import useAccount from "@/hooks/useAccount";
import { Category } from '@/hooks/useAirdrop';
import useAuthCheck from "@/hooks/useAuthCheck";
import { get } from '@/utils/http';

export default function useMyHistory(props: { chainId?: number; id: number; category: Category }) {
  const {
    chainId,
    id,
    category,
  } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<any>([]);
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const fetchHistoryList = async (page: number) => {
    setPageIndex(page);
    try {
      setLoading(true);
      const params: Record<string, any> = {
        account_id: account,
        page_size: 10,
        page,
      };
      if (category === Category.network) {
        if (!chainId) {
          setLoading(false);
          return;
        }
        params.chain_id = chainId;
      }
      if (category === Category.dApp) {
        if (!id) {
          setLoading(false);
          return;
        }
        params.dapp_id = id;
      }

      const result = await get(
        `${QUEST_PATH}/api/action/get-actions-by-account`,
        params
      );
      const data = result?.data?.data ??  [];
      setHistoryList(data);
      setPageTotal(result.data?.total_page || 0);
      setTotal(result.data?.total ?? 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching actions data:', error);
      setLoading(false);
    }
  };

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        if (historyList.length > 0) {
          setHistoryList([]);
          setPageTotal(0);
          setTotal(0);
        }
        return;
      }
      check(() => fetchHistoryList(1));
    },
    { wait: 300 })

  useEffect(() => {
    run();
  }, [chainId, account, id, category]);

  return {
    loading,
    historyList,
    pageTotal,
    pageIndex,
    fetchHistoryList,
    total
  }
};