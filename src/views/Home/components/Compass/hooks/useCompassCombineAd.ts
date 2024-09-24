import { useEffect, useMemo, useState } from 'react';

import { get } from '@/utils/http';
import { StatusType } from '@/views/Odyssey/components/Tag';

import useCompassList from './useCompassList';

const useCompassCombineAd = () => {
  const { compassList } = useCompassList();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const fetchBannerAd = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get('/api/ad?category=index&category_id=0');
      const data = result.data || [];

      const _data = data.filter((item: any) => {
        return item.ad_link.indexOf('bridge-x/rango') === -1;
      });

      setData(_data);
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerAd();
  }, []);

  const filerCompassList = useMemo(() => {
    if (!compassList || compassList.length === 0) return [];
    // fix#DAP-785
    return compassList.filter((item: any) => [StatusType.un_start, StatusType.ongoing].includes(item.status));
  }, [compassList]);

  return { loading, adList: data, compassList: filerCompassList };
};
export default useCompassCombineAd;
