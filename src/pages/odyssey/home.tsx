import { useRouter } from 'next/router';
import { useDefaultLayout } from '@/hooks/useLayout';
import dynamic from 'next/dynamic';
import Spinner from '@/components/Spinner';

const CompassApp = dynamic(() => import('@/views/Compass/home'), { loading: () => <Spinner /> });
const OdysseyThruster = dynamic(() => import('@/views/OdysseyThruster'), { loading: () => <Spinner /> });
const OdysseyV2 = dynamic(() => import('@/views/OdysseyV2'), { loading: () => <Spinner /> });
const OdysseyV3 = dynamic(() => import('@/views/OdysseyV3'), { loading: () => <Spinner /> });
const OdysseyV4 = dynamic(() => import('@/views/OdysseyV4'), { loading: () => <Spinner /> });
const OdysseyV5 = dynamic(() => import('@/views/OdysseyV5'), { loading: () => <Spinner /> });
const OdysseyV8 = dynamic(() => import('@/views/OdysseyV8'), { loading: () => <Spinner /> });

function Compass() {
  const router = useRouter();
  // console.log('NEXT_PUBLIC_API--', process.env.NEXT_PUBLIC_API);

  if (process.env.NEXT_PUBLIC_API && ['https://api.dapdap.net', 'https://dapdap-api.bobdev.link'].includes(process.env.NEXT_PUBLIC_API)) {
    if (router.query.id === '7') return <OdysseyV5 />;
    if (router.query.id === '6') return <OdysseyThruster />;
    if (router.query.id === '5') return <OdysseyV8 />;
  }
  if (router.query.id === '9') return <OdysseyThruster />;
  if (router.query.id === '8') return <OdysseyV8 />;
  if (router.query.id === '5') return <OdysseyV5 />;
  if (router.query.id === '4' || router.query.id === '7') return <OdysseyV4 />;
  if (router.query.id === '3') return <OdysseyV3 />;
  if (router.query.id === '2') return <OdysseyV2 />;
  if (router.query.id === '1') return <CompassApp />;
  return <div />;
}

Compass.getLayout = useDefaultLayout;

export default Compass;
