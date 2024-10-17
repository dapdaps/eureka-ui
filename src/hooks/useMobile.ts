import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

export default function useMobile() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < 750;
      if (isMobile) {
        //#region rubic & HoldStation page
        if (router.pathname === '/campaign/mobile') return;
        if (router.pathname.includes('all-in-one')) return;
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
    };
    check();
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('resize', check);
    };
  }, []);
}
