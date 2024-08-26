import { memo, useMemo } from 'react';

import BosDapp from './BosDapp';
import KimExchangePoolDapp from './KimExchangePool';
import PoolDapp from './PoolDapp';
import SwapDapp from './SwapDapp';
import ThrusterFinance from '@/views/Dapp/ThrusterFinance';

const DappCom = (props: any) => {
  console.log('%cdapp data: %o', 'background:#3A1078;color:#fff;', props);

  const { dapp, localConfig } = props;

  const isPool = useMemo(() => ['dapp/thruster-liquidity'].includes(dapp?.route), [dapp]);
  const isKimExchangePool = useMemo(() => ['dapp/kim-exchange-liquidity'].includes(dapp?.route), [dapp]);

  console.log(isPool);

  // fix#DAP-862
  if (dapp?.route === 'dapp/thruster-finance') {
    return <ThrusterFinance {...props} />
  }

  if (isPool) return <PoolDapp {...props} />;

  if (isKimExchangePool) return <KimExchangePoolDapp {...props} />;

  if (localConfig.type === 'swap') return <SwapDapp {...props} />;

  return <BosDapp {...props} />;
};

export default memo(DappCom);
