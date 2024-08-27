import { Contract, providers, utils } from 'ethers';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import chains from '@/config/chains';
import { usePriceStore } from '@/stores/price';
import { get } from '@/utils/http';
export default function useTrades() {
  const [trades, setTrades] = useState<any[]>([]);
  const [historyTotal, setHistoryTotal] = useState<number>(0);
  const [yourTotal, setYourTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const queryTrades = async (query: any) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await get(`/api/launchpad/trades`, query);
      const result = response?.data
      setTrades((result?.data ?? []).map((trade: any) => {
        let extra_data = null
        try {
          extra_data = JSON.parse(trade.extra_data)
        } catch (error) {
          extra_data = {}
        }
        return {
          ...trade,
          extra_data
        }
      }));
      console.log('===query?.account', query?.account)
      query?.account ? setYourTotal(result?.total ?? 0) : setHistoryTotal(result?.total ?? 0)
      setLoading(false);
    } catch (err) {
      console.log('=err', err)
      setLoading(false);
    }
  };
  const queryYourTotal = async function (query: any) {
    try {
      const result = await get(`/api/launchpad/trades`, query);
      setYourTotal(result?.data?.total ?? 0)
    } catch (err) {
      console.log('=err', err)
    }
  }
  return { loading, trades, historyTotal, yourTotal, queryTrades, queryYourTotal };
}
