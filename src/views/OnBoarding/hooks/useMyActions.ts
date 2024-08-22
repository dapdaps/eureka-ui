import { useDebounceFn } from 'ahooks';
import { useCallback,useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { deleteRequest, get } from '@/utils/http';

const useMyActions = (chainId: number, pageSize: number) => {
  const [list, setList] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { account } = useAccount();
  const [page, setPage] = useState(1);
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const queryList = useCallback(
    async (_page?: number) => {
      try {
        setLoading(true);
        const response = await get(
          `/api/action/trends/my?chain_id=${chainId}&account_id=${account}&page=${_page || page}&page_size=${pageSize}`,
        );
        if (_page) setPage(_page);
        const list = response?.data?.data || [];
        setList(list);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
    [chainId, pageSize, page, account],
  );

  const handleDelete = useCallback(async (action_id: string) => {
    try {
      const response = await deleteRequest(`/api/action/trends/my`, { my_trend_id: action_id });
      if (response.code === 0) {
        queryList();
      }
      setDeleting(false);
    } catch (err) {
      setDeleting(false);
    }
  }, []);

  const { run } = useDebounceFn(
    () => {
      if (!chainId) return;
      if (!account) {
        setList([]);
        setLoading(false);
      } else {
        check(() => {
          queryList(1);
        });
      }
    },
    { wait: list ? 600 : 3000 },
  );

  useEffect(() => {
    run();
  }, [chainId, account]);

  return { loading, list, deleting, handleDelete };
};

export default useMyActions;
