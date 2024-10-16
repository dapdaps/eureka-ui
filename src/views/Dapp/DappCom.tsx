import dynamic from 'next/dynamic';
import { memo, useMemo } from 'react';

import SwapAndPool from '@/views/Dapp/SwapAndPool';

import BosDapp from './BosDapp';
import KimExchangePoolDapp from './KimExchangePool';
import PoolDapp from './PoolDapp';
import SwapDapp from './SwapDapp';

const PoolDappSingle = dynamic(() => import('./PoolDapp/Single'));

const matchPath = (paths: string[], targetPath: string) => {
  const cleanTargetPath = targetPath.split('?')[0];
  return paths.some((path) => cleanTargetPath.startsWith(path));
};

const DappCom = (props: any) => {
  console.log('%cdapp data: %o', 'background:#3A1078;color:#fff;', props);

  const { dapp, localConfig } = props;

  const isPool = useMemo(() => ['dapp/thruster-liquidity'].includes(dapp?.route), [dapp]);
  const isKimExchangePool = useMemo(() => ['dapp/kim-exchange-liquidity'].includes(dapp?.route), [dapp]);

  // fix#DAP-862
  if (matchPath(['dapp/thruster-finance', 'dapp/lynex', 'dapp/nile'], dapp?.route)) {
    return <SwapAndPool Pools={PoolDappSingle} {...props} />;
  }
  if (matchPath(['dapp/kim-exchange'], dapp?.route)) {
    return <SwapAndPool Pools={KimExchangePoolDapp} {...props} />;
  }

  if (isPool) return <PoolDapp {...props} />;

  if (isKimExchangePool) return <KimExchangePoolDapp {...props} />;

  if (localConfig.type === 'swap') return <SwapDapp {...props} />;

  return <BosDapp {...props} />;
};

export default memo(DappCom);
