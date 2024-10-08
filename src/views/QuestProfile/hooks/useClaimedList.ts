import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { useUserStore } from '@/stores/user';
import { get } from '@/utils/http';

export default function useClaimedList() {
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const userInfo = useUserStore((store: any) => store.user);

  const queryList = useCallback(
    async (_page?: number) => {
      if (loading) return;
      setLoading(true);
      try {
        const result = await get(`${QUEST_PATH}/api/quest/claimed_list?page=${_page || page}&page_size=10`);
        const data = result.data.data || [];
        _page && setPage(_page);
        setMaxPage(result.data.total_page);
        setList(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
    [loading, page],
  );

  const handlePageChange = useCallback(
    (step: -1 | 1) => {
      const _page = page + step;
      queryList(_page);
    },
    [page],
  );

  useEffect(() => {
    if (!userInfo?.address) return;
    queryList();
  }, [userInfo]);

  return { loading, list, page, maxPage, handlePageChange };
}
