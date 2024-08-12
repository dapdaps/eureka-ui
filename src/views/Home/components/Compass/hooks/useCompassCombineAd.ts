import { useEffect, useMemo, useState } from 'react';
import useCompassList from './useCompassList'
import { get } from '@/utils/http';


const useCompassCombineAd  = () => {
    const { compassList } = useCompassList();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>([]);

    const fetchBannerAd = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const result = await get('/api/ad?category=index&category_id=0')
            setData(result.data || []);
        } catch (err) {
            console.log(err, 'err');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBannerAd();
    }, []);

    const filerCompassList = useMemo(() => {
        if (!compassList || compassList.length === 0) return [];
        return compassList.filter((item: any) => item.status === 'ongoing')
    }, [compassList]);

    return { loading, adList: data, compassList: filerCompassList };
}
export default useCompassCombineAd