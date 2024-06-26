import { useRouter } from 'next/router';

import { useDefaultLayout } from '@/hooks/useLayout';
import Compaign from '@/views/thruster-compaign';

function Compass() {
  console.log('NEXT_PUBLIC_API--', process.env.NEXT_PUBLIC_API);

  if (process.env.NEXT_PUBLIC_API === 'https://test-api.dapdap.net') {
    return <Compaign id="9" />;
  }

  return <Compaign id="6" />;
}

Compass.getLayout = useDefaultLayout;

export default Compass;
