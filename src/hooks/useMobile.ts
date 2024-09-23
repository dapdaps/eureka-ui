import { useSize } from 'ahooks';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

export default function useMobile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const size: any = useSize(window.document.getElementsByTagName('body')[0]);
  const isMobile = useMemo(() => size?.width < 750, [size]);
  useEffect(() => {
    if (isMobile) {
      //#region rubic & HoldStation page
      if (router.pathname === '/campaign/mobile') return;
      if (router.pathname === '/campaign/home') {
        router.replace(`/campaign/mobile?${searchParams.toString()}`);
        return;
      }
      //#endregion
      if (router.pathname !== '/mobile') {
        router.replace('/mobile');
        return;
      }
    }
    if (!isMobile) {
      //#region rubic & HoldStation page
      if (router.pathname === '/campaign/mobile') {
        router.replace(`/campaign/home?${searchParams.toString()}`);
        return;
      }
      //#endregion
      if (router.pathname === '/mobile') {
        router.replace('/');
        return;
      }
    }
  }, [isMobile]);
}
