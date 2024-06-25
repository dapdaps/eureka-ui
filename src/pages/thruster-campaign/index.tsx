import { useRouter } from 'next/router';

import { useDefaultLayout } from '@/hooks/useLayout';
import Compaign from '@/views/thruster-compaign';

function Compass() {
  return <Compaign />;
}

Compass.getLayout = useDefaultLayout;

export default Compass;
