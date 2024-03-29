import { useEffect, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import { upperFirst } from 'lodash';
import { formatQuest, formatGas } from '../helpers';
import { AccessKey } from '../config';

export default function useExecuteRecords({ currentPage }: any) {
  const { account } = useAccount();
  const [hasMore, setHasMore] = useState(false);
  const [records, setRecords] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecordList = async () => {
    try {
      setLoading(true);
      setRecords([]);
      const response = await fetch(
        `https://api.db3.app/api/transaction/list?address=${account}&limit=${20}&start_time=${
          currentPage === 1 ? '' : records.slice(-1).tx_time
        }`,
        {
          method: 'GET',
          headers: {
            AccessKey,
          },
        },
      );
      const result = await response.json();
      setRecords(
        result.data.list.map((record: any) => {
          return {
            id: record.id,
            quest: formatQuest(record),
            action: upperFirst(record.type),
            gas: formatGas(record),
            dapp_logo: record.dapp.logo,
            dapp_name: record.dapp.name,
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
  useEffect(() => {
    if (account) {
      fetchRecordList();
    } else {
      setLoading(false);
      setHasMore(false);
      setRecords([]);
    }
  }, [account, currentPage]);

  return { hasMore, records, loading };
}
