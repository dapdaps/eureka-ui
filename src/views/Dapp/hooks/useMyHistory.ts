import { useEffect, useState } from "react";
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

export default function useMyHistory() {

  const [loading, setLoading] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<any>([]);
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const fetchHistoryList = async (page: number) => {
    setPageIndex(page);
    try {
      setLoading(true);
      const params: Record<string, any> = {
        tbd_token: false,
        is_favorite: false,
        page_size: 10,
        page,
      };

      const result = await get(
        `${QUEST_PATH}/api/`,
        params
      );
      const data = result?.data?.data ??  [];
      setHistoryList(data);
      setPageTotal(result.data.total_page || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resultDapp data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchHistoryList(1);
  }, []);

  return {
    loading,
    historyList,
    pageTotal,
    pageIndex,
    fetchHistoryList,
  }
};