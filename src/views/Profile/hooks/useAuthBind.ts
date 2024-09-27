import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import useToast from '@/hooks/useToast';
import { post } from '@/utils/http';

const MAPS = {
  twitter: {
    label: 'Twitter',
    path: '/api/user/bind/twitter'
  },
  telegram: {
    label: 'Telegram',
    path: `/api/user/bind/telegram`
  },
  discord: {
    label: 'Discord',
    path: `/api/user/bind/discord`
  }
};

type AuthType = 'telegram' | 'twitter' | 'discord';

export default function useAuthBind({ onSuccess, redirect_uri }: { onSuccess: VoidFunction; redirect_uri: string }) {
  const [loading, setLoading] = useState(false);
  const { account } = useAccount();
  const [type, setType] = useState<AuthType>();
  const toast = useToast();
  const searchParams = useSearchParams();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const code = searchParams.get('code');
  const handleBind = useCallback(
    async (type: AuthType, data?: any) => {
      if (loading) return;
      setType(type);
      setLoading(true);
      const config = MAPS[type];
      const toastId = toast.loading({
        title: `${config.label} binding`
      });
      try {
        let params = {};
        if (type === 'twitter' || type === 'discord') {
          params = { code, redirect_uri };
        }
        if (type === 'telegram') {
          params = data;
        }
        const result = await post(`${QUEST_PATH}${config.path}`, params);
        if (result.code !== 0) throw new Error(result.msg);
        toast.dismiss(toastId);
        toast.success({
          title: `${config.label} bind successfully`
        });
        setLoading(false);
        onSuccess();
      } catch (err) {
        setLoading(false);
        toast.dismiss(toastId);
        toast.fail({
          title: err.message || `${config.label} bind failed`
        });
      }
    },
    [code, loading]
  );

  useEffect(() => {
    if (!account || !code) return;
    check(() => {
      const type = sessionStorage.getItem('_auth_type');
      if (!code || !type) return;
      handleBind(type as AuthType);
      sessionStorage.removeItem('_auth_type');
    });
  }, [code, account]);

  return { loading, type, handleBind };
}
