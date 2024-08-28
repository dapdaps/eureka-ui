import { memo, useMemo } from 'react';

import BosDapp from './BosDapp';
import SwapDapp from './SwapDapp';
import dynamic from 'next/dynamic';
import SwapAndPool from '@/views/Dapp/SwapAndPool';

const PoolDappSingle = dynamic(() => import('./PoolDapp/Single'));
const KimExchangeSingle = dynamic(() => import('./KimExchangePool/Single'));

const DappCom = (props: any) => {
  console.log('%cdapp data: %o', 'background:#3A1078;color:#fff;', props);

  const { dapp, localConfig } = props;

  // const isPool = useMemo(() => ['dapp/thruster-liquidity'].includes(dapp?.route), [dapp]);
  // const isKimExchangePool = useMemo(() => ['dapp/kim-exchange-liquidity'].includes(dapp?.route), [dapp]);

  // fix#DAP-862
  if (dapp?.route === 'dapp/thruster-finance') {
    return <SwapAndPool Pools={PoolDappSingle} {...props} />
  }
  if (dapp?.route === 'dapp/kim-exchange') {
    return <SwapAndPool Pools={KimExchangeSingle} {...props} />
  }

  // if (isPool) return <PoolDapp {...props} />;
  //
  // if (isKimExchangePool) return <KimExchangePoolDapp {...props} />;

  if (localConfig.type === 'swap') return <SwapDapp {...props} />;

  return <BosDapp {...props} />;
};

export default memo(DappCom);
