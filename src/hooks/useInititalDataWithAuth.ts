import { useCallback } from 'react';
import { QUEST_PATH } from '@/config/quest';
import { useUserStore } from '@/stores/user';
import useUserReward from '@/hooks/useUserReward';
import { checkAddressIsInvited, getAccessToken, inviteCodeActivate } from '@/apis';
import { get, AUTH_TOKENS } from '@/utils/http';
import { useConnectWallet } from '@web3-onboard/react';
import { useRouter } from 'next/router';

export default function useInititalDataWithAuth() {
  const router = useRouter()
  const [{ wallet }] = useConnectWallet();
  const setUserInfo = useUserStore((store: any) => store.set);
  const { queryUserReward } = useUserReward();

  const queryUserInfo = useCallback(async () => {
    try {
      const result = await get(`${QUEST_PATH}/api/user`);
      const data = result?.data || {};
      setUserInfo({ user: data });
    } catch (err) {}
  }, []);

  const queryInviteList = useCallback(async () => {
    try {
      const result = await get(`${QUEST_PATH}/api/invite/list`);
      const data = result.data || {};
      setUserInfo({ invite: data });
    } catch (err) {}
  }, []);

  const getInitialDataWithAuth = async (address?: string) => {
    window.sessionStorage.setItem(AUTH_TOKENS, '{}');
    if (address) {
      if (["/okx","/coin68","/bitget","/namlongdao","/invite/[kolName]"].indexOf(router.pathname) === -1) {
        const checked = await checkAddressIsInvited(address);
        if (!checked) {
          const isBitget = wallet?.label.toLowerCase().includes('bitget');
          const isCoin98 = wallet?.label.toLowerCase().includes('coin98');
          const isOkx = wallet?.label.toLowerCase().includes('okx');
          await inviteCodeActivate(
            address,
            '',
            isBitget ? 'bitget_wallet' : isCoin98 ? 'coin98_wallet' : isOkx ? 'okx_wallet' : '',
          );
        }
      }
      await getAccessToken(address);
      queryUserInfo();
      queryUserReward();
    } else {
      setUserInfo({ user: {} });
    }
  };

  return { getInitialDataWithAuth, queryUserInfo, queryInviteList };
}
