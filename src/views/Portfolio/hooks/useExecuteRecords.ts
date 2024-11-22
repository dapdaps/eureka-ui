import { useDebounceFn } from 'ahooks';
import { upperFirst } from 'lodash';
import { useEffect, useState } from 'react';

import chains, { TestChainConfig } from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

import { formatExecution, formatGas, getChainLogo, getDappLogo } from '../helpers';

const AllChains = Object.assign({}, chains, TestChainConfig);

export default function useExecuteRecords() {
  const { account } = useAccount();

  const [hasMore, setHasMore] = useState(false);
  const [records, setRecords] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [chain, setChain] = useState('all');
  const [dapp, setDapp] = useState('all');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [lastPageStart, setLastPageStart] = useState<any>({});

  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const fetchRecordList = async (params: any = {}) => {
    const filterChain = params.chain || chain;
    const filterDapp = params.dapp || dapp;
    const _pageIndex = params.pageIndex || pageIndex;
    const _direction = params.direction || 'next';
    const _params = {
      address: account,
      limit: 20,
      start_time: _pageIndex === 1 ? '' : records.slice(-1)[0].tx_time,
      chain_id: filterChain === 'all' ? '' : filterChain,
      dapp: filterDapp === 'all' ? '' : filterDapp
    };
    if (_direction === 'prev') {
      _params.start_time = _pageIndex === 1 ? '' : lastPageStart[_pageIndex];
    }
    try {
      setLoading(true);
      setRecords([]);
      const result = await get(`/db3`, {
        url: 'api/transaction/list',
        params: JSON.stringify(_params)
      });

      setRecords(
        result.data.list
          .filter((record: any) => !!record)
          .map((record: any) => {
            return {
              key: record.id,
              ...record,
              id: record.id,
              executed: formatExecution(record),
              action: upperFirst(record.type),
              gas: formatGas(record),
              dapp_logo: getDappLogo(record.dapp),
              dapp_name: record.dapp,
              chain_logo: getChainLogo(AllChains[record.chain_id]?.chainName)
            };
          })
      );
      setHasMore(result.data.has_more);
      if (_pageIndex > pageTotal) {
        setPageTotal(_pageIndex);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resultNetwork data:', error);
      setLoading(false);
      setHasMore(false);
      setRecords([]);
    }
  };

  const { run: handlePrev } = useDebounceFn(
    () => {
      if (pageIndex <= 1 || loading) return;
      const prevPage = pageIndex - 1;
      setPageIndex(prevPage);
      fetchRecordList({
        chain,
        dapp,
        pageIndex: prevPage,
        direction: 'prev'
      });
    },
    { wait: 500 }
  );

  const { run: handleNext } = useDebounceFn(
    () => {
      if (!hasMore || loading) return;
      setLastPageStart({ ...lastPageStart, [pageIndex]: records[0].tx_time });
      const nextPage = pageIndex + 1;
      setPageIndex(nextPage);
      fetchRecordList({
        chain,
        dapp,
        pageIndex: nextPage,
        direction: 'next'
      });
    },
    { wait: 500 }
  );

  const { run: handleFirst } = useDebounceFn(
    () => {
      if (loading || pageIndex === 1) return;
      setPageIndex(1);
      fetchRecordList({
        chain,
        dapp,
        pageIndex: 1
      });
    },
    { wait: 500 }
  );

  const { run: handleLast } = useDebounceFn(
    () => {
      if (loading) return;
      if (pageTotal === 1) {
        if (hasMore) {
          setPageIndex(pageIndex + 1);
          fetchRecordList({
            chain,
            dapp,
            pageIndex: pageIndex + 1
          });
          return;
        }
      }
      fetchRecordList({
        chain,
        dapp,
        pageIndex: pageTotal
      });
    },
    { wait: 500 }
  );

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
    { wait: records.length ? 600 : 3000 }
  );

  const handleChain = (val: string) => {
    if (val === chain || loading) return;
    setChain(val);
    setHasMore(true);
    setPageIndex(1);
    setPageTotal(1);
    fetchRecordList({
      chain: val,
      dapp,
      pageIndex: 1
    });
  };

  const handleDapp = (val: string) => {
    if (val === dapp || loading) return;
    setDapp(val);
    setHasMore(true);
    setPageIndex(1);
    setPageTotal(1);
    fetchRecordList({
      chain,
      dapp: val,
      pageIndex: 1
    });
  };

  useEffect(() => {
    run();
  }, [account]);

  return {
    hasMore,
    records,
    loading,
    handleChain,
    handleDapp,
    chain,
    dapp,
    pageIndex,
    handlePrev,
    handleNext,
    handleFirst,
    handleLast
  };
}
