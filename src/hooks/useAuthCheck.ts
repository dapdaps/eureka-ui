import * as http from '@/utils/http';
import useConnectWallet from './useConnectWallet';
import useAccount from './useAccount';
import { useRef } from 'react';

export default function useAuthCheck({ isNeedAk, isQuiet }: { isNeedAk?: boolean; isQuiet?: boolean }) {
  const { account } = useAccount();
  const { onConnect } = useConnectWallet();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const check = async (cb?: any, quiet?: boolean) => {
    if (!account) {
      if (quiet !== undefined ? quiet : isQuiet) return;
      const result = await onConnect();
      if (result.length) cb?.();
      return;
    }
    if (!isNeedAk) {
      cb?.();
      return;
    }
    const checkAk = async () => {
      const result = window.sessionStorage.getItem(http.AUTH_TOKENS);
      const parsedResult = result ? JSON.parse(result) : {};
      if (parsedResult.access_token) {
        cb?.();
        return;
      }
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        checkAk();
      }, 500);
    };
    checkAk();
  };

  return {
    check,
  };
}
