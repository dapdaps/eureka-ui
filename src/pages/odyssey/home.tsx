import { useRouter } from 'next/router';

import { useDefaultLayout } from '@/hooks/useLayout';
import CompassApp from '@/views/Compass/home';
import OdysseyThruster from '@/views/OdysseyThruster';
import OdysseyV2 from '@/views/OdysseyV2';
import OdysseyV3 from '@/views/OdysseyV3';
import OdysseyV4 from '@/views/OdysseyV4';
import OdysseyV5 from '@/views/OdysseyV5';
import OdysseyV8 from '@/views/OdysseyV8';

function Compass() {
  const router = useRouter();
  // console.log('NEXT_PUBLIC_API--', process.env.NEXT_PUBLIC_API);

  if (process.env.NEXT_PUBLIC_API === 'https://api.dapdap.net') {
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
