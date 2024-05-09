import { useEffect, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useDebounceFn } from 'ahooks';
import { get } from '@/utils/http';
import { upperFirst } from 'lodash';
import { formatQuest, formatGas } from '../helpers';

export default function useExecuteRecords({ currentPage }: any) {
  const { account } = useAccount();
  const [hasMore, setHasMore] = useState(false);
  const [records, setRecords] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const fetchRecordList = async () => {
    try {
      setLoading(true);
      setRecords([]);
      const result = await get(`/db3`, {
        url: 'api/transaction/list',
        params: JSON.stringify({
          address: account,
          limit: 20,
          start_time: currentPage === 1 ? '' : records.slice(-1)[0].tx_time,
        }),
      });

      setRecords(
        result.data.list
          .filter((record: any) => record.token_in && record)
          .map((record: any) => {
            return {
              id: record.id,
              quest: formatQuest(record),
              action: upperFirst(record.type),
              gas: formatGas(record),
              dapp_logo: record.dapp?.logo,
              dapp_name: record.dapp?.show_name,
              name: record.dapp?.name,
              tx_time: record.tx_time,
              tx_hash: record.tx_hash,
              chain_id: record.chain_id,
            };
          }),
      );
      setHasMore(result.data.has_more);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resultNetwork data:', error);
      setLoading(false);
      setHasMore(false);
      setRecords([]);
    }
  };
  const { run } = useDebounceFn(
    () => {
      if (!account) {
        setLoading(false);
        setHasMore(false);
        setRecords([]);
      } else {
        check(fetchRecordList);
      }
    },
    { wait: records ? 600 : 3000 },
  );
  useEffect(() => {
    run();
  }, [account]);

  useEffect(() => {
    if (account) fetchRecordList();
  }, [currentPage]);

  return { hasMore, records, loading };
}
