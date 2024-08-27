import Big from 'big.js';
import { useEffect,useState } from 'react';

import useAccount from '@/hooks/useAccount';
import { get } from '@/utils/http';

const DAPDAP_DEBANK_URL = (process.env.NEXT_PUBLIC_API || 'https://api.dapdap.net') + '/debank';

interface NetCurve24hUserItem {
  timestamp: number;
  usd_value: number;
}

export default function useNetCurve24h() {
  const { account } = useAccount();

  const [netCurve24h, setNetCurve24h] = useState<NetCurve24hUserItem[]>();

  const [diff, setDiff] = useState<{ value: string; dir: 'desc' | 'asc' }>();

  const senderParams = JSON.stringify({
    id: account,
  });

  useEffect(() => {
    if (!account) return;

    // get(`${DAPDAP_DEBANK_URL}?url=/v1/user/total_net_curve&params=${senderParams}`)
    //   // .then((response) => response.json())
    //   .then((data) => {
    //     const value_list = data?.data;
    //     console.log('value_list: ', value_list);

    //     const first_item = value_list[0].usd_value;

    //     const last_item = value_list[value_list.length - 1].usd_value;

    //     // calculate percentage last_item to fist_item,

    //     const diffValue = Big(((last_item - first_item) / first_item) * 100);

    //     const diffDisplay = diffValue.toFixed(2) + '%';

    //     setDiff({
    //       value: diffDisplay,
    //       dir: diffValue.gt(0) ? 'asc' : 'desc',
    //     });

    //     setNetCurve24h(data?.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [account]);

  return { netCurve24h, diff };
}
