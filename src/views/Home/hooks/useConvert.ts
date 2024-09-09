import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

import type { ConvertType } from '../types';
export default function useConvert() {
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: false });
  const [convert, setConvert] = useState<null | ConvertType>(null);
  const [loading, setLoading] = useState(false);

  const queryConvert = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get('/api/user/convert');
      const data = result.data || null;
      setConvert(data);
      setLoading(false);
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!account) return;
    check(() => {
      queryConvert();
    });
  }, [account]);

  return { loading, convert };
}
