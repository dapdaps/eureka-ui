import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { checkAddressIsInvited, getAccessToken, getBnsUserName,insertedAccessKey } from '@/apis';
import { useEthersProviderContext } from '@/data/web3';
import { report } from '@/utils/burying-point';
import * as http from '@/utils/http';
const useAuth = () => {
  const { useConnectWallet } = useEthersProviderContext();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [logging, setLogging] = useState(false);
  const router = useRouter();
  const logout = async () => {
    wallet && (await disconnect(wallet));
    window.sessionStorage.setItem(http.AUTH_TOKENS, '{}');
    insertedAccessKey('');
    deleteCookie('AUTHED_ACCOUNT');
    deleteCookie('BNS_NAME');
    router.replace(`/login?source=/`);
  };

  const login = useCallback(
    async (cb?: (unchecked?: boolean) => void) => {
      if (!wallet || !wallet.accounts[0].address) {
        setLogging(false);
        return;
      }

      const cachedAccount = getCookie('AUTHED_ACCOUNT');
      if (cachedAccount !== wallet.accounts[0].address) {
        setLogging(true);
        try {
          const checked = await checkAddressIsInvited(wallet.accounts[0].address);
          // const result = await getBnsUserName(wallet.accounts[0].address);
          // if (result.name) {
          //   setCookie('BNS_NAME', result.name);
          // } else {
          //   deleteCookie('BNS_NAME')
          // }
          if (!checked) {
            deleteCookie('AUTHED_ACCOUNT');
            router.pathname === '/invite-code' ? cb?.(true) : router.replace('/invite-code');
            return;
          }
          await getAccessToken(wallet.accounts[0].address);
          cb?.();
          setLogging(false);
          setCookie('AUTHED_ACCOUNT', wallet.accounts[0].address);
          // BNS用户
          // if (getCookie('BNS_NAME')) {
          //   router.replace('/bns/guide');
          //   return;
          // }
        } catch (error) {
          setLogging(false);
        }
      } else {
        setLogging(false);
        cb?.();
      }
      report({ code: '1001-005', address: wallet.accounts[0].address });
      if (router.pathname === '/login' || router.pathname === '/invite-code') {
        router.replace((router.query?.source as string) || '/');
      }
    },
    [wallet],
  );

  return { login, connect, logout, logging, connecting };
};

export default useAuth;
