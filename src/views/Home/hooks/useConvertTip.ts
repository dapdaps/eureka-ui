import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
export default function useConvertTip() {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: false });
  const [checkConvertingVisible, setCheckConvertingVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);

  const queryConvertTip = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get('/api/user/convert/tip');
      const data = (result.data || null);
      setCheckConvertingVisible(Boolean(data))
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
      queryConvertTip()
    });
  }, [account]);

  return { loading, checkConvertingVisible, setCheckConvertingVisible };
}
