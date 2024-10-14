import { useEffect, useState } from 'react';

import { get } from '@/utils/http';

export default function useVouchers({ id }: any) {
  const [tickets, setTickets] = useState<any>(null);

  useEffect(() => {
    if (id) {
      get(`/api/campaign/quest/vouchers?id=${id}&page=1&page_size=100`).then((res) => {
        console.log('res:', res);
        if (res.msg === 'success' && res.data) {
          setTickets(res.data);
        }
      });
    }
  }, [id]);

  return {
    tickets
  };
}
