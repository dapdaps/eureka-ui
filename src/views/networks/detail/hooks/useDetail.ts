import { useState, useEffect, useCallback } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

const useDetail = (id?: number) => {
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(false);

  const queryDetail = useCallback(async () => {
    const response = await get(`${QUEST_PATH}/api/network?id=${id}`);
    setDetail(response.data);
  }, [id]);

  const init = useCallback(async () => {
    try {
      setLoading(true);
      await queryDetail();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    init();
  }, [id]);

  return { loading, detail };
};

export default useDetail;
