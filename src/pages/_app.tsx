import '@/styles/theme.css';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'nprogress/nprogress.css';

import { useDebounceFn } from 'ahooks';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import NProgress from 'nprogress';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ToastContainer } from 'react-toastify';

import RemindMedal from '@/components/Modal/RemindMedal';
import useAccount from '@/hooks/useAccount';
import { useBosLoaderInitializer } from '@/hooks/useBosLoaderInitializer';
import useClickTracking from '@/hooks/useClickTracking';
import useInitialDataWithoutAuth from '@/hooks/useInitialDataWithoutAuth';
import useMobile from '@/hooks/useMobile';
import useTokenPrice from '@/hooks/useTokenPrice';
import useTokenPriceLatestList from '@/hooks/useTokenPriceLatestList';
import { useFjordStore } from '@/stores/_fjord';
import { report } from '@/utils/burying-point';
import type { NextPageWithLayout } from '@/utils/types';
import usePools from '@/views/Fjord/hooks/usePools';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useBosLoaderInitializer();
  useClickTracking();

  const { getInitialDataWithoutAuth } = useInitialDataWithoutAuth();
  const fjordStore: any = useFjordStore();
  const { account } = useAccount();
  const { pools, queryPools } = usePools(account);
  const [ready, setReady] = useState(false);
  const [remindMedalVisible, setRemindMedalVisible] = useState(false);

  const { initializePrice } = useTokenPrice();
  const { initializePriceLatest } = useTokenPriceLatestList();
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const DuaPool = useMemo(() => pools.find((pool) => pool?.share_token_symbol === 'HYPER'), [pools]);

  const handleRouteChangeStart = () => {
    NProgress.start();
  };
  const handleRouteChangeComplete = () => {
    NProgress.done();
  };
  const handleRouteChangeError = () => {
    NProgress.done();
  };
  const handleRemind = () => {
    const hour = 60 * 60 * 1000;
    const range = [
      [3 * 24 * hour, 1 * 24 * hour],
      [1 * 24 * hour, hour],
      [hour, 0]
    ];
    const differ = DuaPool?.start_time * 1000 - Date.now();
    const index = range.findIndex((timeRange) => differ <= timeRange[0] && differ > timeRange[1]);
    const remindArray = fjordStore?.remindArray;
    if (index > -1 && !remindArray[index]) {
      remindArray[index] = true;
      fjordStore.set({
        remindArray
      });
      setRemindMedalVisible(true);
    }
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router.events]);

  const { run: updateAccount } = useDebounceFn(
    () => {
      if (account) {
        report({ code: '1001-005', address: account });
        queryPools();
      }
    },
    { wait: 500 }
  );

  useEffect(() => {
    updateAccount();
  }, [account]);

  useEffect(() => {
    pools.length > 0 && handleRemind();
  }, [pools]);

  useEffect(() => {
    initializePrice();
    initializePriceLatest();
    getInitialDataWithoutAuth();
    setReady(true);
  }, []);

  useMobile();

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="CDEVFlJTyVZ2vM7ePugKgWsl_7Rd-MrfDv42u0vZ0B0" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_HOSTNAME}/near/widget/NearOrg.HomePage`}
          key="canonical"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>DapDap</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </Head>
      <Script id="telegram-widget" src="https://telegram.org/js/telegram-widget.js?22" />
      <Script id="phosphor-icons" src="https://unpkg.com/@phosphor-icons/web@2.0.3" async />

      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PR996H5E9T"></Script>
      <Script id="ga-config">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PR996H5E9T');`}
      </Script>

      {ready && (
        <>
          <SkeletonTheme baseColor="#353649" highlightColor="#444">
            {getLayout(<Component {...pageProps} />)}
          </SkeletonTheme>
          <ToastContainer
            position={window.innerWidth > 768 ? 'top-right' : 'bottom-right'}
            autoClose={5000}
            hideProgressBar={true}
            theme="dark"
            toastStyle={{ backgroundColor: 'transparent', boxShadow: 'none' }}
            newestOnTop
            rtl={false}
            pauseOnFocusLoss
            closeButton={false}
          />

          <RemindMedal
            DuaPool={DuaPool}
            visible={remindMedalVisible}
            onClose={() => {
              setRemindMedalVisible(false);
            }}
          />
        </>
      )}
    </>
  );
}
