import dynamic from 'next/dynamic';
import { memo, useMemo } from 'react';

import BosDapp from './BosDapp';
import DappTab from './DappTab';
import KimExchangePoolDapp from './KimExchangePool';
import PoolDapp from './PoolDapp';
import SwapDapp from './SwapDapp';

const PoolDappSingle = dynamic(() => import('./PoolDapp/Single'));

const matchPath = (paths: string[], targetPath: string) => {
  if (!targetPath) return false;
  const cleanTargetPath = targetPath.split('?')[0];
  return paths.some((path) => cleanTargetPath.startsWith(path));
};

const DappCom = (props: any) => {
  console.log('%cdapp data: %o', 'background:#3A1078;color:#fff;', props);

  const { dapp, localConfig } = props;

  const isPool = useMemo(() => ['dapp/thruster-liquidity'].includes(dapp?.route), [dapp]);
  const isKimExchangePool = useMemo(() => ['dapp/kim-exchange-liquidity'].includes(dapp?.route), [dapp]);

  // fix#DAP-862
<<<<<<< HEAD
  if (
    matchPath(
      [
        'dapp/thruster-finance',
        'dapp/lynex',
        'dapp/trader-joe',
        'dapp/nile',
        'dapp/nuri',
        'dapp/scribe',
        'dapp/zerolend',
        'dapp/lore',
        'dapp/xy-finance'
      ],
      dapp?.route
    )
  ) {
    return <DappTab Pools={PoolDappSingle} {...props} />;
  }
  if (matchPath(['dapp/kim-exchange'], dapp?.route)) {
    return <DappTab Pools={KimExchangePoolDapp} {...props} />;
  }
  if (matchPath(['dapp/teahouse-finance'], dapp?.route)) {
    return <DappTab Pools={BosDapp} {...props} />;
  }

  if (isPool) return <PoolDapp {...props} />;

  if (isKimExchangePool) return <KimExchangePoolDapp {...props} />;

  if (localConfig.type === 'swap') return <SwapDapp {...props} />;

  return <BosDapp {...props} />;
};

export default memo(DappCom);

function C() {
  return <>123</>;
}
