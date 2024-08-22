import { useRef } from 'react';

import * as http from '@/utils/http';

import useAccount from './useAccount';
import useConnectWallet from './useConnectWallet';

export default function useAuthCheck({ isNeedAk, isQuiet }: { isNeedAk?: boolean; isQuiet?: boolean }) {
  const { account } = useAccount();
  const { onConnect } = useConnectWallet();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const check = async (cb?: any, quiet?: boolean) => {
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
    if (!account) {
      if (quiet !== undefined ? quiet : isQuiet) return;
      const result = await onConnect();
      if (result.length) {
        // fix#DAP-747
        checkAk();
      }
      return;
    }
    if (!isNeedAk) {
      cb?.();
      return;
    }
    checkAk();
  };

  return {
    check,
  };
}
